require('dotenv').config() ;
const sql = require('mssql')

class submissionRepository
{
     constructor()
     {

     }

     async TestConnection()
 {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(process.env.ConnectionString);
       console.log("connected");
         return true;
    } catch (err) {
        // ... error checks
        console.log(err);
          return false;
    }

 }


  async  Addsubmission(firstName , lastName, email, childName , childAge , imgName )
    {
            await sql.connect(process.env.ConnectionString);
            const queryString = `Insert Into Submission(FirstName,LastName,Email,ChildName,ChildAge,ImgName)
            Values(\'${firstName}\', \'${lastName}\', \'${email}\', \'${childName}\' , ${childAge}, \'${imgName}\')`;
      return await sql.query(queryString);  
    }

   async GetSubmissionById(ID)
    {
      await sql.connect(process.env.ConnectionString);
      const queryString = `Select * from Submission where SubmissionID = ${ID}`;
     return await sql.query(queryString);

    }

   async GetSubmissions()
    {
      await sql.connect(process.env.ConnectionString);
      const queryString = `Select * from Submission`;
    return  await sql.query(queryString);

    }

   async DeleteSubmissionByID(ID)
    {
      await sql.connect(process.env.ConnectionString);
      const queryString = `Delete From Submission Where SubmissionID = ${ID}`;
   return   await sql.query(queryString);
    }

    async UpdateSubmission(ID,firstName , lastName, email, childName , childAge , imgName , LikeCount )
    {
      await sql.connect(process.env.ConnectionString);
      const queryString = `Update Submission Set FirstName = \'${firstName}\' , LastName = \'${lastName}\' , Email = \'${email}\' , ChildName = \'${childName}\' , ChildAge = ${childAge} ,
      ImgName = \'${imgName}\' , LikeCount = ${LikeCount}
      Where SubmissionID = ${ID}` ;
    return await sql.query(queryString);
    }

    async CheckSubmission(email)
    {
      await sql.connect(process.env.ConnectionString);
      const queryString = `Select * from Submission Where Email = \'${email}\'` ;
      return await sql.query(queryString);

    }

    async GetTheMostInsertedRecord(){

      await sql.connect(process.env.ConnectionString);
      const queryString = `Select Top 1 * From Submission order by 1 desc ` ;
      return await sql.query(queryString);
    }

    

}

const SubRepo = new submissionRepository();
module.exports = SubRepo ;