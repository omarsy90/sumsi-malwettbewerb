import { BasicUrl } from "/global.js";
const errroParagraf = document.getElementById("error-paragraph") ;
const successParagraf =document.getElementById('success-paragraph') ;
const form = document.getElementById('form');

form.addEventListener('submit',  async (e)=>{
    e.preventDefault();
    successParagraf.style.display ='none';
    errroParagraf.style.display ='none';

    const formData = new FormData(form);

const result =await submite(formData);
console.log(result);
if(result.status ==='success')
{
  successParagraf.style.display ='block';
  errroParagraf.style.display ='none';
}else{
  const errorMessage = result?.message?.replace('\n','<br/>')
  errroParagraf.innerHTML = errorMessage;
  successParagraf.style.display ='none';
  errroParagraf.style.display ='block';
}
  
})

async function submite(data) {

const requestOptions = {
  method: "POST",
  body: data,
  redirect: "follow"
};

  const response = await fetch(`${BasicUrl}/submission`, requestOptions)
  .then((response) => response.json())
  .catch((error) => console.error(error));
      return response;
}





