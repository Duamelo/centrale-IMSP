const m = require("mithril");
const table = require('../models/table.model');
const { Modal } = require("../components/modal");
const server = require('../config/server');
const jwt = require("../config/jwt");
const capteur = require("../models/capteur.model");
import jwt_decode from "jwt-decode";

var nbAccordion = 0;

var fonc = ["avg", "std", "max", "min"];


function AjouterVariable(curentTable) {
    return {
        table: curentTable,
        nom: 0,
        fonction: 0,
        add() {
            m.request({
                headers: {
                    Authorization: "Bearer " + window.localStorage.jwt
                },
                method: "POST",
                url: server.url + "/tables/table/sortie",
                body: {
                    name: this.table.nom,
                    sortie: capteur.variableList[this.nom],
                    fonction: fonc[this.fonction]
                }
            }).then((result) => {
                if (result != undefined) {
                    table.addVariableToTable(this.table, {  
                        nom: capteur.variableList[this.nom],
                        fonction: fonc[this.fonction]});
                }
            }, (error) => {
                if (error.code == 400)
                    credential.error = "something wrong"
            })
        },
        view() {
            return m('.row.col-rows-3', [
                m(".col",
                    m("select.form-select", {
                        onchange: (e) => {
                            this.nom = e.target.value
                        }
                    }, capteur.variableList.map((variable, index) => {
                        return m("option", {
                            value: index
                        }, variable);
                    }))
                ),

                m(".col",
                    m("select.form-select", {
                        onchange: (e) => {
                            this.fonction = e.target.value
                        }
                    }, fonc.map((fn, index) => {
                        return m("option", {
                            value: index
                        }, fn);
                    }))),

                m(".col", m("button.bordure.btn.btn-outline-dark[type=button]", {
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
    periode:0,
    description: "",
    sortie: "",
    fonction: "",
    save() {
        m.request({
            headers: {
                Authorization: "Bearer " + window.localStorage.jwt
            },
            method: "POST",
            url: server.url + "/tables/table/create",
            body: {
                nom: AjouterUneTable.nomTable,
                description: AjouterUneTable.description,
                periode: AjouterUneTable.periode
            }
        }).then((response)=>{
            console.group(response);
            table.addTable({
                nom: AjouterUneTable.nomTable,
                description: AjouterUneTable.description,
                periode: AjouterUneTable.periode,
                AjouterVariable: AjouterVariable
            })
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
            ), m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Periode(en seconde)"),
                m("input[type=number].form-control[placeholder='3600']", {
                    value: AjouterUneTable.periode,
                    oninput: (e) => {
                        AjouterUneTable.periode = e.target.value
                    }
                })
            )
        ]
    }
}


const Associer = {
    title: "Associer a un utilisateur",
    saveButtonTitle: "Ajouter",
    table: 0,
    username:0,
    utilisateurs: [],
    oninit(vnode){
        m.request({
            headers: {
                Authorization: "Bearer " + window.localStorage.jwt
            },
            method:'GET',
            url:server.url +"/users"
        }).then((response)=>{
            Associer.utilisateurs = response.map(user => user.email)
        })
    },
    save() {
        m.request({
            headers: {
                Authorization: "Bearer " + window.localStorage.jwt
            },
            method:'POST',
            url:server.url + '/tables/table/association',
            body:{
                username:this.utilisateurs[this.username],
                table_name:table.list[this.table].nom
            }
        })
    },
    view() {
        return [
            m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Nom de la Table"),
                m("select.form-select", {
                    onchange: (e) => {
                        console.log(e.target.value);
                        Associer.table = e.target.value
                    }
                }, table.list.map((variable, index) => {
                    return m("option", {
                        value: index
                    }, variable.nom);
                }))
            ), m("div.mb-3",
                m("label[for=formControlInput1].form-label", "Utilisateur"),
                m("select.form-select", {
                    onchange: (e) => {
                        console.log(e.target.value);
                        Associer.username = e.target.value
                    }
                }, this.utilisateurs.map((variable, index) => {
                    return m("option", {
                        value: index
                    }, variable);
                }))
            )
        ]
    }
}

var jeton;
var role;
module.exports = {
    oninit() {

        jeton = jwt_decode(window.localStorage['jwt']);
        role = jeton.role.isAdmin ? "admin" : "user";


        table.getTables(jwt.token.userId, (list) => {
            list.forEach(element => {
                element["ajouterVariable"] = AjouterVariable(element)
            });
        })
        capteur.getVariableList()
    },
    view: function (vnode) {
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
                m("h3.marge",[m("button.bordure.btn.btn-outline-dark[type=button][data-bs-target=#modal][data-bs-toggle=modal]", {
                    style: {
                        float: "right"
                    },
                    onclick(e) {
                        modal = document.getElementById("modal")
                        m.mount(modal, {
                            view: function () {
                                return m(Modal, AjouterUneTable)
                            }
                        })
                    }
                }, "+"),m("button.bordure.me-3.btn.btn-outline-dark[type=button][data-bs-target=#modal][data-bs-toggle=modal]", {
                    style: {
                        float: "right"
                    },
                    onclick(e) {
                        modal = document.getElementById("modal")
                        m.mount(modal, {
                            view: function () {
                                return m(Modal, Associer)
                            }
                        })
                    }
                }, "Associer")].map ( (noeud) => {
                    if (role == "admin")
                        return noeud;
                }), "Liste des tables"),
                table.list.map(function (t) {
                    console.log(table);
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
                            m("div.accordion-body.mb-2", [
                                m('.row.g-3', [
                                    m("h6.col-auto", "Description "),
                                    m("p.col-auto", " " + t.description)
                                ]),
                                , m('.row.g-3', [
                                    m('label.form-label.col-auto.mt-3', "Période (seconde): "),
                                    m("input.periode.me-3.col-auto[type=number][min=0]", {
                                        value: t.periode,
                                        onchange: (e) => {
                                            //ecrire la requete pour modifier la periode ici (t.nomm)
                                            t.periode = e.target.value
                                        }
                                    }),
                                    m('.col-auto',m("buton[type='button'].btn.btn-outline-dark", {
                                        onclick: (e) => {
                                            m.request({
                                                headers: {
                                                    Authorization: "Bearer " + window.localStorage.jwt
                                                },
                                                method: "PUT",
                                                url: server.url + "/tables/table/:id/:periode",
                                                params:{
                                                    id:t.nom,
                                                    periode: t.periode
                                                }
                                            }).then((result) => {
                                            }, (error) => {
                                                if (error.code == 400)
                                                    credential.error = "something wrong"
                                            })
                                        }
                                    }, "Metre à jour")
)
                                ]),
                                ,
                                m(".contenu.container-fluid.mt-2", [

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
                                            t["var-fonc-per"].map(function (vf, index) {
                                                return m("tr",
                                                    m("td", m("button.btn-trash.bordure.btn.btn-outline-danger[type=button]", {
                                                        onclick: (e) => {
                                                            m.request({
                                                                headers: {
                                                                    Authorization: "Bearer " + window.localStorage.jwt
                                                                },
                                                                method: "DELETE",
                                                                url: server.url + "/tables/table/:name/:variable/:fonction",
                                                                params: {
                                                                    name:t.nom,
                                                                    variable: vf.vare,
                                                                    fonction: vf.fonc
                                                                }
                                                            }).then((result) => {
                                                            }, (error) => {
                                                                credential.error = "something wrong"
                                                                console.log(error);
                                                            })
                                                
                                                            table.removeVariableFromTable(t, index)
                                                        }
                                                    }, m('img.trash', { 'src': 'assets/img/trash.png' }))),
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