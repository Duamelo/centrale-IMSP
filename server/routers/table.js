const express = require('express');
const router = express.Router();
const { create, get_all_rows } = require("../services/table");



router.get(`/`, async (req, res)=>{
    const tables = await get_all_rows();

    if(!tables)
        res.status(500).json({success: false });

    res.send(tables);
})



router.post('/new_fonction', async (req, res) => {

    const data = {
        nom: "meteo",
        sortie: "Ux",
        fonction: "avg",
        periode: "5s"
    };
    
    const row = await create(req.body.nom, req.body.sortie, req.body.fonction, req.body.periode);

    if(!row)
        res.status(500).json({success: false});

    res.send(row);
})


module.exports = router;
