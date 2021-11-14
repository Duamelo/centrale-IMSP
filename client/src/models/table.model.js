var  table = {
    list: [
        {
            "id": 1,
            "nom": "Table A",
            "description": "voici le capteur A",
            "var-fonc-per": [{vare: "uxa", fonc: "avg", per: "3 sec"}, {vare: "uya", fonc: "std", per: "3 sec"} , {vare: "azert", fonc: "ipsum", per: "3 sec"}]
            
        },

        {
            
            "id": 2,
            "nom": "Table B",
            "description": "voici le capteur B",
            "var-fonc-per": [{vare: "uxb", fonc: "avg", per: "3 sec"}, {vare: "uyb", fonc: "std", per: "3 sec"} , {vare: "uzb", fonc: "ipsum", per: "3 sec"}]
        },

        {
            "id": 3,
            "nom": "Table C",
            "description": "voici le capteur C",
            "var-fonc-per": [{vare: "uxa", fonc: "avg", per: "3 sec"}, {vare: "uya", fonc: "std", per: "3 sec"} , {vare: "uze", fonc: "ipsum", per: "3 sec"}, {vare: "uze", fonc: "ipsum", per: "3 sec"}, {vare: "pepe", fonc: "ipsum", per: "3 sec"}]
        },

        {
            "id": 4,
            "nom": "Table D",
            "description": "voici le capteur D",
            "var-fonc-per": [{vare: "uxa", fonc: "avg", per: "3 sec"}, {vare: "uya", fonc: "std", per: "3 sec"} , {vare: "caca", fonc: "ipsum", per: "3 sec"}]
        },

        {

            "id": 5,
            "nom": "Table E",
            "description": "voici le capteur E",
            "var-fonc-per": [{vare: "fghjk", fonc: "avg", per: "3 sec"}, {vare: "UYE", fonc: "std", per: "3 sec"} , {vare: "uze", fonc: "ipsum", per: "3 sec"}, {vare: "uze", fonc: "ipsum", per: "3 sec"}, {vare: "uze", fonc: "ipsum", per: "3 sec"}]
        }

    ]
}



exports.Operation = {
    variableName: "",
    fonction : "",
    periode: 0,


    setVariableName: function (value) {
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

    createOperation: function () {
        var data = this.canSubmit();

    }
}


module.exports = table;