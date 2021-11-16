var m = require('mithril');
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
                            m("a.nav-link[href='#']", {
                                    onclick(e) {
                                        window.localStorage.removeItem('jwt')
                                        // m.mount(document.body, login)
                                        window.location.reload()
                                    }
                                },
                                "Sign out"
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