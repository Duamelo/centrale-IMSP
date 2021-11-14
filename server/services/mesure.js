var db = require("../db");


exports.get_all_mesures = async () => {
    return db.query('SELECT * FROM mesures');
}

exports.get_all_output_by_table = async (sortie, start, end) => {
    return db.query("with ids as (select id from sortie where nom_sortie=$1) select * from mesures where id_sortie in (select * from ids) and recordtime > now() -(10 *  INTERVAL '1 month') order by recordtime", [sortie, start, end]);
}



exports.generate_table_with_stat = async (query) => {
    return db.query(query);
}
