

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
