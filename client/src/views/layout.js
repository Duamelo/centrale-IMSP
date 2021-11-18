var m = require('mithril');
const jwt = require('../config/jwt')
const {
    getRoutes
} = require('../config/routes');

// var login = require("./login")


function isActive(route) {
    const current = m.route.get()
    return route === current
}

module.exports = {
    view: function(vnode) {
        const email = jwt.token.email
        return [
            m("header.navbar.navbar-dark.sticky-top.bg-dark.flex-md-nowrap.p-0.shadow",
                [
                    m("a.navbar-brand.col-md-3.col-lg-2.me-0.px-3[href='#']",
                        "Centrale Météorologique"
                    ),
                    m("button.navbar-toggler.position-absolute.d-md-none.collapsed[type='button'][data-bs-toggle='collapse'][data-bs-target='#sidebarMenu'][aria-controls='sidebarMenu'][aria-expanded='false'][aria-label='Toggle navigation']",
                        m("span.navbar-toggler-icon")
                    ),
                    m("ul.navbar-nav.px-3",
                        m("li.nav-item.text-nowrap",
                            m("div.dropdown",
                                [
                                    m("a.d-block.link-dark.text-decoration-none.dropdown-toggle[href='#'][id='dropdown'][data-bs-toggle='dropdown'][aria-expanded='false']",
                                        email
                                    ),
                                    m("ul.dropdown-menu.text-small.shadow[aria-labelledby='dropdownUser2']",
                                        [
                                            m("li",
                                                m("a.dropdown-item[href='#']", {
                                                        onclick(e) {
                                                            window.localStorage.removeItem('jwt')
                                                            // m.mount(document.body, login)
                                                            window.location.reload()
                                                        }
                                                    },
                                                    "Se déconnecter"
                                                )
                                            ),
                                            m("li",
                                                m("hr.dropdown-divider")
                                            ),
                                            m("li",
                                                m("a.dropdown-item[href='#']",
                                                    "Paramètre"
                                                )
                                            )
                                        ]
                                    )
                                ]
                            )
                        )
                    )
                ]
            ),
            m("div.container-fluid",
                m("div.row",
                    m("nav.col-md-3.col-lg-2.d-md-block.bg-light.sidebar.collapse[id='sidebarMenu']",
                        m("div.position-sticky.pt-3",
                            [
                                m('H3.nav-item', ""),
                                m("ul.nav.flex-column", getRoutes("admin").map((route) => {
                                        return m("li.nav-item",
                                            m(m.route.Link, {
                                                    class: "nav-link " + (isActive(route.link) ? "active" : ""),
                                                    href: route.link
                                                },
                                                route.title
                                            )
                                        )
                                    })

                                )
                            ]
                        )
                    ),
                    m("main.col-md-9.ms-sm-auto.col-lg-10.px-md-4", vnode.children)
                )
            )
        ]
    }
}