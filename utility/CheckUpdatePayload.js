
const CheckUpdatePayload = (req, res,next)=>
{
   let err = "";
  const id = req.params.sub_id ;
  const firstName = req.body.firstName ;
  const lastName = req.body.lastName ;
  const email = req.body.email ;
  const childName = req.body.childName ;
  const childAge = req.body.childAge;
  const imgName = req.body.imgName;
  const likeCount = req.body.likeCount;
  if(firstName ==null  )
  {
      err+="\n firstName is requried";
  };
  if(lastName == null)
  {
    err+="\n LastName is reqired";
  }
  if(email == null)
  {
    err+="\n email is required";
  }
  if(childName == null)
  {
    err+="\nchildName is required" ;
  }

  if(childAge == null)
  {
    err+="\nchildAge is required"
  }
  if(imgName == null)
  {
    err+="\nImageName is reqired";
  }

  if(likeCount == null)
  {
    err+="\nlikeCount is required";
  }


  if(isNaN(childAge) || !Number.isInteger(childAge) )
  {
    err+="\nthe childAge should be integer number "
  }
  if(isNaN(likeCount) || !Number.isInteger(likeCount))
  {
    err+="\n likeCount should be inetger number";
  }
   
  if(err !=="")
  {
    return  res.status(400).json({
     status:"failed",
     status_code :400,
     error:err
    });
  }
   
    next();

}

module.exports = CheckUpdatePayload;