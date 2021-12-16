const m = require("mithril");

var Modal = {
    modal: undefined,
    oninit(vnode) {
        this.modal = vnode.attrs;
    },
    
    view() {
        const modal = this.modal;
        return m("div.modal-dialog", {
                class: (modal.style != undefined ? modal.style : "")
            },
            m("div.modal-content",
                m("div.modal-header",
                    m("h5.modal-title", this.modal.title),
                    m("button.btn-close[type=button][data-bs-dismiss=modal][aria-label=Close]", {
                        onclick: () => {
                            var a = modal.clean == undefined ? "" : modal.clean()
                        }
                    })
                ),
                m("div.modal-body",
                    m(modal)
                ),
                m("div.modal-footer",
                    m("button.btn.btn-secondary[type=button][data-bs-dismiss=modal]", {
                        onclick: () => {
                            var a = modal.clean == undefined ? "" : modal.clean()
                        }
                    }, "Close"),
                    m("button.btn.btn-primary[type=button][data-bs-dismiss=modal]", {
                        onclick: (e) => {
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