var db = require("../db");


exports.get_all_sortie = async () => {
    return db.query('SELECT nom_sortie FROM sortie');
}

exports.get_sortie_by_name = async (sortie) => {
    return db.query('select * from sortie where nom_sortie=$1', [sortie]);
}

exports.insert_sortie_into_capteur = async (sortie, unite, v_min, v_max, n_capteur)=> {
    return db.query("insert into sortie (nom_sortie, unite, valeur_min, valeur_max, nom_capteur) values ($1, $2, $3, $4, $5) returning *", [sortie, unite, v_min, v_max, n_capteur])
}