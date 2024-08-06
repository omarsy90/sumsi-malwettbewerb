require('dotenv').config() ;
const sql = require('mssql');
class AttributeValueRepository
{

    constructor()
    {

    }

    async   GetValue(keyName)
      {
        await sql.connect(process.env.ConnectionString);
        const queryString = `Select Top 1 * from AttributeValue where [Key] = '${keyName}' `;
       return await sql.query(queryString);
    
    }

    async SetValue(keyName , value)
    {
        await sql.connect(process.env.ConnectionString);
        const queryString = `update AttributeValue set [value]= '${value}' where   [Key] = '${keyName}' `;
          await sql.query(queryString);
          return  await this.GetValue(keyName);
            
    }




     
}

const attributeValueRepo = new AttributeValueRepository();

module.exports = attributeValueRepo ;
