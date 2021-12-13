var db = require("../db");


exports.create= async (auteur, nom, description, sortie, fonction, periode) => {
    return db.query('insert into tables (auteur, nom, description, sortie, fonction, periode) values ($1, $2, $3, $4, $5, $6) returning *', [auteur, nom, description, sortie, fonction, periode]);
}


exports.get_all_rows = async (auteur) => {
    return db.query("select auteur, nom, periode, ( select  JSONB_AGG (jsonb_build_object  ('vare', sortie, 'fonc' , fonction ))  as \"var-fonc-per\")  from tables where auteur=$1 group by auteur, nom, periode", [auteur]);
}





exports.getTableByAuthor = async (auteur) => {
    return db.query("select auteur, nom, periode, ( select  JSONB_AGG (jsonb_build_object  ('vare', sortie, 'fonc' , fonction ))  as \"var-fonc-per\")  from tables where auteur=$1 group by auteur, nom, periode", [auteur]);
}


exports.get_one_table = async(nom) => {
    return db.query("with output as (select sortie, fonction, periode from tables where nom=$1), ids as (select id, nom_sortie from sortie where nom_sortie in (select sortie from output)) select id, nom_sortie, fonction, periode from ids inner join output on ids.nom_sortie=output.sortie", [nom]);
}

exports.get_table_by_name = async(name) => {
    return db.query("select * from tables where nom=$1", [name]);
}

exports.deleteTableByName = async (name, table_id) => {
    return db.query("delete from tables where name=$1 and tableId=$2 returning *", [name, table_id]);
}

exports.update_periode_table = async (table_id, periode) => {
    return db.query("update tables set periode=$1 where id=$2", [table_id, periode]);
}
