var m = require("mithril")
const server = require("../config/server")
var capteur = {
    error: "",
    variableList:[],
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
    getVariableList(){
        m.request({
            headers: {
                Authorization: "Bearer " + window.localStorage.jwt
            },
            url: server.url + "/sorties"
        }).then((result) => {
            capteur.variableList = result.map(value => value.nom_sortie)
        })
    },
    list: []
};

module.exports = capteur;