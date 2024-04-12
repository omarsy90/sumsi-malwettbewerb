const express = require('express');
const path = require('path')
const cors = require('cors'); // middleware 
const cookieParser = require('cookie-parser') // import(require it) the cookie-parser middleware
var jwt = require('jsonwebtoken');

// to change the situation of submission and voting
const submissionOpen = true;
const votingOpen = true;
//------------------------------------
const app = express();
const port = process.env.PORT || 3000;

const SubmissionRouter = require('./submission');
const VoteRouter = require('./voting.js');

// middleware  (use it!)------------------------------------
app.use(cors())
//app.use(cookieParser()) // <- new cookie parser

// if you want to use POST/PUT (send body in your request)
// then you need these as well:
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());



app.get('/:FileName', (req,res)=>{
    console.log(__dirname);
    const filePath = path.join(__dirname, 'uploads', req.params.FileName)
res.sendFile(filePath);

});
app.use('/submission',SubmissionRouter);
app.use('/voting',VoteRouter);


app.listen(3000, () => {
    console.log('server is running...');
})

//-------------------------------------------------------code von api ----------------


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