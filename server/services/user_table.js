var db = require('../db');



exports.create_association = (user_id, table_id) => {
    return db.query("insert into user_table (user_id, table_id ) values ($1, $2) returning *", [user_id, table_id]);
}
