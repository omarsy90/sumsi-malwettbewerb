

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


window.addEventListener('resize', ()=>{

    console.log(window.innerWidth) ;
  
    if(window.innerWidth >= 800) {
      const navDiv = document.querySelector('.menu-mobile');
      navDiv.style.display = 'none';
    }
  
  
  });