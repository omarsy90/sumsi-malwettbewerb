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
const port =  process.env.Port || 5000;

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
app.get('/uploads/:FileName', (req,res)=>{
	
    const filePath = path.join(__dirname, 'uploads', req.params.FileName)
    res.sendFile(filePath);
});


app.listen(port, async() => {
    
    console.log("service started");
    console.log("checking  Database Tables started : Tables will be created if not exist ..")
    try{
        await CreateDBIfNotExist();
    }catch(ex)
    {
         console.log('Creating DB Tables failed. check error: \r'+ex)
         throw ex;
    }
      
    console.log("Database has been checked successfully");
    
   console.log(`server is running on Port ${port}  ...`);
   
})


const SqlRunner = require('./utility/SqlRunner.js');

 async function CreateDBIfNotExist()
{
const command =`

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'AttributeValue')
BEGIN

    PRINT 'Table exists'

END
ELSE
BEGIN
    
	 CREATE TABLE [dbo].[AttributeValue](
	[AttributeValueID] [int] IDENTITY(1,1) NOT NULL,
	[Key] [varchar](50) NULL,
	[Value] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[AttributeValueID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

insert Into [AttributeValue]([Key] ,[Value]) Values('IsSubmissionAllowed','true'),('IsVotingAllowed','true')
END
-------------------------------------------------------------------------------------
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Submission')
BEGIN
    PRINT 'Table exists'
END
ELSE
BEGIN

CREATE TABLE [dbo].[Submission](
	[SubmissionID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](20) NULL,
	[LastName] [varchar](20) NULL,
	[Email] [varchar](100) NULL,
	[ChildName] [varchar](20) NULL,
	[ChildAge] [int] NULL,
	[ImgName] [varchar](1000) NULL,
	[LikeCount] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[SubmissionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Submission] ADD  DEFAULT ((0)) FOR [LikeCount]
    
END
------------------------------------------------------------------------------
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Vote')
BEGIN
    PRINT 'Table exists'
END
ELSE
BEGIN
   
   CREATE TABLE [dbo].[Vote](
	[VoteID] [int] IDENTITY(1,1) NOT NULL,
	[SubmissionID] [int] NULL,
	[Email] [varchar](100) NULL
) ON [PRIMARY]

END
-----------------------------------------------------------------------------
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'User')
BEGIN
    PRINT 'Table exists'
END
ELSE
BEGIN
   
   CREATE TABLE [dbo].[User](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](20) NULL,
	[Email] [varchar](100) NULL,
	[UserPass] [varchar](100) NULL,
	[UserRole] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


Insert Into  [dbo].[User] (Email,UserName,UserPass,UserRole) Values('admin@gmail.com','adminUser','1123','admin')

END

`
await SqlRunner.Execute(command);

}


//-------------------------------------------------------code von api ----------------
