require('dotenv').config() ;
const sql = require('mssql')

class VoteRepository
{
  
    async GetVote(submissionID , email)
    {
        await sql.connect(process.env.ConnectionString);
        const queryString = `Select * From Vote Where SubmissionID = ${submissionID}  And Email = \'${email}\' ` ;
        return  await sql.query(queryString);  
    }  


 async GetVotes( email)
 {
    await sql.connect(process.env.ConnectionString);
    const queryString =`Select * From Vote Where [Email] = \'${email}\' ;  `
    return sql.query(queryString);
 }

 async AddVoteToSubmission(submissionID, email)
    {
      await sql.connect(process.env.ConnectionString);
      const queryString =` Declare @likeCount Int ;
      Select Top 1 @likeCount = LikeCount from Submission where SubmissionID = ${submissionID} ;
     Set @likeCount = @likeCount +1 ;
     Update Submission Set LikeCount = @likeCount where SubmissionID = ${submissionID}  ;
       Insert Into Vote(SubmissionID , [Email]) Values (${submissionID} , \'${email}\'  ) `
      return await sql.query(queryString);

    }

}

const VoteMan = new VoteRepository();
module.exports = VoteMan ;