var express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

const { get_capteur_with_all_info, create } = require("../services/capteur");
const { insert_sortie_into_capteur } = require("../services/sortie");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '.csv')
    }
  })

const upload = multer({ storage: storage });



router.get('/', async (req, res) => {

    console.log(req.user);
    
    if (req.user.role.isAdmin) {
        const capteur = await get_capteur_with_all_info();

        if (!capteur)
            res.status(400).send('this capteur does not exist');


        console.log(capteur);
        res.status(200).send(capteur);
    }
    else
        res.status(400).send("you're not authorised");
})


router.post("/capteur", upload.single('capteur'),  async (req, res) => {

    if (req.user.role.isAdmin) {
        var capteur;
        var output;
        fs.createReadStream('capteur.csv', 'utf-8')
        .on('data', async (row) =>  {
            
            
            var data = row.split("\n");
            console.log(data);
            
            n_capteur = dateyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsIm5hbWUiOiJkaWFsbyIsInJvbGUiOnsiaXNBZG1pbiI6dHJ1ZSwiaXNVc2VyIjp0cnVlfSwiaWF0IjoxNjQ0NDg1ODg4LCJleHAiOjE2NDQ1NzIyODh9.lY5PX4G1xxoTEZJvLdY2BVeXoZVoOut8Lu-txe5EzgUa[0];
            desc = data[1];
            console.log(n_capteur, desc);

            capteur = await create(n_capteur, desc);

            if(!capteur)
                res.status(500).json({success: false});
            console.log(capteur);

    
            data.map( async (line, index) =>{
                if(index >=2)
                {
                    l = line.split(',');
                    
                    console.log(l);

                    output = await insert_sortie_into_capteur(l[0], l[1], l[2], l[3], l[4]);
                    
                    if(!output)
                        res.status(500).send({success: false});
                    console.log(output);
                }
            })
            res.status(200).json({
               success: true
            })
        })
        .on('end', ()=> {
            console.log('CSV file successfully processed');
        });
    }
    else 
    res.status(400).send("You're not authorized");
})

module.exports = router;