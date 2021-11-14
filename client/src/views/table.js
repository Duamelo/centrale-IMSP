const m = require("mithril");
const table = require('../models/table.model');


var nbAccordion = 0;
var count = 0;
var fonc = ["moyenne", "ecart-type", "max", "min"];


var Modal = {
    view : function(vnode){
        return   m("div.modal#idmodal[tabindex=-1]", vnode.attrs.attrs,
                m("div.modal-dialog",
                    m("div.modal-content",
                        m("div.modal-header",
                            m("h5.modal-title", "Ajouter une variable"),
                            m("button.btn-close[type=button][data-bs-dismiss=modal][aria-label=Close]")
                        ),
                        m("div.modal-body",
                            m("div.mb-3",
                                m("label[for=formControlInput1].form-label", "Nom de la variable"),
                                m("input[type=text].form-control#formControlInput1[placeholder=Tsonic]")
                            ),
                            m("div.mb-3",
                                m("label[for=formControlInput2].form-label", "Fonction"),
                                m("select.form-select[aria-label=Default select exemple]", fonc.map((fn) => {
                                    return m("option", {value: count ++} , fn);     
                                })
                                )
                            ),
                            m("div.mb-3",
                            m("label[for=formControlInput1].form-label", "Période"),
                                m("input[type=text].form-control#formControlInput1[placeholder=60 secondes]")
                            )
                        ),
                        m("div.modal-footer",
                            m("button.btn.btn-secondary[type=button][data-bs-dismiss=modal]", "Close"),
                            m("button.btn.btn-primary[type=button]", "Save changes")
                        )
                    )
                )
             )
    }
}

module.exports = {
    view: function(vnode) {                                        

        return m("div.container", { "class": "accordion", "id": "accordionPanelsStayOpenExample" }, [
            m("h3.marge", "Liste des tables"),
         table.list.map(function(t){
             
            nbAccordion++;

                return m("div", { "class": "accordion-item" },
                    [
                        m("h2", { "class": "accordion-header", "id": "panelsStayOpen-heading" + nbAccordion },
                            m("button", { "class": "accordion-button collapsed", "type": "button", "data-bs-toggle": "collapse", "data-bs-target": "#panelsStayOpen-collapse" + nbAccordion, "aria-expanded": "false", "aria-controls": "panelsStayOpen-collapse" + nbAccordion },
                                t.nom
                            )
                        ),
                        m("div", { "class": "accordion-collapse collapse", "id": "panelsStayOpen-collapse" + nbAccordion, "aria-labelledby": "panelsStayOpen-heading" + nbAccordion },
                            m("div", { "class": "accordion-body" },[
                                // insérer un bouton de création d'une ligne de la table et un bouton pour annuler 
                               
                                m("h3",   [ m("button.bordure.btn.btn-outline-dark[type=button][data-bs-target=#idmodal][data-bs-toggle=modal]", {style: {float: "right"}}, "+") ], "Description:"),
                                m(Modal, {
                                    attrs: {
                                        onupdate: function(vnode) {
                                            if(toggle) $(vnode.dom).modal("toggle")
                                        }
                                    }
                                }),
                                m(".contenu",[
                                        m("table.table",
                                            m("thead",
                                                m("tr",
                                                    
                                                    m("th[scope=col", "Variable"),
                                                    m("th[scope=col]", "Fonction"),
                                                    m("th[scope=col]", "Période")
                                                
                                                )
                                            ),
                                            m("tbody",
                                            t["var-fonc-per"].map(function(vf) {
                                                return m("tr",
                                                    m("td", vf.vare),
                                                    m("td", vf.fonc),
                                                    m("td", vf.per)
                                                  
                                                )
                                            })
                                            )
                                        )
                                ]
                                    
                                    
                                )
                               
                            ]
                            )
                        
                        )
                    ]
                    
                );
                
        })
    ]    
        );

    }
}