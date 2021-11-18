var db = require("../db");


exports.create= async (auteur, nom, sortie, fonction, periode) => {
    return db.query('insert into tables (auteur, nom, sortie, fonction, periode) values ($1, $2, $3, $4, $5) returning *', [auteur, nom, sortie, fonction, periode]);
}


exports.get_all_rows = async (auteur) => {
    return db.query("select auteur, nom, periode, ( select  JSONB_AGG (jsonb_build_object  ('vare', sortie, 'fonc' , fonction ))  as \"var-fonc-per\")  from tables where auteur=$1 group by auteur, nom, periode", [auteur]);
}


exports.get_one_table = async(nom) => {
    return db.query("with output as (select sortie, fonction, periode from tables where nom=$1), ids as (select id, nom_sortie from sortie where nom_sortie in (select sortie from output)) select id, nom_sortie, fonction, periode from ids inner join output on ids.nom_sortie=output.sortie", [nom]);
}

