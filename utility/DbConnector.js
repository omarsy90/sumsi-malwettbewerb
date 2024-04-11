const sql = require('mssql')


class DbConnector
{

async GetConnection()
 {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true')
        const result = await sql.query`select * from mytable where id = ${value}`
        console.dir(result)
    } catch (err) {
        // ... error checks
    }

 }

}


const conn = new DbConnector();
module.exports = conn;