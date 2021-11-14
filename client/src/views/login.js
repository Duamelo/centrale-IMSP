var m = require("mithril");

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
        return m("div.auth.option2",
            m("div.auth_left",
                m("div.card",
                    m("div.card-body",
                        [
                            m("",
                                m("form",
                                    [
                                        m("h1.h3.mb-3.fw-normal",
                                            "Authentification"
                                        ),
                                        m("div.form-floating",
                                            [
                                                m("input.form-control[type='email'][id='floatingInput'][placeholder='name@example.com']", {
                                                    oninput: function(e) {
                                                        credential.email = e.target.value
                                                    },
                                                    value: credential.email
                                                }),
                                                m("label[for='floatingInput']",
                                                    "email"
                                                )
                                            ]
                                        ),
                                        m("div.form-floating",
                                            [
                                                m("input.form-control[type='password'][id='floatingPassword'][placeholder='Password']", {
                                                    oninput: function(e) {
                                                        credential.password = e.target.value
                                                    },
                                                    value: credential.password
                                                }),
                                                m("label[for='floatingPassword']",
                                                    "mot de passe"
                                                )
                                            ]
                                        ),
                                        m(".alert.alert-danger[role='alert']", {
                                            "style": {
                                                "display": credential.errorDisplay()
                                            }
                                        }, credential.error),
                                        m("input.w-100.btn.btn-lg.btn-primary[type='button'][value='Sign in']", {
                                            disabled: !credential.canSubmit(),
                                            onclick: credential.login
                                        })
                                    ]
                                )
                            )
                        ]
                    )
                )
            )
        )
    }
}