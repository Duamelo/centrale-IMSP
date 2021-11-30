var m = require("mithril")
const server = require("../config/server")
const table = {
    error: "",
    displayErrror() {
        return this.error != ""
    },
    addTable(table) {
        var newTable = {
            id: this.list.length,
            nom: table.nom,
            description: table.description,
            periode: 0,
            "var-fonc-per": []
        }
        newTable.ajouterVariable = table.AjouterVariable(newTable)
        this.list.push(newTable)
    },
    addVariableToTable(table, variable) {
        table["var-fonc-per"].push({
            vare: variable.nom,
            fonc: variable.fonction
        })
    },
    removeVariableFromTable(table, index) {
        table["var-fonc-per"].splice(index, 1)

    },
    changeVariableFromTable(table, variable) {
        table[variable.nom] = variable.fonction
    },
    changeTablePeriode(table, peride) {

    },
    AjouterAssocier(table, utilisateur) {

    },
    getTables(id) {
        m.request({
            headers: {
                Authorization: "Bearer " + window.localStorage.jwt
            },
            url: server.url + "/tables/:id",
            params: {
                id: id
            }
        }).then((result) => {
            table.list = result
        }, (error) => {
            table.error = error.response.message
        })
        return table.list
    },
    list: []
}

module.exports = table;
