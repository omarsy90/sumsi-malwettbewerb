
 // to hide menue-mobile when the screen become bigger
    window.addEventListener('resize', ()=>{
        if(window.innerWidth >= 800) {
          const navDiv = document.querySelector('.menu-mobile');
          navDiv.style.display = 'none';
        }
      });
headerAnpassen();
CustomiseClickOnLinkBehaviour();
AddEventListnerForLanguageChange()




// handle clicking on the links js 

 function CustomiseClickOnLinkBehaviour()
 {
    const links = document.getElementsByTagName("a");
   
    for(let i =0 ; i< links.length ; i++)
    {
         let link = links[i];
         link.addEventListener('click',(event)=>{
          event.preventDefault();
          LoadPageForCorrespondingLanguag(event)
         });
    }

    function LoadPageForCorrespondingLanguag(event)
    {
        const href = event.target.href ;
        const arr = href.split('.')
        const extension = arr[arr.length -1];
       
      
        if(extension.includes('html'))
        {
             if(extension.includes('#') )
             {
               const  subArr  = extension.split('#') ;
               const idItem = subArr[subArr.length -1];
               const div  = document.getElementById(`${idItem}`);
               smoothScrollTo(div , 1000) ;
             }
             else
             {
                // not include #  (extrnal link)
                const lang = getCookie('lang');
                LoadingPageForLanguage(href,lang)
             }
        }
        
        if(extension.includes('pdf'))
        {
             window.location.href = href;
        }
    }
 }
    

 function LoadingPageForLanguage(url , lang)
 {
    if(!lang || lang =='')
    {  
        //default language is german :)
       lang = 'ger'
    }
    const   splitLinkArr = url.split('/');
    splitLinkArr[4] = lang ;
    const newUrl = splitLinkArr.join('/'); 
    window.location.href = newUrl ;  
 }
 
  // open and close navigation menu for moblie screen
function headerAnpassen() {
    const navicon = document.querySelector('.nav_mobile');
  
    navicon?.addEventListener('click', (e) => {
        const navDiv = document.querySelector('.menu-mobile');
        if (navDiv.style.display === 'block') {
          
            navDiv.style.display = 'none'
        } else {
    
            navDiv.style.display = 'block'
        }
    })
}


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


function getCookie(name) {
    let cookieArray = document.cookie.split(';'); 
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim(); 
        if (cookie.startsWith(name + '=')) {     
            return cookie.substring(name.length + 1);
        }
    }
    return ""; 
}

function smoothScrollTo(target, duration) {
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}


function AddEventListnerForLanguageChange()
{
 const collection =document.getElementsByClassName('flagge');
for(let i = 0 ; i < collection.length ; i++)
{   
    const item = collection[i] ;
     item.addEventListener('click',(event)=>{ 
        const currentLang = getCookie('lang')
        const arr = item.className.split(' ');  
        const newLang = arr[arr.length -1];
      console.log(newLang);
       setCookie('lang',newLang);

         if(newLang !=currentLang)
        {
          LoadingPageForLanguage(window.location.href , newLang);
         } 

     });
}

}
