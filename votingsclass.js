const createHash = require('hash-generator');
const submission = require('./submissionRepository') ;
class VOTING {


    id
    email
    submission_id

    static votingsArray = [];

    constructor(email, submission_id) {

        
             
            
            let length = 10;
            let hash = createHash(length);
            this.id = hash;

            this.email = email;
            this.submission_id = submission_id;
            
            submission.findSubmissionBeiId(submission_id).like +=1 ;
            VOTING.votingsArray.push(this);

            



        

        

    }


    static getAllVotings() {

        return VOTING.votingsArray;

    }


    static getVottingsBeiSub_id(sub_id) {

        let subArray = [];
        VOTING.votingsArray.map(element => {

            if (element.submission_id == sub_id) {
                subArray.push(element)
            }


        });

        return subArray;

    }


    static CheckVoting(email, sub_id) {

        // check if voter have 5 voting 
        let count = 0;

        VOTING.votingsArray.map(element => {

            if (element.email == email) {
                count++;
            }
        });

        if (count == 5) {
            return {ok:false, type:'err1'};
        }



        // check if voter has already voted to submissin_id
        let wiederholung = 0;
        VOTING.votingsArray.map(element => {

            if (element.email == email && element.submission_id == sub_id) {

                console.log('hi  i am wiederhlot');
                wiederholung++ ;
            }
        });
        
        if(wiederholung >0){
            return {ok:false, type:'err2'};
        }


        return {ok:true};




    }


    static countVoting(sub_id) {

        return VOTING.getVottingsBeiSub_id(sub_id).length;
    }








}


module.exports ={
    VOTING:VOTING 
}