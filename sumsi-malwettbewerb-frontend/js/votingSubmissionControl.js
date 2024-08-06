import { BasicUrl } from "/global.js";
const submissionStatusSwitcher = document.querySelector('#submission-toggle');
const VotingStatusSwitcher = document.querySelector('#voting-toggle');
const submissionSpinner = document.querySelector('.spinner-submission');
const votingSpiner = document.querySelector('.spinner-voting');
const submissionRequestError = document.querySelector('#submission-request-error');
const VotingRequestError = document.querySelector('#voting-request-error');
const submissionUnkownValue = document.querySelector('#toggle1-defaultValue');
const submissionActiveValue = document.querySelector('#toggle1-active');
const submissionUnactiveValue = document.querySelector('#toggle1-notActive');

const votingUnkownValue = document.querySelector('#toggle2-defaultValue');
const votingActiveValue = document.querySelector('#toggle2-active');
const votingUnactiveValue = document.querySelector('#toggle2-notActive');

displaysubmissionStatus();
displayVotingStatus();


async function displaysubmissionStatus()
{    
    submissionSpinner.style.visibility = 'visible';
      const response =   await GetSubmissionStatus();
      if(response?.status_code ===200)
        {
            SolveSubmissionStatus(response.isSubmissionEnabled)
        }else{
            console.log(submissionRequestError);
            submissionRequestError.style.display ='block';
            
        }
        submissionSpinner.style.visibility = 'hidden';
}

async function GetSubmissionStatus(){
    const response = await fetch(`${BasicUrl}/submission/ControlSubmission`,{
        method:'GET',
    }).then(res=>res.json()).catch(err=>err) ;

       return response ;
}


function SolveSubmissionStatus(status)
{
    submissionUnkownValue.style.display='none';
     if(status ==='true')
     {
        submissionStatusSwitcher.checked = true;
        submissionActiveValue.style.display='block';
        submissionUnactiveValue.style.display ='none'
     }

     else if(status ==='false')
    {
     submissionStatusSwitcher.checked= false;
     submissionUnactiveValue.style.display ='block'
     submissionActiveValue.style.display='none';
     } 
}


 async function displayVotingStatus()
 {
    votingSpiner.style.visibility ='visible';
   const response = await GetVotingStatus();
   if(response?.status_code ===200)
    {
        SolveVotingStatus(response.votingStatus)
    }else{
      
        VotingRequestError.style.display ='block';
        
    }
    votingSpiner.style.visibility = 'hidden';

 }

 async function GetVotingStatus()
 {
    const requestOption = {
        method:'Get'
    }
    const response = await fetch(`${BasicUrl}/voting/ControlVoting`, requestOption)
                           .then(res=> res.json()).catch(err=>err);
                           return response;
 }

 function SolveVotingStatus(votingstatus)
 {
    
    votingUnkownValue.style.display = 'none';
     if(votingstatus ==='true')
     {
        VotingStatusSwitcher.checked = true;
       votingActiveValue.style.display = 'block';
       votingUnactiveValue.style.display='none';
       
     }else if(votingstatus ==='false')
     {
        VotingStatusSwitcher.checked = false;
        votingUnactiveValue.style.display='block';
        votingActiveValue.style.display = 'none';
        
     }
 }

submissionStatusSwitcher.addEventListener('change',async(e)=>{
    e.preventDefault();
       submissionSpinner.style.visibility ='visible'
         const resonse  = await UpdateSubmissionStatus(submissionStatusSwitcher.checked);
          if(resonse?.status_code ===200)
          {
               await  displaysubmissionStatus();
          }else{
            submissionRequestError.style.display ='block';
            submissionStatusSwitcher.checked = !submissionStatusSwitcher.checked 
          }

   submissionSpinner.style.visibility ='hidden';
     //updateUI

});



VotingStatusSwitcher.addEventListener('change',async (e)=>{
  e.preventDefault();
  votingSpiner.style.visibility ='visible'
    

 
  const response = await updateVotingStatus(VotingStatusSwitcher.checked);

  if(response?.status_code ===200)
  {
       await displayVotingStatus()
  }else{
        VotingRequestError.style.display ='block';
        VotingStatusSwitcher.checked = !VotingStatusSwitcher.checked;
  }
   
  
  votingSpiner.style.visibility ='hidden'

})

async function updateVotingStatus(status)
{
  const token = localStorage.getItem('token');
  const myHeaders = new Headers();
  myHeaders.append('Authorization','Bearer '+token);
  myHeaders.append('Content-Type','application/json');
    const newStatus = status===true ? 'true': 'false';
    const raw = JSON.stringify({
      VotingStatus:newStatus
    }) ;

    const requestOption = {
      method:'POST',
      headers:myHeaders,
      body:raw
    }

     const response = await fetch(`${BasicUrl}/voting/ControlVoting`,requestOption)
                            .then(res=>res.json())
                            .catch(err=> err);
                            return response ;

}

async function UpdateSubmissionStatus(status){
    // get token
    
    const token =  localStorage.getItem('token') ;
    const myHeaders = new Headers();
    myHeaders.append('Authorization','Bearer '+token);
    myHeaders.append("Content-Type", "application/json");
   
    const newStatus = status ===true ? 'true': 'false';   
    const raw = JSON.stringify( {
        newSubmissionStatus: newStatus
      });
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body:raw,
      };
     const response = await fetch(`${BasicUrl}/submission/ControlSubmission`,requestOptions)
     .then(res=>res.json()).catch(err=>{return {messge:"error while updating submission Status"} });
     return response ;
  
}



