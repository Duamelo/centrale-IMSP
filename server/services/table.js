var db = require("../db");


exports.create= async (auteur, nom, sortie, fonction, periode) => {
    return db.query('insert into tables (auteur, nom, sortie, fonction, periode) values ($1, $2, $3, $4, $5) returning *', [auteur, nom, sortie, fonction, periode]);
}


exports.get_all_rows = async () => {
    return db.query('select * from tables order by periode');
}


exports.get_one_table = async(nom) => {
    return db.query("with output as (select sortie, fonction, periode from tables where nom=$1), ids as (select id, nom_sortie from sortie where nom_sortie in (select sortie from output)) select id, nom_sortie, fonction, periode from ids inner join output on ids.nom_sortie=output.sortie", [nom]);
}

