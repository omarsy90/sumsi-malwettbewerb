
const CheckUpdatePayload = (req, res,next)=>
{

  
   let err = "";
  const id = req.params.sub_id ;
  const firstName = req.body.firstName ;
  const lastName = req.body.lastName ;
  const email = req.body.email ;
  const childName = req.body.childName ;
  const childAge = req.body.childAge;
  const likeCount = req.body.likeCount;
  if(!firstName)
  {
      err+="\n firstName is requried";
  };
  if(!lastName)
  {
    err+="\n LastName is reqired";
  }
  if(!email )
  {
    err+="\n email is required";
  }
  if(!childName )
  {
    err+="\nchildName is required" ;
  }

  if(!childAge)
  {
    err+="\nchildAge is required"
  }
 

  if(!likeCount)
  {
    err+="\nlikeCount is required";
  }
  
  if(req.body.isImage != true)
  {
      err+="\n image Field is required"
  }

  if(isNaN(childAge) )
  {
    err+="\nthe childAge should be integer number "
  }
  if(!Number.isInteger(parseFloat(childAge) ) )
  {
    err+="childAge should be integer number"
  }


  if(isNaN(likeCount) )
  {
    err+="\n likeCount should be inetger number";
  }

  if(!Number.isInteger(parseFloat(likeCount)) )
  {
    err+="\n likeCount should be inteher number"
  }
 
   
  if(err !="")
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