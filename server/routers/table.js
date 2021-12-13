const express = require('express');
const router = express.Router();
const { create, get_all_rows, get_one_table, getTableByAuthor } = require("../services/table");
const { create_association } = require("../services/user_table");
const { findUserById, findUserByEmail } = require("../services/user");
const { deleteTableByName } = require("../services/table");
const { get_user_table } = require("../services/user_table");
const { get_table_by_name } = require("../services/table");
const { update_periode_table } = require("../services/table");



router.get(`/get_tables/:user_id`, async (req, res)=>{

    console.log(req.user);
   
    if (req.user.userId == req.params.user_id) 
    {
        if (req.user.role.isAdmin && req.user.role.isUser) 
        {

            const tables = await getTableByAuthor(req.params.user_id);
    
            if(!tables)
                res.status(500).json({success: false });
    
            console.log(tables);
    
            const user = await findUserById(tables[0].auteur);
    
            if (user)
                tables.map( (row) => {
                    row.auteur = user[0].email;
                })
    
            res.status(200).send(tables);  
    
        }
        else 
        {
            const tables = await get_user_table(req.params.user_id);
    
            if(!tables)
                res.status(500).json({success: false });
        
            const user = await findUserById(tables[0].auteur);
    
            if (user)
                tables.map( (row) => {
                    row.auteur = user[0].email;
                })
    
            res.status(200).send(tables);
        }
    }
    else  
        res.status(400).send("You're not authorised");
})


router.post('/table/create', async (req, res) => {

    if (req.user.role.isAdmin) 
    {
        /*const data = {
            auteur: "admin",
            nom: "meteo",
            sortie: "Ux",
            fonction: "avg",
            periode: "5s"
        };
        */
        const row = await create(req.user.userId, req.body.nom, req.body.description,  req.body.sortie, req.body.fonction, req.body.periode);

        console.log(row);

        if(!row)
            res.status(500).json({success: false});

        res.status(200).send(row);
    }
    else    
        res.status(400).send("You're not authorised");
})


router.post('/table/association/', async (req, res) => {

    if (req.user.role.isAdmin) 
    {
        let result;
        const user = await findUserByEmail(req.body.username);
        const table = await get_table_by_name(req.body.table_name);

        if (user && table)
             result = await create_association(user[0].id, table[0].id );
        else 
            res.status(400).json({success: false});
        console.log(result);
        if (!result)
            res.status(500).json({success: false});
        res.status(200).send(result);
    }
    else
        res.status(400).send("You're not authorised");
})



router.put("/table/:id/:periode", async (req, res) => {

    if (req.user.role.isUser || req.user.role.isAdmin)
    {
        const table_updated = await update_periode_table(req.params.id, req.params.periode);

        if (!table_updated)
            res.status(500).json({success: false});

        res.status(200).send(table);
    }
    else
        res.status(400).send("You're not authorised");
})
/*
router.post("/table/:name", async (req, res) => {
    if ()
})
*/

router.delete("/table/:name", async(req, res) => {

    if (req.user.role.isAdmin)
    {
        const table = await deleteTableByName(req.params.name);

        if(!table)
            res.status(500).json({success: false});

        res.status(200).send("table" + table.nom + " is deleted");
    }
    else
        res.status(400).send("You're not authorised");
})

module.exports = router;
