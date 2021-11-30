const express = require('express');
const router = express.Router();
const { create, get_all_rows } = require("../services/table");
const { create_association } = require("../services/user_table");
const { findUserById } = require("../services/user");
const { updateTablePeriode } = require("../services/table");

router.get(`/:idAuteur`, async (req, res)=>{


    if (req.user.role.isAdmin) 
    {
        const tables = await get_all_rows(req.params.idAuteur);

        if(!tables)
            res.status(500).json({success: false });
    
        const user = await findUserById(tables[0].auteur);

        if (user)
            tables.map( (row) => {
                row.auteur = user[0].email;
            })

        res.send(tables);

    }
    else  
        res.status(400).send("You're not authorised");

    })



router.post('/new_fonction', async (req, res) => {


    if (req.user.role.isAdmin) 
    {

        const data = {
            auteur: "admin",
            nom: "meteo",
            sortie: "Ux",
            fonction: "avg",
            periode: "5s"
        };
        
        const row = await create(req.user.userId, req.body.nom, req.body.description,  req.body.sortie, req.body.fonction, req.body.periode);

        console.log(row);

        const result = await create_association(req.user.userId, row[0].id );
        
        console.log(result);

        if(!row)
            res.status(500).json({success: false});

        const user = await findUserById(row[0].auteur);
        if (user)

            row[0].auteur = user[0].email;     

        console.log(row)
        res.send(row);
    }
    else    
        res.status(400).send("You're not authorised")

})


router.post('/update_periode', async (req, res) => {


    const result = await updateTablePeriode(req.body.table, req.body.periode);

    if (!result)
        res.status(500).send({success: false});

        console.log(result);
    res.status(200).send(result);
})


module.exports = router;
