var m = require("mithril");
const jwt = require("../config/jwt")
var mesure = require("../models/mesure.model");
const graph = require("../components/chart");
const graphPlotly = require("../components/plotly");

const { list } = require("../models/table.model");
const { tabs } = require("../components/tabs");
const tables = require('../models/table.model')

function randomColor(a) 
{
    return "rgba(" + randomNumber() + "," + randomNumber() + "," + randomNumber() + "," + a + ")"

    function randomNumber() 
    {
        return Math.floor(Math.random() * 255);
    }
}

const form = {
    _isReady: false,
    get isReady() {
        return this._isReady || mesure.mesure.data != undefined;
    },
    set isReady(value) {
        this._isReady = value;
    },
    _debut: '',
    get debut() {
        return this._debut;
    },
    set debut(value) {
        if (this.fin == "" || value <= this.fin)
            this._debut = value;
    },
    _fin: '',
    get fin() {
        return this._fin;
    },
    set fin(value) {
        if (value >= this.debut)
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
    oninit() {
        if (tables.list.length == 0)
            tables.getTables(jwt.token.userId)
    },
    view(vnode) {
        return [
            m("h4.mt-5", "Consultez les mesures de vos tables"),
            m("form.mt-5.mb-5.row",
            m("div.mt-1.form-group.col-md-3", [
                // m('label', 'Tableau'),
                m("select.form-select][placeholder='Nom de la table']", {
                    onchange(e) {
                        form.id_tableau = this.value
                    }
                }, tables.list.map((value, index) => {
                    return m("option", {
                            value: index
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
                    form.isReady = mesure.mesure.loadData(tables.list[form.id_tableau], form.debut, form.fin)
                }
            }, "consulter")
        )
        ]

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

module.exports = {
    oninit() {
        const size = 10
        tabs.addTab({
            name: "Tableau",
            view() {
                return (form.isReady ? m(tableView) :
                    m("img.tableau", {
                        alt: "Rien à affiche",
                        src: "assets/img/tableau.png"
                    }))
            }
        })
        tabs.addTab({
            name: "Graphe",
            view() {
                return (form.isReady ? m(graphView, {
                    max: mesure.mesure.data.time.length
                }) : m("img.graphe", {
                    alt: "Rien à affiche",
                    src: "assets/img/graphe.png"
                }))
            }
        }),
        tabs.addTab({
            name: "Graphe2",
            view() {
                return (form.isReady ? m(plotlyView, {
                    max: mesure.mesure.data.time.length
                }) : m("img.graphe", {
                    alt: "Rien à affiche",
                    src: "assets/img/graphe.png"
                }))
            }
        })
    },
    view: function(vnode) {
        return [
            m(form),
            m(tabs)
        ]
    },
    onremove() {
        tabs.clear()
    }
}
const tableView = {
    view() {
        return m(table, {
            table: tables.list[form.id_tableau]
        })
    }
}
const graphView = {
    types: ["line", "radar"],
    size: 0,
    max: 0,
    oninit(vnode) {
        this.max = vnode.attrs.max
        this.size = this.max = vnode.attrs.max
    },
    view() {
        return [
            m("form.mt-5.row",
                m("div.mt-1.form-group.col-md-3", [
                    m("select.form-select][placeholder='Type de graphe']", {
                        onchange: (e) => {
                            graph.changeChartType(this.types[this.value])
                        }
                    }, this.types.map((value, index) => {
                        return m("option", {
                                value: index
                            },
                            value)
                    }))
                ]), m("div.form-group.col-md-3", [
                    m("input.form-control[type='number'][placeholder='Debut']", {
                        max: this.max,
                        value: this.size,
                        oninput: (e) => {
                            this.size = e.target.value
                        }
                    })
                ])),
            m(graph, {
                type: "line", //this.types[this.type],
                labels: mesure.mesure.data.time, //.slice(0, this.size),
                datas: Object.keys(mesure.mesure.data).filter((value) => value != "time").map((variable) => {
                    return {
                        label: variable,
                        data: mesure.mesure.data[variable], //.slice(0, this.size),
                        fill: true,
                        bgColor: randomColor(0.2),
                        borderColor: randomColor(1)
                    };
                })
            })
        ];
    }
}


const plotlyView = {
    oninit(vnode) {

    },
    view(vnode) {
        return m(graphPlotly, {
            layout: {
                titile: "Time Series",
                xaxis: {
                    autorange: true,
                    range: ['2021-09-01', '2021-10-01'],
                    rangeselectore: {buttons: [
                        {
                            count: 1,
                            label: '1m',
                            step: 'month',
                            stepmode: 'backward'
                          },
                          {
                            count: 6,
                            label: '6m',
                            step: 'month',
                            stepmode: 'backward'
                          },
                          {step: 'all'}
                    ]},
                    rangeslider: {range: ['2021-09-01', '2021-10-01']},
                    type: 'date'
                },
                yaxis: {
                    autorange: true,
                    type: 'linear'
                }
            },
            time: mesure.mesure.data.time,
            datas: Object.keys(mesure.mesure.data).filter((value) => value != "time").map((variable) => {
                return {
                    type: "scatter",
                    mode: "lines",
                    name: variable,
                    y: mesure.mesure.data[variable], //.slice(0, this.size),
                    line: {color: '#7F7F7F' }
                };
            })
        })
    }
}
