const express = require('express');
const router = express.Router();
const fs = require('fs')
const submissionRepo = require('./utility/submissionRepository');

const upload = require('./utility/multer');
 const checkoutSubmissionPayload  = require('./utility/checkoutSubmissionPayload');


 const tokenManger = require('./utility/AuthenticateTokenManager');
 const checkupdatePayload = require('./utility/CheckUpdatePayload');
 const userMan = require('./utility/UserManager');
 const attributeValue = require('./utility/AttributeValueRepository');

 


 router.post('/ControlSubmission',tokenManger.authenticateToken,async(req,res)=>{
       
    const authEmail = req.user.name;
    const authPass = req.user.pass;
    
    isValid = await userMan.HasAdminRole(authEmail,authPass);
    if(isValid != true)
    {
     return res.status(401).json({
         status:"failed",
         status_code:401,
         message:"unauthorized process"
     })
    }
    
    const newSubmissionStatus = req.body.newSubmissionStatus;
   
    if(!newSubmissionStatus)
    {
     return res.status(400).json({
        status:'failed',
        status_code:400,
        message :'new submissionStatus must be requested'
     })
    }

    if(newSubmissionStatus != 'true' && newSubmissionStatus !='false' )
    {
        return res.status(400).json({
            status:'failed',
            status_code:400,
            message :'new submissionStatus must be true or false'
         })
    }

    const result =  await attributeValue.SetValue('IsSubmissionAllowed',newSubmissionStatus);
    const  updatedStatus = result?.recordset[0]?.Value ;
    return res.status(200).json({
        status:'success',
        status_code:200,
        isSubmissionEnabled : updatedStatus
    })

 })

 router.get('/ControlSubmission', async (req,res)=>{
       
 const isSubmissionEnabled = await GetTheStatusOfSubmission();
    res.status(200).json({
        status:"success",
        status_code:200,
        isSubmissionEnabled:isSubmissionEnabled 
    })
 });

router.get('/', async(req, res) => {
    let data = [];
    var responseData = await  submissionRepo.GetSubmissions() ;
     data = responseData.recordset;
     
    res.status(200).json({
        status: "success",
        status_code: 200,
        message: "api.messages.index.success",
        data
    });

});

router.get('/:sub_id', async(req, res) => {

    const sub_id = req.params.sub_id;
    const data = await submissionRepo.GetSubmissionById(sub_id);

    if (data.rowsAffected[0] > 0) {
        
     
        res.status(200).json({
            status: "success",
            status_code: 200,
            data: data.recordset,

        });
    } else {
        res.status(404).json({
            status: "failed",
            status_code: 404,
            message: "submission is not fond",

        });

    }


});

 

async function GetTheStatusOfSubmission()
{
    const  result =  await attributeValue.GetValue('IsSubmissionAllowed');
 const isSubmissionEnabled =  result?.recordset[0]?.Value ;
 return isSubmissionEnabled ;
}

router.post('/',upload.single('image') ,checkoutSubmissionPayload,async (req, res, next) => {

    isSubmissionEnabled = await GetTheStatusOfSubmission();
    if(isSubmissionEnabled != "true")
    { // upload is unenabled 
       return res.status(400).json(
        {
            status:"failed",
            status_code :400,
            message :"uploading is not enabled any more"
        }
       )
    }

    //check if there is a submission for requested Email
  const checkData =await   submissionRepo.CheckSubmission(req.body.email) ;
   if(checkData.rowsAffected[0] >0)
   {
    
      // email is already registered
  return    res.status(400).json({
    status: "failed",
    status_code :400,
    message : "email has been already registered !"
  })
   }
     
      // email first Time requested
    const firstname = req.body.legalguardian_firstname;
    const lastname = req.body.legalguardian_lastname;
    const email = req.body.email;
    const childName = req.body.child_firstname;
    const childAge = req.body.child_age;
    const ImgName = req.file.filename ;

   await submissionRepo.Addsubmission(firstname,lastname,email,childName, childAge,ImgName);
   const LastRecord = await submissionRepo.GetTheMostInsertedRecord();
   const obj = LastRecord.recordset;
      
    return res.status(200).json({
        status:"success",
        status_code:200,
        submission:obj
     }) ;
});



const path = require('path');


router.delete('/:sub_id',tokenManger.authenticateToken ,async (req, res) => {
    id= req.params.sub_id; 
    const authEmail = req.user.name;
    const authPass = req.user.pass;

   isValid = await userMan.HasAdminRole(authEmail,authPass);
   if(isValid != true)
   {
    return res.status(401).json({
        status:"failed",
        status_code:401,
        message:"unauthorized process"
    })
   }
        const data = await  submissionRepo.GetSubmissionById(id);
        if( data.rowsAffected[0] < 1)
        {
         return    res.status(400).json({
                status:"failed",
                status_code:400,
                message:"the submission is not found"
             })
        }
          

        // submission found
          await submissionRepo.DeleteSubmissionByID(data.recordset[0].SubmissionID);

          // delete the image related to submission
        const imgPath = path.join(__dirname, 'uploads',data.recordset[0].ImgName);
        fs.unlink(imgPath, (err) => {
            if (err) {
                console.error('Error deleting the file:');
            } else {
                console.log('File deleted successfully!');
            }
        });

          return    res.status(200).json({
                status:"success",
                status_code:200,
                message : "Submission has been deleted suessfully"
              })

});


router.put('/:sub_id',upload.single('img'),tokenManger.authenticateToken,checkupdatePayload ,async (req,res)=>{
    id= req.params.sub_id; 
    const authEmail = req.user.name;
    const authPass = req.user.pass;

   isValid = await userMan.HasAdminRole(authEmail,authPass);
   if(isValid != true)
   {
    return res.status(401).json({
        status:"failed",
        status_code:401,
        message:"unauthorized process"
    })
   }

    const data = await submissionRepo.UpdateSubmission(id,req.body.firstName,req.body.lastName,req.body.email,req.body.childName,req.body.childAge,req.file.filename,req.body.likeCount);
     
    if(data.rowsAffected[0]< 1)
    {
    return res.status(404).json({
        status:"failed",
        status_code :404,
        message:"submission not found"
    })
    }
      
       
    // retrive updated submission to client
    const UpdatedData = await submissionRepo.GetSubmissionById(id);
    return res.status(200).json(
        {
            status:"success",
            status_code :200,
            submission:UpdatedData.recordset

        })

});




module.exports = router ;