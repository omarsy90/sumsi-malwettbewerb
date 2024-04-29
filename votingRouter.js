const express = require('express');
const router = express.Router();
const SubmissionRepo = require('./utility/submissionRepository');
const VoteRepo = require('./utility/VoteRepository');


router.post('/:subID', async(req,res)=>{

   
    if(!req.body.email)
    {
        return res.status(401).json({
            status:"failed",
            status_code :401,
            error:"email is required !"
           });
    
    }
    

       const data = await SubmissionRepo.GetSubmissionById(req.params.subID);
       if(data.rowsAffected[0] < 1)
       {
        return res.status(404).json({
            status:"failed",
            status_code :404,
            error:"submission not found"
        })
       } 
  
        // check if there is a vote from owner of email to requested submission
          const voteData = await  VoteRepo.GetVote(req.params.subID , req.body.email);
          if(voteData.rowsAffected[0] >0)
          {
            return res.status(400).json({
                status:"failed",
                status_code:400 ,
                error:"user can give only one vote for the submission"
            })
          }
        
           const updatedData = await SubmissionRepo.AddVoteToSubmission(req.params.subID);
           if(updatedData.rowsAffected[0]< 1)
           {
               return res.status(500).json({
                status:"failed",
                status_code:500,
                error:"intern server error"
               })
           }


           const newData = await SubmissionRepo.GetSubmissionById(req.params.subID);
           return res.status(200).json({
            status:"success",
            status_code :200 ,
            submission:newData.recordset
           })

       

});


module.exports = router;