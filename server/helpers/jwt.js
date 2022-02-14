const expressJwt = require('express-jwt');


function authJwt()
{
    const secret = process.env.secret;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked

    }).unless({
        path: [
           // {url:/\/api\/v1\/mesures(.*)/ , methods: ['GET', 'OPTIONS']},
            {url:/\/api\/v1\/auth(.*)/ , methods: ['POST', 'OPTIONS']},
            {url:/\/api\/v1\/auth(.*)/ , methods: ['GET', 'OPTIONS']},
            {url:/\/api\/v1\/users(.*)/ , methods: ['POST', 'OPTIONS']},
            {url:/\/api\/v1\/admin(.*)/ , methods: ['POST', 'OPTIONS']},
            {url:/\/api\/v1\/centrale(.*)/ , methods: ['GET', 'OPTIONS']},
            {url:/\/api\/v1\/users\/register(.*)/ , methods: ['POST', 'OPTIONS']}
        ]
    })
}

async function isRevoked(req, payload, done)
{
    if ( (!payload.role.isUser))
    {
        done(null, true);
    }
    else
    done();
}

module.exports = authJwt;
