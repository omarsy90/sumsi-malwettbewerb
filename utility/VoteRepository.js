const sql = require('mssql')

class VoteRepository
{
  
    async GetVote(submissionID , email)
    {
        await sql.connect('Server=DESKTOP-8MTNL02\\SQLEXPRESS;Database=SubmissionDB; User ID=omar;Password=123;Encrypt=True;TrustServerCertificate=True;');
        const queryString = `Select * From Vote Where SubmissionID = ${submissionID}  And Email = \'${email}\' ` ;
        return  await sql.query(queryString);

        
    }  

}

const VoteMan = new VoteRepository();
module.exports = VoteMan ;