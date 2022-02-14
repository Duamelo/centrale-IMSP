var m = require("mithril");
const server = require("../config/server");


const credential = {
    error: "",
    errorDisplay() {
        return credential.error != "" ? "" : "none"
    },
    result: "",
    responseDisplay() {
        return credential.result != "" ? "" : "none"
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
    register(e) {
        e.preventDefault()
        m.request({
            method: "POST",
            url: server.url + "/admin/register",
            body: {
                email: credential.email,
                password: credential.password
            }
        }).then((response) => {
            if (response != undefined) {
                console.log(response);
                //jwt.token = response.token;
                credential.result = "success";
                credential.email = credential.password = "";
            }
        }, (error) => {
            if (error.code == 400)
                credential.error = "Erreur d'enregistrement'"
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
                        "Registration"
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
                    m(".alert.alert-danger[role='alert']", {
                        "style": {
                            "display": credential.errorDisplay()
                        }
                    }, credential.error),
                    m("button.w-100.btn.btn-lg.btn-primary[type='submit']", {
                            disabled: !credential.canSubmit(),
                            onclick: credential.register
                        },
                        "S'enregistrer"
                    ),
                    m(".alert.alert-success.mt-2[role='alert']", {
                        "style": {
                            "display": credential.responseDisplay()
                        }
                    }, credential.result),
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