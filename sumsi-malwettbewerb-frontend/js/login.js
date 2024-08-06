
 import { BasicUrl } from "/global.js";

const errorParagraph = document.querySelector(".error_notify");
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {

event.preventDefault();
  let data = {};
  data.email = document.getElementById('email').value;
  data.password = document.getElementById('password').value;

  const result = await   getToken(data);
  console.log(result);
  if(result?.status_code ===200)
  {
    PersistData(result.token);
    window.location.href ='votingSubmissionControl.html'
  }else{
    // credenatial not valid
    console.log(errorParagraph);
    errorParagraph.style.display ="block";
  }
   

});

function PersistData(txt)
{
  localStorage.setItem('token',txt);
}


async function getToken(data) {

  const response = await fetch(`${BasicUrl}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }

  })
  return await response.json();

}


async function getSetting() {

  const response = await fetch(`${BasicUrl}/setting`, {

    method: 'GET'
  });

  return response.json();

}
