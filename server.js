const express = require('express');
const cors = require('cors'); // middleware 
const cookieParser = require('cookie-parser') // import(require it) the cookie-parser middleware

translateText = require('./translation.js').translateText;

var jwt = require('jsonwebtoken');

// to change the situation of submission and voting
const submissionOpen = true;
const votingOpen = true;
//------------------------------------


const app = express();
const port = process.env.PORT || 3000;

// ------middleware to handle multidata form -----------------------

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});

const maxsize = 1 * 1024 * 1024;

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cd) => {

        const str = file.originalname.split('.');
        const ext = str[str.length - 1];
        const sub = submission.findSubmissionBeiEmail(req.body.email);
        console.log(ext);
        console.log(sub);
        if ( (ext == 'png' || ext == 'jpg' || ext == 'jpeg') && (submissionOpen === true)    ) {
            //   req.omar = 'xxxx' ;
            if(sub){
               // if ther is an foto but email has alredy tocken will be foto not saved 
    
                cd(null, false);
                return req.file = true ;
            }
            cd(null, true);
        } else {
            //    req.omar = 'yyyy' ;
            cd(null, false);
            return cd(console.log('it is not allowed '))
        }
    },

})



//-------------------------------------------------------------

// middleware  (use it!)------------------------------------
app.use(cors())
//app.use(cookieParser()) // <- new cookie parser

// if you want to use POST/PUT (send body in your request)
// then you need these as well:
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());





app.post('/translate', (req, res) => {

    //  console.log(req.body.txt);
    let txt = req.body.txt
    let sprache = req.body.sprache;
    translateText(txt, sprache)
        .then(response => {
            res.json({
                txt: response
            })
        })
        .catch(err => {
            console.log(err)
        });


})

app.get('/', (req, res) => {
    res.send('hallow world');
})




app.listen(3000, () => {
    console.log('server is running...');
})

//-------------------------------------------------------code von api ----------------

const submission = require('./submissionclass').SUBMISSION;
const image = require('./imageclass').IMAGE;

//image_1 = new image('omar', 'jpg', 13323232);

//-------------------------------

// to convert (1,0) ('true','false') that is string to boolean
function toBool(string) {
    if (string === 'true' || string === 'false' || string === '1' || string === '0') {
        return true;
    } else {
        return false;
    }
}


//








// middleware to checkout status of the felds and data requested
const checkoutSubmission = (req, res, next) => {

    //   console.log('hier ist checkout :',req.body);
    console.log(req.body);

    const err = {};
    if (submissionOpen === false) {

        err.message = 'submission is not more activ';
        err.ok = false;

        return res.status(422).json({

            errors: err
        })
    }


    console.log('hier ist checkout :', req.body);
    //  console.log(req.file);
    const legalguardian_firstname = req.body.vorname;
    const legalguardian_lastname = req.body.nachname;
    const email = req.body.email;
    const child_firstname = req.body.kindname;
    const child_age = req.body.alter;

    const approval_privacypolicy = req.body.zustimmung1;
    const approval_participation = req.body.zustimmung2;
    const approval_mailnotification = req.body.zustimmung3;
    const isImg = req.file 

    // checkout if all parameters are fulled 
    if (legalguardian_firstname && legalguardian_lastname && email && child_firstname && child_age && approval_privacypolicy && approval_participation && approval_mailnotification && isImg) {
        // if all parameters are exist and fulled

        // toBool chnage (1,0 ),('true','false') to boolean  true oder false
        if (!toBool(approval_privacypolicy)) {
            err.approval_privacypolicy = 'The approval privacypolice field must be true or false'
            err.ok = false;
        }
        if (!toBool(approval_participation)) {
            err.approval_participation = 'The approval participation field must be true or false'
            err.ok = false;
        }
        if (!toBool(approval_mailnotification)) {
            err.approval_mailnotification = 'The approval mailnotification field must be true or false'
            err.ok = false;
        }


        const sub = submission.findSubmissionBeiEmail(req.body.email);
        if (sub) {
            //if email has already tooken
            err.email = 'The email has already been taken';
            err.ok = false;
        } else {
            // if the email vote as first one to detemeind submission
            console.log('email ist neu');

        }

    } else {
        // nicht alle felder ist fülled
        err.ok = false;
        if (!legalguardian_firstname) {
            err.legalguardian_firstname = 'The legalguardian_firstname field is required'
        }
        if (!legalguardian_firstname) {
            err.legalguardian_lastname = 'The legalguardian_lastname field is required'
        }
        if (!email) {
            err.email = 'The email field is required'
        }
        if (!child_firstname) {
            err.child_firstname = 'the child_firstname is required'
        }
        if (!child_age) {
            err.child_age = 'child_age is required'
        }
        if (!approval_privacypolicy) {
            err.approval_privacypolicy = 'The approval privacypolicy field is required.'
        }
        if (!approval_participation) {
            err.approval_participation = 'The approval participation field is required.'
        }
        if (!approval_mailnotification) {
            err.approval_mailnotification = 'The approval mailnotification  field is required.'
        }
        if ( (isImg == false) || !isImg) {
            err.image = 'The image field is required.'
        };




    }

    if (JSON.stringify(err) != '{}') {
        // if there is an error 

        console.log(err)
        return res.status(422).json({
            message: 'The given data was invalid.',
            errors: err
        })

    } else {
        // if all thing right 
        next();
    }








}

