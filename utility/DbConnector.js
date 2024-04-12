const sql = require('mssql')


class DbConnector
{

async GetConnection()
 {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=DESKTOP-8MTNL02\\SQLEXPRESS;Database=ProducktSystem; User ID=omar;Password=123;Encrypt=True;TrustServerCertificate=True;')
       // const result = await sql.query`select * from mytable where id = ${value}`
       // console.dir(result)
       console.log("connected");
    } catch (err) {
        // ... error checks
        console.log(err);
    }

 }

}


const conn = new DbConnector();
module.exports = conn;