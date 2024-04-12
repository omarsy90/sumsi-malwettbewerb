
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
        await sql.connect('Server=DESKTOP-8MTNL02\\SQLEXPRESS;Database=SubmissionDB; User ID=omar;Password=123;Encrypt=True;TrustServerCertificate=True;')
       // const result = await sql.query`select * from mytable where id = ${value}`
       // console.dir(result)
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
            await sql.connect('Server=DESKTOP-8MTNL02\\SQLEXPRESS;Database=SubmissionDB; User ID=omar;Password=123;Encrypt=True;TrustServerCertificate=True;');
            const queryString = `Insert Into Submission(FirstName,LastName,Email,ChildName,ChildAge,ImgName)
            Values(\'${firstName}\', \'${lastName}\', \'${email}\', \'${childName}\' , ${childAge}, \'${imgName}\')`;
      return await sql.query(queryString);  
    }

   async GetSubmissionById(ID)
    {
      await sql.connect('Server=DESKTOP-8MTNL02\\SQLEXPRESS;Database=SubmissionDB; User ID=omar;Password=123;Encrypt=True;TrustServerCertificate=True;');
      const queryString = `Delete from Submission where SubmissionID = ${ID}`;
     return await sql.query(queryString);

    }

   async GetSubmissions()
    {
      await sql.connect('Server=DESKTOP-8MTNL02\\SQLEXPRESS;Database=SubmissionDB; User ID=omar;Password=123;Encrypt=True;TrustServerCertificate=True;');
      const queryString = `Select * from Submission`;
    return  await sql.query(queryString);

    }

   async DeleteSubmissionByID(ID)
    {
      await sql.connect('Server=DESKTOP-8MTNL02\\SQLEXPRESS;Database=SubmissionDB; User ID=omar;Password=123;Encrypt=True;TrustServerCertificate=True;');
      const queryString = `Delete From Submission Where SubmissionID = ${ID}`;
   return   await sql.query(queryString);
    }

    async UpDateSubmission(ID,firstName , lastName, email, childName , childAge , imgName , LikeCount )
    {
      await sql.connect('Server=DESKTOP-8MTNL02\\SQLEXPRESS;Database=SubmissionDB; User ID=omar;Password=123;Encrypt=True;TrustServerCertificate=True;');
      const queryString = `Update Submission Set FirstName = \'${firstName}\' , LastName = \'${lastName}\' , Email = \'${email}\' , ChildName = \'${childName}\' , ChildAge = ${childAge} ,
      ImgName = \'${imgName}\' , LikeCount = ${LikeCount}
      Where SubmissionID = ${ID}` ;
    return await sql.query(queryString);
    }

    async CheckSubmission(email)
    {
      await sql.connect('Server=DESKTOP-8MTNL02\\SQLEXPRESS;Database=SubmissionDB; User ID=omar;Password=123;Encrypt=True;TrustServerCertificate=True;');
      const queryString = `Select * from Submission Where Email = \'${email}\'` ;
      return await sql.query(queryString);

    }

    async GetTheMostInsertedRecord(){

      await sql.connect('Server=DESKTOP-8MTNL02\\SQLEXPRESS;Database=SubmissionDB; User ID=omar;Password=123;Encrypt=True;TrustServerCertificate=True;');
      const queryString = `Select Top 1 * From Submission order by 1 desc ` ;
      return await sql.query(queryString);
    }

}

const SubRepo = new submissionRepository();
module.exports = SubRepo ;