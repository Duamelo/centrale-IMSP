var m = require("mithril");
const {
    mountRoutes
} = require("../mounter");

function jsonToForm(json) {
    const formData = new FormData();
    Object.keys(json).forEach(key => formData.append(key, json[key]));
    return formData;
}
credential = {
    error: "",
    errorDisplay() {
        return credential.error != "" ? "" : "none"
    },
    canSubmit() {
        return credential.email != "" && credential.password != ""
    },
    _email: "",
    get email() {
        return this._email;
    },
    set email(value) {
        this._email = value;
    },
    _password: "",
    get password() {
        return this._password;
    },
    set password(value) {
        this._password = value;
    },
    login() {
        mountRoutes()
        m.request({
            method: "POST",
            url: "http://192.168.177.83:2000/api/login",
            body: {
                email: credential.email,
                password: credential.password
            }
        }).then((response) => {
            if (response != undefined) {
                if (response) {
                    window.localStorage.setItem('jwt', JSON.stringify(response.token))
                    window.location.href = "./"
                } else
                    credential.error = "Something went wrong"
            } else
                credential.error = "Cannot acces the server"
        })
    }
}
module.exports = {
    view() {
        document.body.className = "text-center signin"
        return m("main.form-signin",
            m("form",
                [
                    m("h1.h3.mb-3.fw-normal",
                        "Connection"
                    ),
                    m("div.form-floating",
                        [
                            m("input.form-control[type='email'][id='emailInput'][placeholder='name@example.com']", {
                                oninput: function(e) {
                                    credential.email = e.target.value
                                },
                                value: credential.email
                            }),
                            m("label[for='emailInput']",
                                "Email"
                            )
                        ]
                    ),
                    m("div.form-floating",
                        [
                            m("input.form-control[type='password'][id='passwordInput'][placeholder='Password']", {
                                oninput: function(e) {
                                    credential.password = e.target.value
                                },
                                value: credential.password
                            }),
                            m("label[for='passwordInput']",
                                "Password"
                            )
                        ]
                    ),
                    m("div.checkbox.mb-3",
                        m("label",
                            [
                                m("input[type='checkbox'][value='remember-me']"),
                                " Se souvenir de moi "
                            ]
                        )
                    ),
                    m(".alert.alert-danger[role='alert']", {
                        "style": {
                            "display": credential.errorDisplay()
                        }
                    }, credential.error),
                    m("button.w-100.btn.btn-lg.btn-primary[type='submit']", {
                            disabled: !credential.canSubmit(),
                            onclick: credential.login
                        },
                        "Se connecter"
                    ),
                    m("p.mt-5.mb-3.text-muted",
                        [
                            m.trust("&copy;"),
                            " Centrale Météorologique"
                        ]
                    )
                ]
            )
        )
    }
}