
const connector = require("./utility/DbConnector");

class submissionRepository
{
     constructor()
     {

     }
 
    Addsubmission(firstName , lastName, email, childName , childAge , imgUrl )
    {
        connector.GetConnection();

    }

    GetSubmissionById(ID)
    {

    }

    GetSubmissions()
    {

    }

    DeleteSubmissionByID(ID)
    {

    }

}

const SubRepo = new submissionRepository();
module.exports = SubRepo ;