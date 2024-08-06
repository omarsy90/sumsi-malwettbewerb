import { BasicUrl } from "/global.js";
const sendLikeForm = document.getElementById('sendLikeForm');
sendLikeForm.addEventListener('submit',(e)=>{
e.preventDefault();
ConfirmAddingLike(e)

});
const  seeMoreBtn = document.getElementById("see_more");
seeMoreBtn.addEventListener('click',(e)=>{
    ShowMoreSubmission(e);
});
const SubmissionHtmlSection = document.getElementById('bilder');
let SelectedSubmissionID = -1 ; 
 DisplaySubmission() ; 
let SubmissionArray  = [] ;
let MaxDisplayedSubmission = 6;
let Increment = 2;
let LastIndexOfDisplayedSubmission  = 0;



async function DisplaySubmission() 
{

    async function getAllsubmission() {

        const response = fetch(`${BasicUrl}/submission`)
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
            
             SubmissionArray = SubmissionArray.concat( response.data);
            if (SubmissionArray.length >= 1 && SubmissionArray[0] !=undefined)
            {
                SubmissionHtmlSection.innerHTML = '';
                for (let i = 0; i < SubmissionArray.length; i++)
                    {
                        if(i < MaxDisplayedSubmission )
                            {
                                ResolveSubmissionInHtml(SubmissionHtmlSection,SubmissionArray[i]);
                                LastIndexOfDisplayedSubmission = i;
                            }  
                    }
            }
            CheckShowMoreButtonVisibility();
        });

}


function ShowMoreSubmission(event)
{
     if(SubmissionArray.length <= LastIndexOfDisplayedSubmission+1)
        {
            
            return ;
        }
        let newMaxDisplayedSubmission = MaxDisplayedSubmission+Increment ;
        for(let i = LastIndexOfDisplayedSubmission+1 ; i< SubmissionArray.length ; i++)
            {
                 if( i < newMaxDisplayedSubmission) 
                    {
                        ResolveSubmissionInHtml(SubmissionHtmlSection,SubmissionArray[i]);
                        LastIndexOfDisplayedSubmission = i;
                    }        
           }
      
           MaxDisplayedSubmission = newMaxDisplayedSubmission;
           CheckShowMoreButtonVisibility(); 
}

function CheckShowMoreButtonVisibility()
{
    if(LastIndexOfDisplayedSubmission === SubmissionArray.length -1 )
        {
            
            seeMoreBtn.style.visibility ="hidden";
        }

        
    
}

 function LikeBtnClicked(event)
{
    event.preventDefault();
    document.getElementById('email').value= '' ;
    const errParagraph = document.querySelector('.error-likeRequest');
    errParagraph.style.display='none';
   
   SelectedSubmissionID = event.target.getAttribute('data-submissionid');
   console.log(SelectedSubmissionID);
}


async function ConfirmAddingLike(event)
{
    

  const spinner = document.getElementsByClassName('spinner-border')[0];
  const closeBtn = document.getElementsByClassName('btn btn-secondary')[0];
  const email = document.getElementById('email').value ;
  spinner.style.visibility = 'visible';
  const data = {email : email.replace(' ','')}

  const response = await fetch(`${BasicUrl}/voting/${SelectedSubmissionID}`,
  {method:'post',headers:{
  'Content-Type' : 'application/json'
  },
  body:  JSON.stringify(data)
}
).then(res=> res.json())
.catch(err =>{
    return {error:'calling url error'}
});

const errParagraph = document.querySelector('.error-likeRequest');
if(response?.status_code === 200)
{
  await  UpdateLikeCountForSubmission(SelectedSubmissionID);
 
 closeBtn. click();
}else {
   errParagraph.innerHTML = response?.error ;
   errParagraph.style.display='block';
}
  
spinner.style.visibility = 'hidden';
 
}

async function UpdateLikeCountForSubmission(submissionID)
{
   const span=  document.querySelector(`span[data-submissionID="${submissionID}"]`);
   const res =  await fetch (`${BasicUrl}/submission/${submissionID}`) ;
       const resData = await res.json()
       const newLikeCount = resData.data[0].LikeCount
     span.textContent = newLikeCount+'';
}


function ResolveSubmissionInHtml( htmlSection,submission)
{

    const newDiv = document.createElement('div');
    newDiv.classList.add("element");
    newDiv.innerHTML =  `
    <div  data-submissionID="${submission.SubmissionID}" > 
    <a href="./bilder.html?sub_id=${submission.SubmissionID}"> <div class="bild" id =\"${submission.SubmissionID}\"  ></div> 
    </a> 
    <div class="bilder_element_footer">
     <button id="btn_${submission.SubmissionID}" class="like__btn" data-submissionID="${submission.SubmissionID}"  data-toggle="modal" data-target="#exampleModalCenter"  >
      <span >
     <i class="far fa-thumbs-up"></i>
     </span> 
     <span  data-submissionID="${submission.SubmissionID}" >${submission.LikeCount}</span> Like 
     </button>
      <div class="kind_name">${submission.ChildName}</div> 
      </div> </div>  `;
      SubmissionHtmlSection.append(newDiv);
   const bildDiv = document.getElementById(`${submission.SubmissionID}`);
   bildDiv.style.backgroundImage = `url("${BasicUrl}/uploads/${submission.ImgName}")`;
   bildDiv.style.backgroundSize = 'cover';
  bildDiv.style.backgrounRepeat = 'no-repeat';
  
  

  const likeBtn = document.getElementById(`btn_${submission.SubmissionID}`);

  likeBtn.addEventListener('click',(e)=>{
      e.preventDefault();
     LikeBtnClicked(e)
  });

}

  






