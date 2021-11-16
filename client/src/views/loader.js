var m = require("mithril");
import jwt_decode from "jwt-decode";
var capteur = require("./capteur");
var table = require("./table");
var layout = require("./layout");
var mesure = require("./mesure");
const login = require("./login");

function getRoutes(role) {
    var routes = []
    if (role === "admin") {
        routes = [{
            link: "/",
            title: "",
            component: {
                view() {
                    return m('h1', "Bienvenue dans l'interface d'administration")
                }
            }
        }, {
            link: "/capteurs",
            title: "Capteurs",
            component: capteur
        }, {
            link: "/tables",
            title: "Tables",
            component: table
        }, {
            link: "/mesures",
            title: "Mesures",
            component: mesure
        }];
    } else {
        routes = [{
                link: "/",
                title: "",
                component: {
                    view() {
                        return m('h1', "Bienvenue sur le site de la centrale Météorolgique")
                    }
                }
            },
            {
                link: "/mesures",
                title: "Mesures",
                component: mesure
            }
        ];
    }
    return routes;
}

function routesArrayToJson(routes) {
    var result = {}
    routes.forEach(route => {
        result[route.link] = {
            render: function() {
                return m(layout, m(route.component));
            }
        }
    });
    return result;
}



exports.loadLogin = () => {
        document.body.classList = "text-center login";
        m.mount(document.body, {
            view() {
                return m(login);
            }
        });
    },


    exports.loadRoutes = () => {
        console.log("dans la fonction loadRoutes");
        // const jwt = jwt_decode(window.localStorage['jwt'])
        const jwt = {
            payload: {
                role: "user"
            }
        }
        if (jwt) {
            var routes = getRoutes(jwt.payload.role);
            m.route(document.body, "/mesures", routesArrayToJson(routes));
        }
    }
exports.getRoutes = getRoutes