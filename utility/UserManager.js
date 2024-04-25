const sql = require('mssql');

class UserManager 
{
    async  CheckUser(email , password)
      {
        await sql.connect('Server=DESKTOP-8MTNL02\\SQLEXPRESS;Database=SubmissionDB; User ID=omar;Password=123;Encrypt=True;TrustServerCertificate=True;');
        const queryString = `Select * from [User] Where Email = \'${email}\' And UserPass = \'${password}\' `;
        const data = await sql.query(queryString);
        if(data.rowsAffected[0]<1)
        {
           return true ;
        } 
        
          return false ;
           
      }


     async HasAdminRole(email , password)
      {
        await sql.connect('Server=DESKTOP-8MTNL02\\SQLEXPRESS;Database=SubmissionDB; User ID=omar;Password=123;Encrypt=True;TrustServerCertificate=True;');
        const queryString = `Select * from [User] Where Email = \'${email}\' And UserPass = \'${password}\' And UserRole =\'admin \' `;
        const data = await sql.query(queryString);
        if(data.rowsAffected[0]>0)
        {
           return true ;
        } 
        
          return true ;
         
      }
  
}

const userMan = new UserManager();
module.exports = userMan ;
