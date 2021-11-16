const {
    loadRoutes,
    loadLogin
} = require("./views/loader");


if (window.localStorage['jwt'] == undefined) {
    loadRoutes();
} else {
    loadLogin();
}