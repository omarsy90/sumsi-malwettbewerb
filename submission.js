const express = require('express');
const router = express.Router();

const submissionRepo = require('./submissionRepository');

const image = require('./imageclass').IMAGE;

const upload = require('./utility/multer');

 const checkoutSubmission  = require('./utility/checkoutSubmission');



router.get('/', (req, res) => {

    submission.submissionsArray.map(sub => {
        sub.image = image.imgaesArray.find(img => img.id == sub.imageId)
    });

    

    res.status(200).json({
        status: "success",
        status_code: 200,
        message: "api.messages.index.success",
        data: submission.submissionsArray
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
    
   // submission.Addsubmission("test","test","test","test",0,"test");
   // const image1 = new image(req.file?.filename, req.file?.mimetype.split('/')[1], req.file?.size)
    //const sub = new submission(req.body.vorname, req.body.nachname, req.body.email, req.body.kindname, req.body.alter, req.body.zustimmung1, req.body.zustimmung2, req.body.zustimmung3, image1.id);

   // add submission to database

   /* res.status(200).json({
        status: "success",
        status_code: 200,
        message: "api.messages.store.success",
       
    }) */
});


const fs = require('fs'); // this object we need to delete imagefile 
router.delete('/:sub_id', (req, res) => {
    const sub_id = req.params.sub_id;
    const sub = submission.findSubmissionBeiId(sub_id);
    const img = image.findImageBeiId(sub?.imageId);

    // remove submission from database
    submission.submissionsArray.splice(submission.submissionsArray.indexOf(sub), 1);


    //remove fileimage 
    try {
        if (img) {
            fs.unlinkSync(img.location);
        }

        //file removed
    } catch (err) {
        console.error(err)
    }

    //remove information of image in database
    image.imgaesArray.splice(image.imgaesArray.indexOf(img), 1);

    res.status(200).json({
        status: "success",
        status_code: 200,
        message: "api.messages.delete.success",
        data: null
    })




});


// to convert (1,0) ('true','false') that is string to boolean
function toBool(string) {
    if (string === 'true' || string === 'false' || string === '1' || string === '0') {
        return true;
    } else {
        return false;
    }
}



// middleware to checkout status of the felds and data requested


// ------middleware to handle multidata form -----------------------







module.exports = router ;