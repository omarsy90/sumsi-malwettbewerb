var createHash = require('hash-generator');

class IMAGE {

    id
    name
    extention
    size
    location  

    static  imgaesArray = [] ;

    constructor(name,extention,size) {

        var hashLength = 10;
        var hash = createHash(hashLength);
        this.id = hash ;

        this.name = name ;
        this.extention = extention ;
        this.size = size ;
        this.location = './uploads/'+this.name ;
       IMAGE.imgaesArray.push(this) ;
        return this ;
    }

      static findImageBeiurl(url){
        
        const image = IMAGE.imgaesArray.find( element => element.location ==url) ;
        return image ;

       }

      static findImageBeiId(id){

        const image = IMAGE.imgaesArray.find(element => element.id == id) ;
        return image ;
       }


}

 //console.log( IMAGE.findImageBeiId(1) ) ;

 module.exports ={
     IMAGE : IMAGE
 }
 