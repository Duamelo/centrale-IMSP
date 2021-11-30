var m = require("mithril")
var capteur = require('../models/capteur.model');
const { Modal } = require("../components/modal");

var nbAccordion = 0;

const AjouterUnCapteur = {
    title: "Ajouter Un Capteur",
    saveButtonTitle: "Enregistrer",
    file: undefined,
    // style: "modal-xl",
    clean() {
        this.file = undefined
    },
    save() {
        var body = new FormData()
        body.append("file", file)
        console.log(this.file);
        m.request({
            method: "POST",
            url: "/api/v1/capteur",
            body: body,
        })
    },
    view() {
        return m('form',
            m("div.mb-3",
                m("label.form-label", "Charger un fichier csv"),
                m("input[type=file].form-control[placeholder=Capteur]", {
                    onchange: (e) => {
                        this.file = e.target.files[0]
                    }
                })
            )
        )
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
                            m("h5", {
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
                                            m("h6.[class=disc]", "Description "),
                                            m("p.mb-3", " " + t.description),
                                            
                                            m("table.table.table-bordered",
                                                [
                                                    m("thead",
                                                        m("tr",
                                                            [
                                                                m("th[scope='col']",
                                                                    "sortie"
                                                                ),
                                                                m("th[scope='col']",
                                                                    "unité"
                                                                ),
                                                                m("th[scope='col']",
                                                                    "valeur minimale"
                                                                ),
                                                                m("th[scope='col']",
                                                                    "valeur maximale"
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