require('dotenv').config();
const express = require('express');
const path = require('path')
const cors = require('cors'); // middleware 
const cookieParser = require('cookie-parser') // import(require it) the cookie-parser middleware


// to change the situation of submission and voting
const submissionOpen = true;
const votingOpen = true;
//------------------------------------
const app = express();
const port = process.env.PORT || 3000;

const SubmissionRouter = require('./submissionRouter.js');
const VoteRouter = require('./votingRouter.js');
const AuthRouter = require('./authRouter.js');

// middleware  (use it!)------------------------------------
app.use(cors())
//app.use(cookieParser()) // <- new cookie parser

// if you want to use POST/PUT (send body in your request)
// then you need these as well:
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());



app.use('/login',AuthRouter);
app.use('/submission',SubmissionRouter);
app.use('/voting',VoteRouter);
app.get('/:FileName', (req,res)=>{
    
    const filePath = path.join(__dirname, 'uploads', req.params.FileName)
    res.sendFile(filePath);
});


app.listen(3000, () => {
    
    console.log('server is running...');
    console.log(process.env.test)
})

//-------------------------------------------------------code von api ----------------









  
