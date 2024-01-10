function implementAllElement(sprache) {
    let elements = document.getElementsByTagName('INPUT');

    looptrans(elements, sprache)
        .then(() => {
            elements = document.getElementsByTagName('strong')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('p')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('label')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('span')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('button')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('a')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('h4')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('b')
            looptrans(elements, sprache)
        })


}
   const errroParagraf = document.getElementById("error") ;
   const successParagraf =document.getElementById('success') ;
const form = document.getElementById('form');
const submitButton = document.getElementById("submite");
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
   
    const formData = new FormData(form);
    console.log(formData);
    console.log(formData.get('vorname'));
    submite('http://localhost:3000/upload', formData)
        .then(res => {

            console.log(res) ;

            if (res?.ok === true) {
                // bild ist angemeldet mit submission
               // successParagraf.style.display='block' ;

            } else {
                // there is an error with felds
               const  strArray = Object.values(res.errors)
               console.log(strArray)
               let htmltxt= " ";
               
               for(const element of strArray){
                     
                htmltxt=htmltxt+ `<h3> ${element} </h3>`
                
               }

               errroParagraf.innerHTML=htmltxt ;
               errroParagraf.style.display = 'block';
               



            }
        })
        .catch(err => console.log(err));


});


async function submite(url, data) {

    // console.log(data);
    const response = await fetch(url, {
        method: 'post', // *GET, POST, PUT, DELETE, etc.



        body: data // body data type must match "Content-Type" header
    });

    return response.json()

}



