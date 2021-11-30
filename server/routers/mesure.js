const express = require('express');
const router = express.Router();

const { get_all_mesures,
        generate_table_with_stat
} = require("../services/mesure");

const { get_one_table
} = require("../services/table");

/*
router.get(`/`, async (req, res)=>{
    const mesures = await get_all_mesures();

    if(!mesures)
        res.status(500).json({success: false });

    res.send(mesures);
})

*/


router.get('/:table/:start_date/:end_date', async(req, res) => {

//    const { table, start_date, end_date } = req.params;

    console.log(req.params);
    var query;
    
    const data = await get_one_table(req.params.table, req.params.start_date, req.params.end_date);

    console.log(data);
    query = "with new_table as (select recordtime," +
    
    data.map((item)=>{
                console.log(item);
                return "(select valeur from mesures m1 where m1.id_sortie=" + item.id + " and m1.recordtime=m.recordtime limit 1) \
                as id"+item.id
            }).join(",") +
             " from mesures m) select ts_round(recordtime, " + 60 + ") as temps,"  +
    data.map((item)=>{
                 return item.fonction+"(id"+ item.id +") as " + item.fonction+"_"+item.nom_sortie 
             }).join(',') + " from new_table where recordtime between '" + req.params.start_date + "' and '" + req.params.end_date + "' group by temps"
    
    console.log(query);
   
    const results = await generate_table_with_stat(query);

    if(!results)
        res.status(500).json({success: false});

    console.log(results);
    res.status(200).send(results);
});

module.exports = router;

