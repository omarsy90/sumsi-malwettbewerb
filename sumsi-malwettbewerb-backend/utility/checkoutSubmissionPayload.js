const checkoutSubmissionPayload = (req, res, next) =>
 {
    
    let err = ""; 
    const legalguardian_firstname = req.body.legalguardian_firstname;
    const legalguardian_lastname = req.body.legalguardian_lastname;
    const email = req.body.email;
    const child_firstname = req.body.child_firstname;
    const child_age = req.body.child_age;

    const approval_privacypolicy = req.body.approval_privacypolicy;
    const approval_participation = req.body.approval_participation;
    const approval_mailnotification = req.body.approval_mailnotification;
    const isImg = req.body.isImage ;

        if (!legalguardian_firstname) {
            err += '\nThe legalguardian_firstname field is required'
        }
        if (!legalguardian_lastname) {
            err += '\nThe legalguardian_lastname field is required'
        }
        if (!email) {
            err += '\nThe email field is required'
        }
        if (!child_firstname ) {
            err += '\nthe child_firstname is required'
        }
        if (!child_age || isNaN(child_age)) {
            err += '\nchild_age is required and must be number'
        }
        if (!approval_privacypolicy ) {
            err += '\nThe approval privacypolicy field is required.'
        }
        if (!approval_participation) {
            err += '\nThe approval participation field is required.'
        }
        if (!approval_mailnotification) {
            err += '\nThe approval mailnotification  field is required.'
        }
        if ( (isImg === false) || !isImg) {
            err += '\nThe image field is required.'
        };


 
    if(err !=="" ){
     return    res.status(422).json({
            status:'failed',
            status_code :422,
            error:err
         })
    }else{
        next();
    }

}

module.exports = checkoutSubmissionPayload ;
