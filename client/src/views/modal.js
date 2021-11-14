const m = require("mithril");

var Modal = {
    modal: undefined,
    oninit(vnode) {
        this.modal = vnode.attrs;
        /*{
            title:"Le titre",
            saveButtonTitle:"Enregistrer",
            save(){
                //L'action a mener avec le formulaire
            },
            view(){
                return m('form','Le formulaire')
            }
        } */
    },
    view() {
        const modal = this.modal;
        return m("div.modal-dialog",
            m("div.modal-content",
                m("div.modal-header",
                    m("h5.modal-title", this.modal.title),
                    m("button.btn-close[type=button][data-bs-dismiss=modal][aria-label=Close]")
                ),
                m("div.modal-body",
                    m(modal)
                ),
                m("div.modal-footer",
                    m("button.btn.btn-secondary[type=button][data-bs-dismiss=modal]", "Close"),
                    m("button.btn.btn-primary[type=button]", {
                        onclick(e) {
                            modal.save();
                        }
                    }, modal.saveButtonTitle)
                )
            )
        );
    },
    placeholder: m("div.modal#modal[tabindex=-1]",
        m("div.modal-dialog",
            m("div.modal-content",
                m("div.modal-header",
                    m("h5.modal-title", ""), //"Ajouter une variable"),
                    m("button.btn-close[type=button][data-bs-dismiss=modal][aria-label=Close]")
                ),
                m("div.modal-body", ""),
                m("div.modal-footer",
                    m("button.btn.btn-secondary[type=button][data-bs-dismiss=modal]", "Close"),
                    m("button.btn.btn-primary[type=button]", "")
                )
            )
        ))
};
exports.Modal = Modal;