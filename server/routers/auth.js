var express = require ('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();
const { createUser, findUserByEmail } = require("../services/user");


router.post('/', async (req, res) => {
    

    const { email, isAdmin, isUser, password } = req.body;
    console.log(email + isAdmin + isUser + password);

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


router.post('/login', async (req, res)=> {

    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        
        console.log(user);
    
        if (!user)
         return res.status(400).send("User not found");

         let verify = bcrypt.compareSync(password, user[0].passwordhash);
         
         console.log(verify);

        if (user &&  bcrypt.compareSync(password, user[0].passwordhash))
        {
            const secret = process.env.secret;
            const token = jwt.sign({
                userId: user[0].id,
                role : {
                    isAdmin: user[0].isadmin,
                    isUser: user[0].isuser
                }
            },
            secret,
            {expiresIn: '1d'}
            )

            user[0].passwordhash = undefined;

            res.status(200).json({
                token: token,
                user: user
            });
        }
    }catch (err) {
        console.log('LOGIN ERROR', err);
        res.status(400).send("Signin failed");
    }
})


module.exports = router;