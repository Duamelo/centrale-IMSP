import * as m from "mithril"


module.exports = {
    view: function(vnode) {
        return m("main.container", [
                m("section", vnode.children ,"Ici le composant mesure")
        ])
    }
}