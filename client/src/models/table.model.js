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
    // list: [{
    //         "id": 1,
    //         "nom": "Table A",
    //         "description": "voici le capteur A",
    //         periode: 3,
    //         "var-fonc-per": [{
    //             vare: "Ux",
    //             fonc: "avg"
    //         }, {
    //             vare: "Uy",
    //             fonc: "std"
    //         }, {
    //             vare: "Uz",
    //             fonc: "ipsum"
    //         }]

    //     },

    //     {

    //         "id": 2,
    //         "nom": "Table B",
    //         "description": "voici le capteur B",
    //         periode: 3,
    //         "var-fonc-per": [{
    //             vare: "uxb",
    //             fonc: "avg"
    //         }, {
    //             vare: "uyb",
    //             fonc: "std"
    //         }, {
    //             vare: "uzb",
    //             fonc: "ipsum"
    //         }]
    //     },

    //     {
    //         "id": 3,
    //         "nom": "Table C",
    //         "description": "voici le capteur C",
    //         periode: 3,
    //         "var-fonc-per": [{
    //             vare: "uxa",
    //             fonc: "avg"
    //         }, {
    //             vare: "uya",
    //             fonc: "std"
    //         }, {
    //             vare: "uze",
    //             fonc: "ipsum"
    //         }, {
    //             vare: "uze",
    //             fonc: "ipsum"
    //         }, {
    //             vare: "pepe",
    //             fonc: "ipsum"
    //         }]
    //     },

    //     {
    //         "id": 4,
    //         "nom": "Table D",
    //         "description": "voici le capteur D",
    //         periode: 3,
    //         "var-fonc-per": [{
    //             vare: "uxa",
    //             fonc: "avg"
    //         }, {
    //             vare: "uya",
    //             fonc: "std"
    //         }, {
    //             vare: "caca",
    //             fonc: "ipsum"
    //         }]
    //     },

    //     {

    //         "id": 5,
    //         "nom": "Table E",
    //         "description": "voici le capteur E",
    //         periode: 3,
    //         "var-fonc-per": [{
    //             vare: "fghjk",
    //             fonc: "avg"
    //         }, {
    //             vare: "UYE",
    //             fonc: "std"
    //         }, {
    //             vare: "uze",
    //             fonc: "ipsum"
    //         }, {
    //             vare: "uze",
    //             fonc: "ipsum"
    //         }, {
    //             vare: "uze",
    //             fonc: "ipsum"
    //         }]
    //     }

    // ]
}



exports.Operation = {
    variableName: "",
    fonction: "",
    periode: 0,


    setVariableName: function(value) {
        Operation.variableName = value;
        console.log(value);
    },

    setFonction: function(value) {
        Operation.fonction = value;
        console.log(value);
    },

    setPeriode: function(value) {
        Operation.periode = value;
        console.log(value);
    },

    canSubmit: function() {
        return Operation.variableName !== "" && Operation.fonction !== "" && Operation.periode !== "";
    },

    createOperation: function() {
        var data = this.canSubmit();

    }
}


module.exports = table;