const expressJwt = require('express-jwt');



function authJwt()
{
    const secret = process.env.secret;
    const api = process.env.API_URL;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked

    }).unless({
        path: [
            {url:/\/api\/v1\/mesures(.*)/ , methods: ['GET', 'OPTIONS']},
            {url:/\/api\/v1\/auth(.*)/ , methods: ['POST', 'OPTIONS']},
            {url:/\/api\/v1\/auth(.*)/ , methods: ['GET', 'OPTIONS']}
            
        ]
    })
}

async function isRevoked(req, payload, done)
{
    if (!payload.role.isAdmin)
    {
        done(null, true);
    }
    done();
}

module.exports = authJwt;