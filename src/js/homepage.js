
const bilderSection = document.getElementById('bilder');


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

