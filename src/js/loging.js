

function headerAnpassen() {
  const navicon = document.querySelector('.nav_mobile');
  console.log(navicon);
  navicon.addEventListener('click', (e) => {
    const navDiv = document.querySelector('.menu-mobile');
    console.log(navDiv);
    if (navDiv.style.display === 'block') {
      console.log('block')
      navDiv.style.display = 'none'

    } else {
      console.log('none')
      navDiv.style.display = 'block';
      navDiv.style.zIndex = "1";

    }
  })
}
headerAnpassen();


const sendButton = document.getElementById('submite');

sendButton.addEventListener('click', (event) => {

  // console.log('clicked');
  let data = {};
  data.email = document.getElementById('email').value;
  data.password = document.getElementById('password').value;

  console.log(data)




  getAutho(data).then(res => {

    

    if (res.token) {
      // access is successed
      getSetting().then(res => {

        //get info of wettbewerb 
        console.log(res.data);
        const abgabeFeld = document.getElementById('abgabe');
        const bewertungFeld = document.getElementById('bewertung');
        let abgabeStatus = 'geschlossen';
        let votStatus = 'geschlossen';
        if (res.data.submission_open === true) {
          abgabeStatus = 'offen'
        }
        if (res.data.voting_open === true) {
          votStatus = 'offen'
        }

        abgabeFeld.textContent = abgabeStatus;
        bewertungFeld.textContent = votStatus;

        document.getElementsByClassName('notify')[0].style.display = 'block'
        document.getElementsByClassName('error_notify')[0].style.display = 'none';

      });

    } else {
      // access is not successed
      console.log('username or password is not right');

      document.getElementsByClassName('error_notify')[0].style.display = 'block';
      document.getElementsByClassName('notify')[0].style.display = 'none'
    }
  })
})



async function getAutho(data) {

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }

  })
  return response.json();

}


async function getSetting() {

  const response = await fetch('http://localhost:3000/setting', {

    method: 'GET'
  });

  return response.json();

}



/// translate code 
function implementAllElement(sprache) {
  let elements = document.getElementsByTagName('a');

  looptrans(elements, sprache)
    .then(() => {
      elements = document.getElementsByTagName('INPUT')
      looptrans(elements, sprache)
    })
    .then(() => {
      elements = document.getElementsByTagName('p')
      looptrans(elements, sprache)
    })
    .then(() => {

      console.log('englisch sprache ')
        var table = document.getElementById("table"); // This have to be the ID of your table, not the tag
        var td_1 = table.getElementsByTagName("tr")[0].getElementsByTagName("td")[0];
        var td_2 = table.getElementsByTagName("tr")[1].getElementsByTagName("td")[0] ;
      if (sprache == "en") {
        
        td_1.textContent = "situation of submission :";
        td_2.textContent = "situation of voting :";

      }
      else{

        // detsch sprache 

       
        td_1.textContent = "Abgabensituation :";
        td_2.textContent = "Bewertungssitaution :";
      }



    })



}
  

// to hide menue-mobile when the screen become bigger
window.addEventListener('resize', ()=>{
  if(window.innerWidth >= 800) {
    const navDiv = document.querySelector('.menu-mobile');
    navDiv.style.display = 'none';
  }


});