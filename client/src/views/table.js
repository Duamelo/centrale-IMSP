const m = require("mithril");
const table = require('../models/table.model');
const { Modal } = require("../components/modal");
const timelength = require('../components/timelength')
const jwt = require("../config/jwt")

var nbAccordion = 0;

var fonc = ["avg", "std", "max", "min"];


function AjouterVariable(curentTable) {
    return {
        table: curentTable,
        nom: "",
        fonction: 0,
        add() {
            const variable = {
                id: this.table.id,
                nom: this.nom,
                fonction: fonc[this.fonction]
            }
            table.addVariableToTable(this.table, variable);
        },
        view() {
            return m('tr', [
                m("td"),
                m("td",
                    m("input[type=text].form-control#formControlInput1[placeholder=Tsonic]", {
                        value: this.nom,
                        oninput: (e) => {
                            this.nom = e.target.value;
                        }
                    })
                ),
                m("td",
                    m("select.form-select", {
                        onchange: (e) => {
                            this.fonction = e.target.value
                        }
                    }, fonc.map((fn, index) => {
                        return m("option", {
                            value: index
                        }, fn);
                    }))),
                m("td", m("button.bordure.btn.btn-outline-dark[type=button]", {
                    onclick: (e) => {
                        this.add();
                    }
                }, "+"))
            ])
        }
    }
}


const AjouterUneTable = {
    title: "Ajouter une table",
    saveButtonTitle: "Ajouter",
    nomTable: "",
    description: "",
    save() {
        table.addTable({
            nom: AjouterUneTable.nomTable,
            description: AjouterUneTable.description,
            AjouterVariable: AjouterVariable
        })
    },
    view() {
        return [
            m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Nom de la Table"),
                m("input[type=text].form-control[placeholder=Table]", {
                    value: AjouterUneTable.nomTable,
                    oninput: (e) => {
                        AjouterUneTable.nomTable = e.target.value
                    }
                })
            ), m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Description"),
                m("input[type=text].form-control[placeholder=description]", {
                    value: AjouterUneTable.description,
                    oninput: (e) => {
                        AjouterUneTable.description = e.target.value
                    }
                })
            )
        ]
    }
}


module.exports = {
    oninit() {
        table.getTables(jwt.token.userId)
        console.log(jwt.token.userId);
        table.list.forEach(element => {
            element["ajouterVariable"] = AjouterVariable(element)
        });
    },
    view: function(vnode) {
        var modal;
        return [
            m(".alert.alert-danger.alert-dismissible[role='alert']", {
                    class: table.displayErrror() ? "" : "d-none"
                },
                [
                    table.error,
                    m("button.btn-close[type='button'][data-bs-dismiss='alert'][aria-label='Close']")
                ]),
            Modal.placeholder,
            m("div.container", {
                "class": "accordion",
                "id": "accordionPanelsStayOpenExample"
            }, [
                m("h3.marge", [m("button.bordure.btn.btn-outline-dark[type=button][data-bs-target=#modal][data-bs-toggle=modal]", {
                    style: {
                        float: "right"
                    },
                    onclick(e) {
                        modal = document.getElementById("modal")
                        m.mount(modal, {
                            view: function() {
                                return m(Modal, AjouterUneTable)
                            }
                        })
                    }
                }, "+")], "Liste des tables"),
                table.list.map(function(t) {
                    console.log(table.list);
                    nbAccordion++;
                    return m("div.accordion-item", [
                            m("h5.accordion-header", {
                                    "id": "panelsStayOpen-heading" + nbAccordion
                                },
                                m("button", {
                                        "class": "accordion-button collapsed",
                                        "type": "button",
                                        "data-bs-toggle": "collapse",
                                        "data-bs-target": "#panelsStayOpen-collapse" + nbAccordion,
                                        "aria-expanded": "false",
                                        "aria-controls": "panelsStayOpen-collapse" + nbAccordion
                                    },
                                    t.nom
                                )
                            ),
                            m("div", {
                                    "class": "accordion-collapse collapse",
                                    "id": "panelsStayOpen-collapse" + nbAccordion,
                                    "aria-labelledby": "panelsStayOpen-heading" + nbAccordion
                                },
                                m("div", {
                                    "class": "accordion-body"
                                }, [
                                    // insérer un bouton de création d'une ligne de la table et un bouton pour annuler 

                                    m("p.mr-3", [
                                        m("h6.[class=disc]", "Description "),
                                            m("p", " " + t.description),
                                        "période (seconde): ", m("input.periode.col-2[type=number][min=0]", {
                                            value: t.periode,
                                            onchange: (e) => {
                                                t.periode = e.target.value
                                            }
                                        }),
                                    ]),
                                    m(".contenu.container-fluid", [

                                        m(t.ajouterVariable),
                                            m("table.table",
                                                m("thead",
                                                    m("tr",
                                                        m("th[scope=col"),
                                                        m("th[scope=col", "Variable"),
                                                        m("th[scope=col]", "Fonction"),
                                                        m("th[scope=col")
                                                    )
                                                ),
                                                m("tbody",
                                                    t["var-fonc-per"].map(function(vf, index) {
                                                        return m("tr",
                                                            m("td", m("button.btn-trash.bordure.btn.btn-outline-danger[type=button]", {
                                                                onclick: (e) => {
                                                                    table.removeVariableFromTable(t, index)
                                                                }
                                                            }, m('img.trash', {'src' : 'assets/img/trash.png'}))),
                                                            m("td", vf.vare),
                                                            m("td", vf.fonc),
                                                            m("td")
                                                        )
                                                    })
                                                )
                                            )
                                        ]

                                    )

                                ])

                            )
                        ]

                    );

                })
            ])
        ];

    }
}