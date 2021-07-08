import * as m from "mithril"
import * as   capteur from "./views/capteur"
import * as table from "./views/table"
import * as layout from "./views/layout"
import * as mesure from "./views/mesure"
//import * as  modal from "./views/modal"


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

