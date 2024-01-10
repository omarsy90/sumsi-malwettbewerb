var createHash = require('hash-generator'); // model to creat hash

class SUBMISSION {
    id
    legalguardian_firstname
    legalguardian_lastname
    email
    child_firstname
    child_age
    approval_privacypolicy
    approval_participation
    approval_mailnotification
    imageId
    like
    
    static submissionsArray = [] ;

    constructor(legalguardian_firstname, legalguardian_lastname, email, child_firstname, child_age, approval_privacypolicy, approval_participation, approval_mailnotification, imageId) {

        // creating hash and add it to id 
        var hashLength = 10;
        var hash = createHash(10);
        this.id = hash

        this.legalguardian_firstname = legalguardian_firstname;
        this.legalguardian_lastname = legalguardian_lastname;
        this.email = email;
        this.child_firstname = child_firstname;
        this.child_age = child_age;
        this.approval_privacypolicy = approval_privacypolicy || true;
        this.approval_participation = approval_participation || true;
        this.approval_mailnotification = approval_mailnotification || true;
        this.imageId = imageId;
        this.like = 0

        SUBMISSION.submissionsArray.push(this);

        return this ;

    }


   static findSubmissionBeiId(id){

        const submission = SUBMISSION.submissionsArray.find(element => element.id ==id)
        return submission
    }


    static findSubmissionBeiEmail(email){
         
        const submission = SUBMISSION.submissionsArray.find(element => element.email ==email)
        return submission

    }
}

// console.log( SUBMISSION.findSubmissionBeiId(1) ) ;

module.exports ={

    SUBMISSION :SUBMISSION 
}