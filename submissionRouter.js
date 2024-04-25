const express = require('express');
const router = express.Router();

const submissionRepo = require('./utility/submissionRepository');

const image = require('./imageclass').IMAGE;

const upload = require('./utility/multer');

 const checkoutSubmission  = require('./utility/checkoutSubmission');



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

router.get('/:sub_id', (req, res) => {

    const sub_id = req.params.sub_id;
    const sub = submission.findSubmissionBeiId(sub_id);

    if (sub) {
        const img = image.findImageBeiId(sub.imageId)
        sub.image = img
        res.status(200).json({
            status: "success",
            status_code: 200,
            message: "api.messages.index.success",
            data: sub,

        });
    } else {
        res.status(500).json({
            status: "failed",
            status_code: 500,
            message: "submission is not fond",

        });

    }


});


router.post('/',upload.single('image'),checkoutSubmission ,async (req, res) => {

    //check if there is a submission for requested Email
  const checkData =await   submissionRepo.CheckSubmission(req.body.email) ;
   if(checkData.rowsAffected[0] ===0)
   {   
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
     })
       
   }else{
    // email is already registered
  return    res.status(400).json({
        status: "failed",
        status_code :400,
        message : "email has been already registered !"
      })
   }
    
  
});


const authMan = require("./utility/AuthenticateTokenManager");

router.delete('/:sub_id', async (req, res) => {
        const sub_id = req.params.sub_id;
        const data = await  submissionRepo.DeleteSubmissionByID(sub_id);
        console.log(data);
        if( data.rowsAffected[0] < 1)
        {
         return    res.status(400).json({
                status:"failed",
                status_code:400,
                message:"the submission is not found"
             })
        }
          else
          {
              res.status(200).json({
                status:"success",
                status_code:200,
                message : "Submission has been deleted suessfully"
              })
          }
    
});


const checkupdatePayload = require('./utility/CheckUpdatePayload');

router.put('/:sub_id',checkupdatePayload ,async (req,res)=>{
  


});






// ------middleware to handle multidata form -----------------------







module.exports = router ;