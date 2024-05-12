
const bilderSection = document.getElementById('bilder');
bilderSection.innerHTML = '';
let SelectedSubmissionID = -1 ; 
DisplaySubmission() ; 
let countBilder = 6;

function DisplaySubmission() 
{

    async function getAllsubmission() {

        const response = fetch('http://localhost:3000/submission')
            .then(res => {
                return res.json()
            })
            .catch(err => {
                return err
            });
        return response

    }

    getAllsubmission()
        .then(response => {
            const arrayData = response.data;
            if (arrayData.length > 0)
            {
                
                for (let i = 0; i < arrayData.length; i++)
                     {
                        ResolveSubmissionInHtml(bilderSection,arrayData[i])
                    }
            }
        }).catch(error => {
              console.log(error)
        });

}


 function LikeBtnClicked(event)
{
   console.log(event.target.getAttribute('data-submissionID'));
   SelectedSubmissionID = event.target.getAttribute('data-submissionID');
}


async function ConfirmAddingLike()
{
  const spinner = document.getElementsByClassName('spinner-border')[0];
  const closeBtn = document.getElementsByClassName('btn btn-secondary')[0];
  const email = document.getElementById('email').value ;
  spinner.style.visibility = 'visible';
  closeBtn.style.visibility = 'hidden';
  const data = {email : email.replace(' ','')}

  response = await fetch(`http://localhost:3000/voting/${SelectedSubmissionID}`,
  {method:'post',headers:{
  'Content-Type' : 'application/json'
  },
  body:  JSON.stringify(data)
}
);

if(response.status === 200)
{
  await  UpdateLikeCountForSubmission(SelectedSubmissionID)
}else if(response.status ===400)
    {  
        window.alert('check the given email . be aware that it is only allowd one like per on submission and per email ')
    }else if(response.status ===401)
        {
            window.alert('the email should not be empty !!')
        }
  
  document.getElementById('email').value= '' ;
  spinner.style.visibility = 'hidden';
  closeBtn.style.visibility = 'visible';
closeBtn.click();

}

async function UpdateLikeCountForSubmission(submissionID)
{
   const span=  document.querySelector(`span[data-submissionID="${submissionID}"]`);
   const res =  await fetch (`http://localhost:3000/submission/${submissionID}`) ;
       const resData = await res.json()
       const newLikeCount = resData.data[0].LikeCount
     span.textContent = newLikeCount+'';
}


function ResolveSubmissionInHtml( htmlSection,submission)
{
    htmlSection.innerHTML +=  `
    <div class="element" data-submissionID="${submission.SubmissionID}" > 
    <a href="./bilder.html?sub_id=${submission.SubmissionID}"> <div class="bild" id =\"${submission.SubmissionID}\"  ></div> 
    </a> 
    <div class="bilder_element_footer">
     <button class="like__btn" data-submissionID="${submission.SubmissionID}"  data-toggle="modal" data-target="#exampleModalCenter" onclick="LikeBtnClicked(event)"  >
      <span >
     <i class="far fa-thumbs-up"></i>
     </span> 
     <span  data-submissionID="${submission.SubmissionID}" >${submission.LikeCount}</span> Like 
     </button>
      <div class="kind_name">${submission.ChildName}</div> 
      </div> </div>  `;
   bildDiv = document.getElementById(`${submission.SubmissionID}`);
   bildDiv.style.backgroundImage = `url("/uploads/${submission.ImgName}")`;
   bildDiv.style.backgroundSize = 'cover';
  bildDiv.style.backgrounRepeat = 'no-repeat';
}

  






