var m = require("mithril");
const server = require("../config/server");
exports.mesure = {
    GetTableList(id) {
        return this.list
    },
    loadData(table, debut, fin) {
        var data;
        m.request({
            headers: {
                Authorization: "Bearer " + window.localStorage.jwt
            },
            url: server.url + "/mesures/:table/:start/:fin",
            params: {
                table: table.nom,
                start: debut,
                fin: fin
            }
        }).then((result) => {
            data = result
            this.list = result
            this.data = this.GetData(table, data);
            console.log(data);
        }, (error) => {
            console.log("Something went wrong", error)
        })
    },
    data: undefined,
    GetData(table, data) {
        const keys = Object.keys(data[0])
        const result = {}
        keys.forEach(key => {
            result[key] = data.map((value) => value[key])
        });
        return result;
    },
    list: []
}