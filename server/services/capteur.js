var db = require("../db");


exports.get_all_capteurs = async () => {
    return db.query('SELECT * FROM capteur');
}

exports.get_capteur_by_name = async (capteur) => {
    return db.query('select * from capteur where nom=$1', [capteur]);
}

