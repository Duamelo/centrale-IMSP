
var db = require("../db");


exports.create= async (nom, description, auteur, periode) => {
    return db.query('insert into tables (nom, description, auteur, periode) values ($1, $2, $3, $4) returning *', [nom, description, auteur, periode]);
}


exports.insertSortie = async (table_id, sortie, fonction) => {
    return db.query("insert into parametre (id_table, sortie, fonction) values ($1, $2, $3) returning *", [table_id, sortie, fonction]);
}


exports.get_all_rows = async (auteur) => {
    return db.query("select auteur, nom, periode, ( select  JSONB_AGG (jsonb_build_object  ('vare', sortie, 'fonc' , fonction ))  as \"var-fonc-per\")  from tables where auteur=$1 group by auteur, nom, periode", [auteur]);
}


exports.getTableByAuthor = async (auteur) => {
    return db.query(" with newtable as (select auteur, nom, description, periode, sortie, fonction from tables, parametre where tables.id=parametre.id_table) select auteur, nom, description, periode, ( select  JSONB_AGG (jsonb_build_object  ('vare', sortie, 'fonc' , fonction ))  as \"var-fonc-per\")  from newtable where auteur=$1 group by auteur, nom, description, periode", [auteur]);
}


exports.get_one_table = async(table_id) => {
    return db.query("with output as (select sortie, fonction from parametre where id_table=1), ids as (select id, nom_sortie from sortie where nom_sortie in (select sortie from output)) select id, nom_sortie, fonction from ids inner join output on ids.nom_sortie=output.sortie", [table_id]);
}

exports.get_table = async(name) => {
    return db.query(" with newtable as (select nom, periode, sortie, fonction from tables, parametre where tables.id=parametre.id_table) select * from sortie inner join newtable on newtable.sortie=sortie.nom_sortie where newtable.nom=$1", [name]);
}

exports.get_table_by_name = async(name) => {
    return db.query("select * from tables where nom=$1", [name]);
}

exports.deleteTableByName = async (name, table_id) => {
    return db.query("delete from tables where name=$1 and tableId=$2 returning *", [name, table_id]);
}

exports.deleteRowTableByName = async (id_table, variable, fonction) => {
    return db.query("delete from parametre where id_table=$1 and sortie=$2 and fonction=$3", [id_table, variable, fonction])
}
exports.update_periode_table = async (table_id, periode) => {
    return db.query("update tables set periode=$2 where id=$1", [table_id, periode]);
}


exports.tableList = async () => {
    return db.query("select nom from tables");
}
