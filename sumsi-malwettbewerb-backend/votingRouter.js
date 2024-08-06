const express = require('express');
const router = express.Router();
const SubmissionRepo = require('./utility/submissionRepository');
const VoteRepo = require('./utility/VoteRepository');
const tokenManger = require('./utility/AuthenticateTokenManager');
const userMan = require('./utility/UserManager');
const attributeValueRepo = require('./utility/AttributeValueRepository');

router.post('/ControlVoting',tokenManger.authenticateToken,async(req,res)=>{
       
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
    
    const  newVotingStatus = req.body.VotingStatus ;
    if(!newVotingStatus)
    {
        return res.status(400).json({
            status:'failed',
            status_code:400,
            message :'new VotingStatus must be requested'
        });
    }
    const result = await attributeValueRepo.SetValue('IsVotingAllowed',newVotingStatus);  
    const updatedVotingStatus= result.recordset[0].Value ;
    return res.status(200).json({
        status:'success',
        status_code:200,
        votingStatus:updatedVotingStatus
    })

 })

 router.get('/ControlVoting' , async (req,res)=>{
    
    isVotingEnabled =  await GetheStatusOfVoting();
    res.status(200).json({
        status: "success",
        status_code :200,
        votingStatus: isVotingEnabled
    })
 });

// valid or not any more 
 async function GetheStatusOfVoting(){
    const  result =  await attributeValueRepo.GetValue('IsVotingAllowed');
    const isVotingEnabled =  result?.recordset[0]?.Value ;
    return isVotingEnabled ;
 }


router.post('/:subID', async(req,res)=>{
  
    
  if(!req.body.email )
  {
  return  res.status(400).json({
        status:"falied",
        status_code:400,
        error: "email can not b empty"
    })
  }



   isVotingEnabled =  await GetheStatusOfVoting();
    if(isVotingEnabled != "true")
    {
       // voting is unenabled 
       return res.status(400).json(
        {
            status:"failed",
            status_code :400,
            error :"voting is not enabled any more"
        }
       )
    }

    if(!req.body.email)
    {
        return res.status(401).json({
            status:"failed",
            status_code :401,
            error:"email is required !"
           });
    }

 
    //only 5 votes pro email allowed 
    const dateVotes = await VoteRepo.GetVotes(req.body.email);
    if(dateVotes.rowsAffected[0] >= 5)
    {
       return res.status(400).json({
        status:"failed",
        status_code:400,
        error:"only 5 votes pro email is allowed !"
       })
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
  
        // one vote per email and submission allowed
          const voteData = await  VoteRepo.GetVote(req.params.subID , req.body.email);
          if(voteData.rowsAffected[0] >0)
          {
            return res.status(400).json({
                status:"failed",
                status_code:400 ,
                error:"user can give only one vote for the submission"
            })
          }
        
           const updatedData = await VoteRepo.AddVoteToSubmission(req.params.subID, req.body.email);
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