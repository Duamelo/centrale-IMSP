var m = require("mithril");
const server = require("../config/server");
const jwt = require('../config/jwt')
const {
    mountRoutes
} = require("../mounter");


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
            url: server.url + "/users/register",
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
               // m.route.set("/tables");
            }
        }, (error) => {
            if (error.code == 400)
                credential.error = "Erreur d'enregistrement"
        })
    }
}
module.exports = {
    view() {

        return  m("div.row.register", 
                    m("div.col-3"),

                  m("div.col-6.card", 
                    m("div.card-body", [
                        m("form",
                        [
                            m("div.form-group",
                            [
                                m("label[for='exampleInputEmail1']", 
                                "Email"
                                ),
                                m("input.form-control[type='email'][id='exampleInputEmail1'][aria-describedby='emailHelp'][placeholder='name@example.com']", {
                                    oninput: function(e) {
                                        credential.email = e.target.value
                                    },
                                    value: credential.email
                                }),
                                m("small.form-text.text-muted[id='emailHelp'][small='']")
                            ]
                            ),
                            
                            m("div.form-group",
                            [
                                m("label[for='exampleInputEmail1']", 
                                "Mot de passe"
                                ),
                                m("input.form-control[type='password'][id='exampleInputPassword1'][placeholder='Password']",
                                {
                                    oninput: function(e) {
                                        credential.password = e.target.value
                                    },
                                    value: credential.password
                                }
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
                            "Créer"
                        ),
                        m(".alert.alert-success.mt-2[role='alert']", {
                            "style": {
                                "display": credential.responseDisplay()
                            }
                        }, credential.result),
                        ]
                        )
                    ]
                
                     )
                ),
                m("div.col-3")
               
        )

        
            /*
   document.body.className = "text-center signin"
        return m("main.form-signin",
            m("form",
                [
                    m("h1.h3.mb-3.fw-normal",
                        "Enregistrer un nouveau compte utilisateur"
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
                            onclick: credential.login
                        },
                        "Se connecter"
                    )
                ]
            )
        )
            */
        
     
    }
}