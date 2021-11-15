var m = require("mithril");
// var chart = require('chart.min.js')
var mesure = require("../models/mesure.model");
const {
    list
} = require("../models/table.model");
const {
    tabs
} = require("./tabs");
const form = {
    _isReady: false,
    get isReady() {
        return this._isReady;
    },
    set isReady(value) {
        this._isReady = value;
    },
    _debut: '',
    get debut() {
        return this._debut;
    },
    set debut(value) {
        if (this.fin == "" || value < this.fin)
            this._debut = value;
    },
    _fin: '',
    get fin() {
        return this._fin;
    },
    set fin(value) {
        if (value > this.debut)
            this._fin = value;
    },
    _id_tableau: 0,
    get id_tableau() {
        return this._id_tableau;
    },
    set id_tableau(value) {
        this._id_tableau = value;
    },
    tables: [],
    canSubmit() {
        return this.debut != '' && this.fin != ''
    },
    init() {
        form.tables = list
    },
    oninit() {
        form.init()
    },
    view(vnode) {
        return m("form.mt-5.row",
            m("div.mt-1.form-group.col-md-3", [
                // m('label', 'Tableau'),
                m("select.form-select][placeholder='Nom de la table']", {
                    onchange(e) {
                        form.id_tableau = this.value
                    }
                }, form.tables.map((value) => {
                    return m("option", {
                            value: value.id
                        },
                        value.nom)
                }))
            ]), m("div.form-group.col-md-3", [
                // m('label', 'Debut'),
                m("input.form-control[type='date'][placeholder='Debut']", {
                    value: form.debut,
                    oninput(e) {
                        form.debut = e.target.value
                        console.log(form.debut);
                    }
                })
            ]), m("div.form-group.col-md-3", [
                // m('label', 'Fin'),
                m("input.form-control[type='date'][placeholder='Fin']", {
                    value: form.fin,
                    oninput(e) {
                        form.fin = e.target.value
                        console.log(form.fin);
                    }
                })
            ]), m("button.btn.btn-primary.col-md-3.btn-block[type='button']", {
                disabled: !form.canSubmit(),
                onclick(e) {
                    e.preventDefault()
                    form.isReady = true
                    console.log({
                        Debut: form.debut,
                        Fin: form.fin,
                        table: form.id_tableau
                    })
                }
            }, "Ok")
        )

    }
}
const table = {
    view(vnode) {
        const id = vnode.attrs.id
        const table = mesure.mesure.GetTableList(id)
        if (table.length === 0)
            return m("H1", "La table ne contient aucune valeur")
        return m("table.table", [
            m("thead", m("tr", Object.keys(table[0]).map((value) => {
                return m("th[scope='col']", value)
            }))),
            m("tbody", table.map((value, index) => {
                return m("tr", Object.keys(value).map((key) => {
                    return m('td', value[key])
                }))
            }))
        ])
    }
}

const graph = {
    view(vnode) {
        const table = vnode.attrs.table
        return m('canvas', {
            oncreate(vnode) {
                const plot = mesure.mesure.GetData(table)
                // new Chart(vnode.dom, {
                //     type: 'line',
                //     labels: plot.datas['Ux'],
                //     datasets: [{
                //         label: 'Ux',
                //         data: plot.labels,
                //         fill: false
                //     }]

                // })
                // Object.keys(plot.datas).forEach(capteur => {
                //     new Chart(vnode.dom, {
                //         type: 'line',
                //         labels: plot.datas[capteur],
                //         datasets: [{
                //             label: capteur,
                //             data: plot.labels,
                //             fill: false
                //         }]

                //     })
                // });
            }
        }, m('h1', 'Graph'))
    }
}
module.exports = {
    oninit() {
        tabs.addTab({
            name: "Tableau",
            view() {
                return (form.isReady ? m(table, {
                    table: form.tables[form.id_tableau]
                }) : m("H2", "Rien à affiche"))
            }
        })
        tabs.addTab({
            name: "Graphe",
            view() {
                return (form.isReady ? m(graph, {
                    table: form.tables[form.id_tableau]
                }) : m("H2", "Rien à affiche"))
            }
        })
    },
    view: function(vnode) {
        return [
            m(form),
            m(tabs)
            // (form.isReady ?
            //     m(table
            //         , {
            //         table: form.tables[form.id_tableau]
            //     }) : m("H2", "Rien à affiche"))
        ]
    }
}
// (form.isReady ?