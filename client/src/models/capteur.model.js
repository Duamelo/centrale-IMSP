var m = require("mithril")
const server = require("../config/server")
var capteur = {
    error: "",
    displayErrror() {
        return this.error != ""
    },
    getCapteurs() {
        m.request({
            headers: {
                Authorization: "Bearer " + window.localStorage.jwt
            },
            url: server.url + "/capteurs",
        }).then((result) => {
            capteur.list = result
        }, (error) => {
            capteur.error = error.response.message
        })
    },
    list: []
};

module.exports = capteur;