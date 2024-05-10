
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
            const arrayData = response.data;
            if (arrayData.length > 0) {

                bilderSection.innerHTML = '';
                for (let i = 0; i < arrayData.length; i++) {
                  
             

                   

                       bilderSection.innerHTML = bilderSection.innerHTML + `
                         <div class="element"> 
                         <a href="./bilder.html?sub_id=${arrayData[i].SubmissionID}"> <div class="bild" id =\"${arrayData[i].SubmissionID}\"  ></div> 
                         </a> 
                         <div class="bilder_element_footer">
                          <button class="like__btn" data-submissionID="${arrayData[i].SubmissionID}"  onclick="LikeBtnClicked(event)"> <span id="icon"><i class="far fa-thumbs-up"></i></span> 
                          <span id="count">${arrayData[i].LikeCount}</span> Like </button>
                           <div class="kind_name">${arrayData[i].ChildName}</div> 
                           </div> </div>  `;

                        bildDiv = document.getElementById(`${arrayData[i].SubmissionID}`);
                        bildDiv.style.backgroundImage = `url("/uploads/${arrayData[i].ImgName}")`;
                        bildDiv.style.backgroundSize = 'cover';
                        bildDiv.style.backgrounRepeat = 'no-repeat';
                        


                    

                }


            }



        }).catch(error => {
              console.log(error)
        });

}

printAllFotos() ; 
function LikeBtnClicked(event)
{
   console.log(event.target.getAttribute('data-submissionID'))
}






