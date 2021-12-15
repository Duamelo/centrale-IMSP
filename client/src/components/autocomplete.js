const autocomplete = {
    on: false,
    placeholder: "",
    input: "",
    values: [],
    oninit(vnode) {
        autocomplete.values = vnode.attrs.values
        autocomplete.placeholder = (vnode.attrs.placeholder == undefined ? "" : autocomplete.placeholder)
    },
    view() {
        const propositions = (autocomplete.input == "" || !autocomplete.on) ? [] :
            autocomplete.values.filter((value) => value.toLowerCase().includes(autocomplete.input.toLowerCase()))
        return m('.dropdown', [
            m("input[id='myInput'][type='text']", {
                placeholder: autocomplete.placeholder,
                value: autocomplete.input,
                oninput(e) {
                    if (e.target.value != autocomplete.input) {
                        autocomplete.on = true
                        autocomplete.input = e.target.value
                    }
                }
            }), (propositions.length != 0 ?
                m("ul.dropdown-menu.show", propositions.map((value) => {
                    return m("li",
                        m("a.dropdown-item[href='#']", {
                            onclick(e) {
                                autocomplete.input = value
                                autocomplete.on = false
                            }
                        }, value)
                    )
                })) : "")
        ])
    }
}
module.exports = autocomplete