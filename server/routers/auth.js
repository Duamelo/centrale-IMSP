var express = require ('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();
const { findUserByEmail } = require("../services/user");


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
                name: user[0].email,
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