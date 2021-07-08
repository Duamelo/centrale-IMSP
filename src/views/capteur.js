var m = require("mithril")

var capteur = require('../models/capteur.model');
var nbAccordion = 0;

module.exports = {
    view: function(){
        return m("div.container", { "class": "accordion", "id": "accordionPanelsStayOpenExample" }, 
        [
            
            m("h3.marge",  [ m("button.bordure.btn.btn-outline-dark[type=button]", {style: {float: "right"}}, "+"), ], "Liste des capteurs"),
            capteur.list.map(function(t){
                nbAccordion++;
                if(nbAccordion == 1){
                    return m("div", { "class": "accordion-item" },
                        [
                            m("h2", { "class": "accordion-header", "id": "panelsStayOpen-heading" + nbAccordion },
                                m("button", { "class": "accordion-button collapsed", "type": "button", "data-bs-toggle": "collapse", "data-bs-target": "#panelsStayOpen-collapse" + nbAccordion, "aria-expanded": "false", "aria-controls": "panelsStayOpen-collapse" + nbAccordion },
                                    t.nom
                                )
                            ),
                            m("div", { "class": "accordion-collapse collapse", "id": "panelsStayOpen-collapse" + nbAccordion, "aria-labelledby": "panelsStayOpen-heading" + nbAccordion },
                                m("div", { "class": "accordion-body" },
                                    m(".contenu",[
                                            m("h4[class=disc]", "DESCRIPTION "),
                                            m("em", " "+t.description),
                                            m("h4[class=disc]", "Sorties"),
                                            m(".blabla", t.sortie.map(function(vbl) {
                                                return m("div", vbl + " --> "+ t.unite[t.sortie.indexOf(vbl)]);
                                            }))

                                        ]
                                        
                                        
                                    )
                                )
                            
                            )
                        ]
                        
                    );
                }
                else{
                    return m("div", { "class": "accordion-item" },
                        [
                            m("h2", { "class": "accordion-header", "id": "panelsStayOpen-heading" + nbAccordion },
                                m("button", { "class": "accordion-button collapsed", "type": "button", "data-bs-toggle": "collapse", "data-bs-target": "#panelsStayOpen-collapse" + nbAccordion, "aria-expanded": "false", "aria-controls": "panelsStayOpen-collapse" + nbAccordion },
                                    t.nom
                                )
                            ),
                            m("div", { "class": "accordion-collapse collapse", "id": "panelsStayOpen-collapse" + nbAccordion, "aria-labelledby": "panelsStayOpen-heading" + nbAccordion },
                                m("div", { "class": "accordion-body" },
                                    m(".contenu",
                                        [
                                            m("h4[class=disc]", "DESCRIPTION "),
                                            m("em", " " + t.description),
                                            m("h4[class=disc]", "Sorties"),
                                            m(".blabla", t.sortie.map(function (vbl) {
                                                return m("div", vbl + " --> " + t.unite[t.sortie.indexOf(vbl)]);
                                            }))

                                        ]


                                    )
                                )
                            )
                        ]
                    );
                }
                    
                
            })
        ]   
        );


    }

}
