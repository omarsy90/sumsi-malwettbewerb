import { BasicUrl } from "/global.js";
// to get sub_id from url 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const subId = urlParams.get('sub_id')






// initat htmlelemnt  that will show info of submission
const bildDiv = document.getElementById("bild");
const nameLabel = document.getElementById('name');
const emailLabel = document.getElementById('email');
const kindsnameLable = document.getElementById('kindsname');
const alterLabel = document.getElementById('alter');
const countLable = document.getElementById('count');

console.log(bildDiv);








getInfoSubmission().then(res => {
  console.log(res)
  if (res.status_code == 200) {
    bildDiv.style.backgroundImage = `url("${res.data.image.location }")`;
    // bildDiv.style.backgroundSize = "cover";
    // bildDiv.style.backgroundRepeat = 'no-repeat' ;
    nameLabel.textContent = res.data.legalguardian_firstname + ' ' + res.data.legalguardian_lastname;
    emailLabel.textContent = res.data.email;
    kindsnameLable.textContent = res.data.child_firstname;
    alterLabel.textContent = res.data.child_age;
    countLable.textContent = res.data.like;


  }

});


async function getInfoSubmission() {

  const response = await fetch(`${BasicUrl}/submission/${subId}`);

  return response.json()
}


const votingButton = document.getElementById("voting");
console.log('voting button : ', votingButton);
votingButton.addEventListener('click', (event) => {
  event.preventDefault();
  //console.log('hi omar');
  
  let emailtovote = document.getElementById("emailinput").value ;
  console.log('gmail :',emailtovote) ;
  let data = {email : emailtovote};

  vote(subId,data).then(res => {
    console,
    console.log((res));
    if (res.ok === false) {

      // ther is an error
      if (res.errors.status_code == 103) {
        // The submissionid given is not found
        Swal.fire({
          icon: 'error',
          title: res.ok,
          text: res.errors.email

        })

      } else if (res.errors.status_code == 102) {
        // the submissoinId is not requested

        Swal.fire({
          icon: 'error',
          title: res.ok,
          text: res.errors.submission

        })

      } else if (res.errors.status_code == 101) {

        // the emial is not requested 
        Swal.fire({
          icon: 'error',
          title: res.ok,
          text: res.errors.email

        })

      } else if (res.errors.status_code == 100) {
        // voting is not more activ 
        Swal.fire({
          icon: 'error',
          title: res.ok,
          text: res.errors.message

        })

      } else if (res.errors.status_code == 500) {
        // user try to vote more than 5 times
        Swal.fire({
          icon: 'error',
          title: res.ok,
          text: res.errors.message

        })


      }

      else if(res.errors.status_code ==501){
          // user try to vote second the same submission
        Swal.fire({
          icon: 'error',
          title: res.ok,
          text: res.errors.message

        })

      }


    } else {
      // voting is right 

      Swal.fire({
        icon: 'success',
        title: res.ok,
        text: 'your vote has been sendet'

      })  ;
      
      // to refresh the count of like the hase been sendet
      getInfoSubmission().then(res=>{
        countLable.textContent = res.data.like;

      })

    }

  })

})



async function vote(id,data) {

  const response = await fetch(`${BasicUrl}/submission/${id}/voting`, {
    method: 'POST',
    body: JSON.stringify( data) ,
    headers:{
      'Content-Type':'application/json'
    }

  });
  return response.json();
}



window.addEventListener('resize', ()=>{

  console.log(window.innerWidth) ;

  if(window.innerWidth >= 800) {
    const navDiv = document.querySelector('.menu-mobile');
    navDiv.style.display = 'none';
  }


});