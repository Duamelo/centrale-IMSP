const m = require("mithril");
const table = require('../models/table.model');
const {
    Modal
} = require("./modal");

const jwt = require("../config/jwt")
var nbAccordion = 0;
var fonc = ["moyenne", "ecart-type", "max", "min"];


const AjouterVariable = {
    table: null,
    title: "",
    saveButtonTitle: "Ajouter",
    save() {
        const variable = {
            id: this.table.id,
            nom: this.nom,
            fonction: fonc[this.fonction]
        }
        table.addVariableToTable(this.table, variable)
    },
    _nom: "",
    get nom() {
        return this._nom;
    },
    set nom(value) {
        this._nom = value;
    },
    _fonction: 0,
    get fonction() {
        return this._fonction;
    },
    set fonction(value) {
        this._fonction = value;
    },
    init(table) {
        if (table) {
            this.table = table
            this.title = "Ajouter une variable à " + table.nom
            this.nom = ""
            this.fonction = 0
        }
    },
    view() {
        return [m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Nom de la variable"),
                m("input[type=text].form-control#formControlInput1[placeholder=Tsonic]", {
                    value: AjouterVariable.nom,
                    oninput(e) {
                        AjouterVariable.nom = e.target.value
                    }
                })
            ),
            m("div.mb-3",
                m("label[for=formControlInput2].form-label", "Fonction"),
                m("select.form-select[aria-label=Default select exemple]", {
                    onchange(e) {
                        AjouterVariable.fonction = this.value
                    }
                }, fonc.map((fn, index) => {
                    return m("option", {
                        value: index
                    }, fn);
                }))
            )
        ]
    }

}

const AjouterUneTable = {
    title: "Ajouter une table",
    saveButtonTitle: "Ajouter",
    _nomTable: "",
    get nomTable() {
        return this._nomTable;
    },
    set nomTable(value) {
        this._nomTable = value;
    },
    _nomVariable: "",
    get nomVariable() {
        return this._nomVariable;
    },
    set nomVariable(value) {
        this._nomVariable = value;
    },
    _fonction: 0,
    get fonction() {
        return this._fonction;
    },
    set fonction(value) {
        this._fonction = value;
    },
    _periode: 0,
    get periode() {
        return this._periode;
    },
    set periode(value) {
        this._periode = value;
    },
    _description: "",
    get description() {
        return this._description;
    },
    set description(value) {
        this._description = value;
    },
    save() {
        table.addTable({
            table: this.nomTable,
            variable: this.nomVariable,
            fonction: fonc[this.fonction],
            description: this.description,
            periode: this.periode
        })
    },
    view() {
        return [
            m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Nom de la Table"),
                m("input[type=text].form-control[placeholder=Table]", {
                    value: AjouterUneTable.nomTable,
                    oninput(e) {
                        AjouterUneTable.nomTable = e.target.value
                    }
                })
            ), m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Description"),
                m("input[type=text].form-control[placeholder=description]", {
                    value: AjouterUneTable.description,
                    oninput(e) {
                        AjouterUneTable.description = e.target.value
                    }
                })
            ), m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Nom de la variable"),
                m("input[type=text].form-control#formControlInput1[placeholder=Tsonic]", {
                    value: AjouterUneTable.nomVariable,
                    oninput(e) {
                        AjouterUneTable.nomVariable = e.target.value
                    }
                })
            ),
            m("div.mb-3",
                m("label[for=formControlInput2].form-label", "Fonction"),
                m("select.form-select[aria-label=Default select exemple]", {
                    onchange(e) {
                        AjouterUneTable.fonction = this.value
                    }
                }, fonc.map((fn, index) => {
                    return m("option", {
                        value: index
                    }, fn);
                }))
            ),
            m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Période"),
                m("input[type=number].form-control#formControlInput1[placeholder=60 secondes]", {
                    value: AjouterUneTable.periode,
                    oninput(e) {
                        AjouterUneTable.periode = e.target.value
                    }
                })
            )
        ]
    }
}
module.exports = {
    oninit() {
        table.getTables(jwt.token.userId)
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

                    nbAccordion++;

                    return m("div", {
                            "class": "accordion-item"
                        },
                        [
                            m("h2", {
                                    "class": "accordion-header",
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

                                    m("h3", [m("button.bordure.btn.btn-outline-dark[type=button][data-bs-target=#modal][data-bs-toggle=modal]", {
                                        style: {
                                            float: "right"
                                        },
                                        onclick(e) {
                                            modal = document.getElementById("modal")
                                            AjouterVariable.init(t)
                                            m.mount(modal, {
                                                view: function() {
                                                    return m(Modal, AjouterVariable)
                                                }
                                            })
                                        }
                                    }, "+")], [t.description, m('br'), "Période: " + t.periode + " sec"]),
                                    m(".contenu", [
                                            m("table.table",
                                                m("thead",
                                                    m("tr",
                                                        m("th[scope=col", "Variable"),
                                                        m("th[scope=col]", "Fonction")
                                                    )
                                                ),
                                                m("tbody",
                                                    t["var-fonc-per"].map(function(vf) {
                                                        return m("tr",
                                                            m("td", vf.vare),
                                                            m("td", vf.fonc)
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