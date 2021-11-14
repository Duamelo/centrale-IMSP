var m = require("mithril");
var capteur = require ("./views/capteur");
var table = require("./views/table");
var layout = require ("./views/layout");
var mesure = require("./views/mesure");


m.route(document.body, "/", {
    "/": {
        render: function() {
            return m(layout)
        }
    },
    "/capteurs": {
        render: function() {
            return m(layout,  m(capteur))
        }
    },
    "/tables": {
        render: function() {
            return m(layout, m(table))
        }
    },
    "/mesures": {
        render: function() {
            return m(layout, m(mesure))
        }
    }
});

