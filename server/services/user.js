var db = require("../db");


exports.createUser = (email, isAdmin, isUser, password)=> {
    return db.query('insert into "user" (email, isAdmin, isUser, passwordhash) values ($1, $2, $3, $4) returning *', [email, isAdmin, isUser, password])
}

exports.findUserByEmail = (email)=> {
    return db.query('select * from "user" where email=$1', [email]);   
}


exports.findUserById = (id) => {
    return db.query('select * from "user" where id=$1', [id]);
}
