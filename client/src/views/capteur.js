var m = require("mithril")
var capteur = require('../models/capteur.model');
const {
    Modal
} = require("../components/modal");
var nbAccordion = 0;
const AjouterUneVariable = {
    _unite: "",
    get unite() {
        return this._unite;
    },
    set unite(value) {
        this._unite = value;
    },
    _sortie: "",
    get sortie() {
        return this._sortie;
    },
    set sortie(value) {
        this._sortie = value;
    },
    _valeur_min: 0,
    get valeur_min() {
        return this._valeur_min;
    },
    set valeur_min(value) {
        this._valeur_min = value;
    },
    _valeur_max: 0,
    get valeur_max() {
        return this._valeur_max;
    },
    set valeur_max(value) {
        this._valeur_max = value;
    },
    get variable() {
        return {
            unite: this.unite,
            sortie: this.sortie,
            valeur_min: this.valeur_min,
            valeur_max: this.valeur_max
        }
    },
    reset() {
        this.unite = ""
        this.sortie = ""
        this.valeur_min = 0
        this.valeur_max = 0
    },
    canSubmit() {
        return this.unite != "" && this.sortie != "" && this.valeur_min <= this.valeur_max
    },
    view() {
        return m('form', [
            m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Unite"),
                m("input[type=text].form-control#formControlInput1[placeholder=Capteur]", {
                    value: AjouterUneVariable.unite,
                    oninput(e) {
                        AjouterUneVariable.unite = e.target.value
                    }
                })
            ),
            m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Sortie"),
                m("input[type=text].form-control#formControlInput1[placeholder=Capteur]", {
                    value: AjouterUneVariable.sortie,
                    oninput(e) {
                        AjouterUneVariable.sortie = e.target.value
                    }
                })
            ),
            m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Valeur Min"),
                m("input[type=text].form-control#formControlInput1[placeholder=Capteur]", {
                    value: AjouterUneVariable.valeur_min,
                    oninput(e) {
                        AjouterUneVariable.valeur_min = e.target.value
                    }
                })
            ),
            m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Valeur Max"),
                m("input[type=text].form-control#formControlInput1[placeholder=Capteur]", {
                    value: AjouterUneVariable.valeur_max,
                    oninput(e) {
                        AjouterUneVariable.valeur_max = e.target.value
                    }
                })
            )
        ])
    }
}
const AjouterUnCapteur = {
    title: "Ajouter Un Capteur",
    saveButtonTitle: "Enregistrer",
    // style: "modal-xl",
    _nom: "",
    get nom() {
        return this._nom;
    },
    set nom(value) {
        this._nom = value;
    },
    _description: "",
    get description() {
        return this._description;
    },
    set description(value) {
        this._description = value;
    },
    _variables: [],
    get variables() {
        return this._variables;
    },
    set variables(value) {
        this._variables.push(value);
    },
    clean() {
        this.nom = ""
        this.description = ""
        this._variables = []
        AjouterUneVariable.reset()
    },
    save() {
        //L'action a mener avec le formulaire
    },
    view() {
        return m(".container", m(".row", [
            m(".col-4", m('form',
                m("div.mb-3",
                    m("label[for=formControlInput1].form-label", "Nom"),
                    m("input[type=text].form-control#formControlInput1[placeholder=Capteur]", {
                        value: AjouterUnCapteur.nom,
                        oninput(e) {
                            AjouterUnCapteur.nom = e.target.value
                        }
                    })
                ), m("div.mb-3",
                    m("label[for=formControlInput1].form-label", "Description"),
                    m("input[type=text].form-control#formControlInput1[placeholder=Tsonic]", {
                        value: AjouterUnCapteur.nom,
                        oninput(e) {
                            AjouterUnCapteur.nom = e.target.value
                        }
                    })
                ), m("h3",
                    [
                        " Sorties ",
                        m("button.btn-primary.bordure[type='submit'][data-bs-toggle='modal']", {
                                onclick() {
                                    AjouterUnCapteur.variables = AjouterUneVariable.variable
                                },
                                style: {
                                    "float": "right",
                                    disabled: !AjouterUneVariable.canSubmit()
                                }
                            },
                            "+"
                        )
                    ]), m(AjouterUneVariable))),
            m(".col-8", m("table.table.table-responsive.table-bordered.col-5",
                [
                    m("thead",
                        m("tr", [
                            m("th[scope='col']", "Sorties"),
                            m("th[scope='col']", "Unité")
                        ])
                    ),
                    m("tbody", this.variables.map(function(variable) {
                        return m("tr",
                            [
                                m("th[scope='col']",
                                    variable.sortie
                                ),
                                m("td[scope='col']",
                                    variable.unite
                                )
                            ]
                        )
                    }))
                ]))
        ]))
    }
}
module.exports = {
    oninit() {
        capteur.getCapteurs()
    },
    view: function() {
        return m("div.container", {
                "class": "accordion",
                "id": "accordionPanelsStayOpenExample"
            },
            [m(".alert.alert-danger.alert-dismissible[role='alert']", {
                        class: capteur.displayErrror() ? "" : "d-none"
                    },
                    [
                        capteur.error,
                        m("button.btn-close[type='button'][data-bs-dismiss='alert'][aria-label='Close']")
                    ]),
                Modal.placeholder,
                m("h3.marge", [m("button.bordure.btn.btn-outline-dark[type=button][data-bs-target=#modal][data-bs-toggle=modal]", {
                    style: {
                        float: "right"
                    },
                    onclick() {
                        modal = document.getElementById("modal")
                        m.mount(modal, {
                            view: function() {
                                return m(Modal, AjouterUnCapteur)
                            }
                        })
                    }
                }, "+"), ], "Liste des capteurs"),
                capteur.list.map(function(t) {
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
                                        },
                                        m(".contenu",
                                            [
                                                m("h4.[class=disc]", "Description "),
                                                m("em", " " + t.description),
                                                m("h4[class=disc]", "Sorties"),
                                                m("table.table.table-bordered",
                                                    [
                                                        m("thead",
                                                            m("tr",
                                                                [
                                                                    m("th[scope='col']",
                                                                        "#"
                                                                    ),
                                                                    m("th[scope='col']",
                                                                        "Unité"
                                                                    ),
                                                                    m("th[scope='col']",
                                                                        "Valeur Minimale"
                                                                    ),
                                                                    m("th[scope='col']",
                                                                        "valeur Maximale"
                                                                    )
                                                                ]
                                                            )
                                                        ),
                                                        m("tbody", t.variables.map(function(variable) {
                                                            return m("tr",
                                                                [
                                                                    m("th[scope='col']",
                                                                        variable.sortie
                                                                    ),
                                                                    m("td[scope='col']",
                                                                        variable.unite
                                                                    ),
                                                                    m("td[scope='col']",
                                                                        variable.valeur_min
                                                                    ),
                                                                    m("td[scope='col']",
                                                                        variable.valeur_max
                                                                    )
                                                                ]
                                                            )
                                                        }))
                                                    ]
                                                )
                                            ]
                                        )
                                    )
                                )
                            ]
                        );
                   // }


                })
            ]
        );


    }

}