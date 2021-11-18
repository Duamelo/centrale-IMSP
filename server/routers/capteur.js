var  express = require('express');
const router = express.Router();

const { get_capteur_with_info_all_info } = require("../services/capteur");


router.get('/', async (req, res) => {

    if( req.user.role.isAdmin)
    {
        console.log(req.user);
        const capteur = await get_capteur_with_info_all_info();
    
        if (!capteur)
            res.status(400).send('this capteur does not exist');
    
    
        console.log(capteur);
        res.status(200).send(capteur);
    }
    else 
        res.status(400).send("you're not authorised")
})


module.exports = router;

