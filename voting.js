const express = require('express') ;
const router = express.Router() ;


const voting = require('./votingsclass').VOTING;

const checkVotingRequest = (req, res, next) => {
       
      let err = {} ;
    if (votingOpen === false) {
        
        err.message = 'voting  is not more activ' ;
        err.status_code = 100 ;
       
    }

    let email = req.body.email;
    let sub_id = req.params.sub_id;
    if (!email) {
        // if emailfeld is empty 
        
        err.message = 'The given data was invalid' 
        err.email = 'The email field is required'
        err.status_code = 101
       
    }

    if (!sub_id) {
        // if sabmissionId not requested
       
        err.message = 'The given data was invalid.' ;
        err.submission = 'The submissionId is required' ;
        err.status_code = 102
       
    }



    if (!submission.findSubmissionBeiId(req.params.sub_id)) {
        // if submission object not exist in database 
       
        err.message = 'The given data was invalid.' ;
        err.email = 'The submissionid given is not found' ;
        err.status_code = 103
       

    }

    if (voting.CheckVoting(email, sub_id).ok === false) {
        

        if (voting.CheckVoting(email, sub_id).type == 'err1') {
            // if votes more than 5 once 
                 
                 err.message = 'Only 5 votes per user allowed' ;
                 err.status = 'error' ;
                 err.status_code = 500 ;
           

        } else {

            // if user try to vote the same submission second

            
            err.status = 'error';
            err.message = 'Only 1 vote per image allowed' ;
            err.status_code = 501 ;
            


        }


    } 


    if(JSON.stringify(err) !='{}'){

     return   res.status(500).json({
            ok:false ,
            errors:err
        })
  // if there is an error

    }else{
            next()
        // if all thing right 
    }
     







}

router.post('/:sub_id/voting', checkVotingRequest, (req, res) => {

    const vote = new voting(req.body.email, req.params.sub_id)
   


    res.status(200).json({
        ok:true ,
        status: "success",
        status_code: 200,
        message: "api.messages.store.success",
        data: null

    })




});

router.get('/:sub_id/voting', (req, res) => {

    let sub_id = req.params.sub_id;
    const sub_object = submission.findSubmissionBeiId(sub_id);

    if (!sub_object) {

        return res.status(500).json({
            ok: false,
            message: 'submissionid is not found'
        })

    }

    const allvoting = voting.getVottingsBeiSub_id(sub_id);
    res.status(200).json({
        ok: true,
        data: allvoting
    });

});



router.get('/:sub_id/votes/count', (req, res) => {

    const sub_id = req.params.sub_id;
    const sub_object = submission.findSubmissionBeiId(sub_id);

    if (!sub_object) {

        return res.status(500).json({
            ok: false,
            message: 'submissionid is not found'
        })

    }

    return res.status(200).json({
        ok: true,
        votes: sub_object.like
    });



});


module.exports = router;