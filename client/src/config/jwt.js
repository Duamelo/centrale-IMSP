import jwt_decode from 'jwt-decode';

module.exports = {
    get token() {
        if (window.localStorage.jwt != undefined)
            return jwt_decode(window.localStorage.jwt, {
                payload: true
            })
        return undefined;
    },
    set token(value) {
        window.localStorage.setItem('jwt', value);
    },
}