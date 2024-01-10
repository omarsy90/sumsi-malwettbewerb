
function implementAllElement(sprache) {
    let elements = document.getElementsByTagName('a');

    looptrans(elements, sprache)
       .then(() => {
            elements = document.getElementsByTagName('h1')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('p')
            looptrans(elements, sprache)
        })
        .then(() => {
            elements = document.getElementsByTagName('b')
            looptrans(elements, sprache)
        })
        

}


window.addEventListener('resize', ()=>{

    console.log(window.innerWidth) ;
  
    if(window.innerWidth >= 800) {
      const navDiv = document.querySelector('.menu-mobile');
      navDiv.style.display = 'none';
    }
  
  
  });