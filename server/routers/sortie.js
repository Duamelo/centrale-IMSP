const express = require('express');
const router = express.Router();
const { get_all_sortie, get_sortie_by_name } = require("../services/sortie");


router.get(`/`, async (req, res)=>{
    const sorties = await get_all_sortie();

    if(!sorties)
        res.status(500).json({success: false });

    res.send(sorties);
})

router.get(`/:nom_sortie`, async (req, res)=>{
    const sortie = await get_sortie_by_name(nom_sortie);

    if(!sortie)
        res.status(500).json({success: false });

    console.log(sortie[0].id);
    res.send(sortie[0]);
});

module.exports = router;
