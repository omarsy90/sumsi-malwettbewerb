require('dotenv').config() ;
const sql = require('mssql');

class SqlRunner
{
  async  Execute(command)
    {
      await sql.connect(process.env.ConnectionString);
        const queryString = command;
       return await sql.query(queryString);
    }
}


const sqlRunner = new SqlRunner();

module.exports = sqlRunner;