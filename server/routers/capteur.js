var  express = require('express');
const router = express.Router();

const csv = require('csv-parser');
const fs = require('fs');
const multer = require('multer');
//const upload = multer({dest: '../uploads/'});


const { get_capteur_with_all_info } = require("../services/capteur");

const FILE_TYPE_MAP = {
    'file/csv': 'csv'
}

const storage = multer.diskStorage({
    destination: function(req, file, cb)  {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {

        const filename = file.originalname.split(' ').join('-');
       // const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${filename}`);
    }
})
const uploadOptions = multer({ storage: storage});




router.get('/', async (req, res) => {

    if( req.user.role.isAdmin)
    {
        const capteur = await get_capteur_with_all_info();
    
        if (!capteur)
            res.status(400).send('this capteur does not exist');
    
    
        console.log(capteur);
        res.status(200).send(capteur);
    }
    else 
        res.status(400).send("you're not authorised");
})


router.post("/capteur", /*uploadOptions.single('capteur_file'), */ async (req, res) => {
    
    if (req.user.role.isAdmin)
    {
        const results = [];
        const capteur_file = require("./capteur.csv");

       /* if(!capteur_file)
           return res.status(400).send('No file in the request');*/
    
        fs.createReadStream(capteur_file)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', ()=> {
              console.log(results);
          });
          res.send("ok");

    }
})

module.exports = router;