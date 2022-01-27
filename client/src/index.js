var m = require("mithril");
const login = require("./views/login");
const {
    mountRoutes
} = require("./mounter");

if (window.localStorage['jwt'] != undefined) {
    mountRoutes();
} else {
    m.mount(document.body, login);
}