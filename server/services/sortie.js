var db = require("../db");


exports.get_all_sortie = async () => {
    return db.query('SELECT * FROM sortie');
}

exports.get_sortie_by_name = async (sortie) => {
    return db.query('select * from sortie where nom_sortie=$1', [sortie]);
}

