var db = require("../db");


exports.get_all_capteurs = async () => {
    return db.query('SELECT * FROM capteur');
}

exports.get_capteur_with_info_all_info = async () => {
    return db.query("select nom, description, ( select JSONB_AGG (jsonb_build_object ( 'sortie', nom_sortie, 'unite',unite , 'valeur_min',valeur_min, 'valeur_max', valeur_max)) as variables from sortie where nom_capteur=nom limit 1) from capteur");
}

