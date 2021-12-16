
var express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const { createUser, findUserByEmail } = require("../services/user");

const { emailList } = require("../services/user");


router.post('/', async (req, res) => {
    
    
    const { email, isAdmin, isUser, password } = req.body;
    console.log(req.body);

    let userExist = await findUserByEmail(email);
    console.log(userExist);
    if(!userExist) return res.status(400).send('Email is taken');

    console.log('pass');

    let passwordhash = bcrypt.hashSync(password, 10);

    console.log(passwordhash);

    const user = await createUser(email, isAdmin, isUser, passwordhash );
    
    console.log("user created" + user);

    if (!user)
        return res.status(400).send('the user cannot be created');

    console.log(user);

    res.status(200).send(user);

})


router.get("/", async (req, res) => {
    
    if (req.user.role.isAdmin)
    {
        const users = await emailList();

        if (!users)
            res.status(500).json({success: false});
        
            res.status(200).send(users);
    }
    else 
        res.status(400).send("You're not authorized");
})


module.exports = router;