app.post('/upload', upload.single('image'), checkoutSubmission, (req, res) => {

    const image1 = new image(req.file.filename, req.file.mimetype.split('/')[1], req.file.size)
    const sub = new submission(req.body.vorname, req.body.nachname, req.body.email, req.body.kindname, req.body.alter, req.body.zustimmung1, req.body.zustimmung2, req.body.zustimmung3, image1.id);

    res.status(200).json({
        status: "success",
        status_code: 200,
        message: "api.messages.store.success",
        data: sub
    })


});

app.get('/submission/:sub_id', (req, res) => {

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


const fs = require('fs'); // this object we need to delete imagefile 
const console = require('console');

app.delete('/submission/:sub_id', (req, res) => {
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




app.get('/submission', (req, res) => {

    submission.submissionsArray.map(sub => {
        sub.image = image.imgaesArray.find(img => img.id == sub.imageId)
    });

    console.log(submission.submissionsArray);

    res.status(200).json({
        status: "success",
        status_code: 200,
        message: "api.messages.index.success",
        data: submission.submissionsArray
    });



});


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
        console.log(voting.CheckVoting(email, sub_id).type)

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

app.post('/submission/:sub_id/voting', checkVotingRequest, (req, res) => {

    const vote = new voting(req.body.email, req.params.sub_id)
    console.log(voting.votingsArray.length);


    res.status(200).json({
        ok:true ,
        status: "success",
        status_code: 200,
        message: "api.messages.store.success",
        data: null

    })




});

app.get('/submission/:sub_id/voting', (req, res) => {

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



app.get('/submission/:sub_id/votes/count', (req, res) => {

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






app.get('/setting', (req, res) => {


    return res.status(200).json({

        status: "success",
        status_code: 200,
        message: "api.messages.index.success",
        data: {
            submission_open: submissionOpen,
            voting_open: votingOpen
        }
    });


});


var privateKey = '112358'



app.post('/login', (req, res) => {
    // res.clearCookie("test");
    // const auth = req.headers.cookie?.split(';')[0]?.split('=')[1]
    //   console.log(auth);
    /*  try {
          var decoded = jwt.verify(auth, privateKey);
          console.log(decoded);
        } catch(err) {
          // err
        }
          */

    console.log(req.body.email);
    console.log(req.body.password);

    const creadentials = {
        email: 'kosche@gmail.com',
        password: '1123581321'
    };

    if (req.body.email === creadentials.email && req.body.password === creadentials.password) {

        var token = jwt.sign(creadentials, privateKey);

        //  res.cookie('Autho',token,/* { maxAge: 900000, httpOnly: true }*/);
        //  res.cookie('test','hi',/* { maxAge: 900000, httpOnly: true }*/);

        return res.status(200).json({
            status: 'access',
            token: token
        })

    }

    return res.status(401).json({
        error: 'invalid credentials'
    })


});