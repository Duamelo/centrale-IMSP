
var express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const { createUser, findUserByEmail } = require("../services/user");




router.post('/register', async (req, res) => {
    
    
    const { email, password } = req.body;
    console.log(req.body);

    let userExist = await findUserByEmail(email);
    console.log(userExist);
    if(!userExist) return res.status(400).send('Email is taken');

    console.log('pass');

    let passwordhash = bcrypt.hashSync(password, 10);

    console.log(passwordhash);

    const user = await createUser(email, true, true, passwordhash );
    
    console.log("admin registered " + user);

    if (!user)
        return res.status(400).send('the admin count cannot be created');

    console.log(user);

    res.status(200).send(user);

})

module.exports = router;