async function translate(txtToTrans) {

    const response = await fetch(url = 'http://localhost:3000/translate', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.

        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: JSON.stringify(txtToTrans) // body data type must match "Content-Type" header
    });

    return response.json();
}





const enButtons = document.getElementsByClassName('en');
const deButtons = document.getElementsByClassName('de');


for (enbutton of enButtons) {

    enbutton.addEventListener('click', (e) => {
        implementAllElement('en');
    })

}

for (debutton of deButtons) {
    debutton.addEventListener('click', (e) => {
        implementAllElement('de');
    })
}









//console.log(elements[21].textContent);


async function looptrans(elements, sprache) {

    for (const element of elements) {

        let status = element.getAttribute('class');

        if (status !== 'flagge de' && status !== 'flagge en' && status !== 'ignore') {


            if (element.tagName == 'INPUT') {

                
                let txtToTrans = {
                    txt: element.placeholder,
                    sprache: sprache
                };
                translate(txtToTrans).then(res => {
                    if(res.txt != 0){
                        element.placeholder = res.txt;
                    }
                    
                    //  console.log(res.txt)
                }).catch(err => console.log(err));

            } else {

                let txtToTrans = {
                    txt: element.textContent,
                    sprache: sprache
                };
                translate(txtToTrans).then(res => {
                    if(res.txt != 0){
                        element.textContent = res.txt;
                    }
                   
                    //  console.log(res.txt)
                }).catch(err => console.log(err));

            }



        }


    }

}