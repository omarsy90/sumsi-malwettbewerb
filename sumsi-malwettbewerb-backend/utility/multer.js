const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '_' + file.originalname)
    }
});

const maxsize = 1 * 1024 * 1024;

 const upload = multer({
    storage: storage,
        fileFilter: (req, file, cd) => {
        const str = file.originalname.split('.');
        const ext = str[str.length - 1]?.toLowerCase();
      
       
        if ( (ext == 'png' || ext == 'jpg' || ext == 'jpeg') ) {
           
           
            cd(null, true);
            return req.body.isImage = true; 
        } else {
           
            cd(null, false);
            return cd(console.log('it is not allowed '))
        }
    },

}) ;

module.exports = upload ;


