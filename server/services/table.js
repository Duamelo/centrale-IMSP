var db = require("../db");


exports.create= async (auteur, nom, description, sortie, fonction, periode) => {
    return db.query('insert into tables (auteur, nom, description, sortie, fonction, periode) values ($1, $2, $3, $4, $5, $6) returning *', [auteur, nom, description, sortie, fonction, periode]);
}


exports.get_all_rows = async (auteur) => {
    return db.query("select auteur, nom, description, periode, ( select  JSONB_AGG (jsonb_build_object  ('vare', sortie, 'fonc' , fonction ))  as \"var-fonc-per\")  from tables where auteur=$1 group by auteur, nom, description, periode", [auteur]);
}


exports.get_one_table = async(nom) => {
    return db.query("with output as (select sortie, fonction, periode from tables where nom=$1), ids as (select id, nom_sortie from sortie where nom_sortie in (select sortie from output)) select id, nom_sortie, fonction, periode from ids inner join output on ids.nom_sortie=output.sortie", [nom]);
}

exports.updateTablePeriode = async (table, periode) => {
    return db.query(" with ids as (select id from tables where nom=$1) update tables set periode=$2 where id in (select * from ids) returning *", [table, periode])
}