var m = require('mithril');


module.exports = {
    view: function(vnode) {
        return m("main", [
                    m("header.navbar.navbar-dark.sticky-top.bg-dark.flex-md-nowrap.p-0.shadow",
                        m("a.navbar-brand.col-md-3.col-lg-2.me-0.px-3", {href: "#"}, "Centrale Météorologique"),
                        m("button.navbar-toggler.position-absolute.d-md-none.collapsed[type=button][data-bs-toggle=collapse][data-bs-target=#sidebarMenu][aria-controls=sidebarMenu][aria-expanded=false][aria-label=Toggle nnavigation]",
                            m("span.navbar-toggler-icon")
                        ),
                        m("div.navbar-nav",
                            m("div.nav-item.text-nowrap",
                                m("a.nav-link.px-3[href='#]", "Sign out")
                            )
                        )
                    ),

                    m("div.container-fluid",
                        m("div.row",
                            m("nav#sidebarMenu.col-md-3.col-lg-2.d-md-block.bg-light.sidebar.collapse",
                                m("div.position-sticky.pt-3",
                                    m("ul.nav.flex-colum",
                                        m("li.nav-item",
                                            m("a.nav-link.active[aria-curent=page][href='#]",
                                                m("span[data-feather=home]"), "Dashboard")
                                                
                                        ),
                                        m("li",[
                                            m(m.route.Link, {href: "/capteurs"},
                                                m("span"), "Capteurs"
                                            )]
                                        ),
                                        m("li",
                                             m(m.route.Link, {href: "/tables"},
                                                m("span"), "Tables"
                                            )
                                            
                                        ),
                                        m("li",
                                            m(m.route.Link, {href: "/mesure"},
                                                m("span"), "Mesures"
                                            )
                                        )
                                    )
                                )
                            ),
                            m("main.col-md-9.ms-sm-auto.col-lg-10.px-md-4", vnode.children)
                        
                        )       
                    )
        ])
    }
}




m("tbody",[
                                              
    m("tr", 
       m("td", t.variable),
       m("td", t.fonction)
   )
]

)