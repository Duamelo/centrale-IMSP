const express = require('express');
const router = express.Router();
const { create, get_all_rows, get_one_table, getTableByAuthor, insertSortie} = require("../services/table");
const { create_association } = require("../services/user_table");
const { findUserById, findUserByEmail } = require("../services/user");
const { deleteTableByName, deleteRowTableByName } = require("../services/table");
const { get_user_table } = require("../services/user_table");
const { get_table_by_name, tableList } = require("../services/table");
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
});


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
        const table = await create(req.body.nom, req.body.description, req.user.userId, req.body.periode);

        console.log(table);

        if(!table)
            res.status(500).json({success: false});

        const row = await insertSortie(table[0].id, req.body.sortie, req.body.fonction);

        if(row)
        res.status(200).send(table);
    }
    else    
        res.status(401).send("You're not authorised");
});


router.post("/table/sortie", async (req, res) => {
    
    if (req.user.role.isAdmin)
    {
        const table = await get_table_by_name(req.body.name);
        let sortie;

        if (table)
        {
            console.log(table);
            sortie = await insertSortie( table[0].id, req.body.sortie, req.body.fonction);   
        }
            
        if (!sortie)
            res.status(500).json({success: false});

        console.log(sortie);
        res.status(200).send(sortie);
    }
    else 
        res.status(400).send("You're note authorised");
});


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
});



router.put("/table/:name/:periode", async (req, res) => {

    if (req.user.role.isUser || req.user.role.isAdmin)
    {
        var table_updated;
        console.log(req.params.periode);
        const table = await get_table_by_name(req.params.name);
        console.log(table);
        if (table)
             table_updated = await update_periode_table(table[0].id, req.params.periode);

        if (!table_updated)
            res.status(500).json({success: false});

        res.status(200).send(table);
    }
    else
        res.status(401).send("You're not authorised");
});


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
});


router.delete("/table/:name/:variable/:fonction", async(req, res) => {

    if (req.user.role.isAdmin)
    {
        var result;
        const table = await get_table_by_name(req.params.name);
        if(table)
         result = await deleteRowTableByName(table[0].id, req.params.variable, req.params.fonction);

        if(!table)
            res.status(500).json({success: false});

        res.status(200).send("row deleted");
    }
    else
        res.status(400).send("You're not authorised");
});


router.get("/", async (req, res) => {

    if (req.user.role.isAdmin)
    {
        const tables = await tableList();

        if (!tables)
            res.status(500).json({success: false});
        
        res.status(200).send(tables);
    }
    else
        res.status(400).send("You're not authorized");
});


module.exports = router;
