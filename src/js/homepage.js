console.log('hallow world!');

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
            navDiv.style.display = 'block'
        }
    })
}
headerAnpassen();

function implementAllElement(sprache) {
    let elements = document.getElementsByTagName('INPUT');
    looptrans(elements, sprache)
        .then(() => {
            elements = document.getElementsByTagName('h1')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('h2')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('h3')
            looptrans(elements, sprache)
        }).then(() => {
            elements = document.getElementsByTagName('h4')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('span')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('a')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('p')
            looptrans(elements, sprache)
        }).then(() => {
            elements = document.getElementsByTagName('strong')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('button')
            looptrans(elements, sprache)
        })
        
}

const bilderSection = document.getElementById('bilder');
console.log(bilderSection);

let countBilder = 6;

function printAllFotos() {

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

            console.log(response.data);
            const arrayData = response.data;
              
            console.log(arrayData) ;
            if (arrayData.length > 0) {

                bilderSection.innerHTML = '';
                for (let i = 0; i < arrayData.length; i++) {

                    if (i < countBilder) {

                        bilderSection.innerHTML = bilderSection.innerHTML + ` <div class="element"> <a href="./bilder.html?sub_id=${arrayData[i].id}"> <div class="bild" id="${arrayData[i].image.id}" ></div> </a> <div class="bilder_element_footer"> <button class="like__btn"> <span id="icon"><i class="far fa-thumbs-up"></i></span> <span id="count">${arrayData[i].like}</span> Like </button> <div class="kind_name">${arrayData[i].child_firstname}</div> </div> </div>  `;

                        bildDiv = document.getElementById(`${arrayData[i].image.id}`);
                        console.log(bildDiv);
                        bildDiv.style.backgroundImage = `url("${arrayData[i].image.location}")`;
                        bildDiv.style.backgroundSize = 'cover';
                        bildDiv.style.backgrounRepeat = 'no-repeat';


                    }

                }


            }



        }).catch(error => {
            //  console.log(error)
        });

}

printAllFotos() ;




const seemoreButton = document.getElementById('see_more');
seemoreButton.addEventListener('click',(event)=>{
 
    countBilder= countBilder+2 ;
    printAllFotos();

})  ;

window.addEventListener('resize', ()=>{

    console.log(window.innerWidth) ;
  
    if(window.innerWidth >= 800) {
      const navDiv = document.querySelector('.menu-mobile');
      navDiv.style.display = 'none';
    }
  
  
  });