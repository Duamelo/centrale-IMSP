var db = require('../db');



exports.create_association = async (user_id, table_id) => {
    return db.query("insert into user_table (user_id, table_id ) values ($1, $2) returning *", [user_id, table_id]);
}


exports.get_user_table = async (user_id) => {
    return db.query("with table_ids as (select table_id from user_table where user_id=$1) select auteur, nom, periode, ( select  JSONB_AGG (jsonb_build_object  ('vare', sortie, 'fonc' , fonction ))  as \"var-fonc-per\")  from tables where  id in (select * from table_ids) group by auteur, nom, periode", [user_id]);
}

