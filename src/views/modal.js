var m = require('mithril');



module.exports = {

        view: function(vnode){
            return ("div.modal.idmodal[tabindex=-1]",
                m("div.modal-dialog",
                    m("div.modal-content",
                        m("div.modal-header",
                            m("h5.modal-title", "Modal title"),
                            m("button.btn-close[type=button][data-bs-dismiss=modal][aria-label=Close]")
                        ),
                        m("div.modal-body",
                            m("p", "Modal body text goes here")
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