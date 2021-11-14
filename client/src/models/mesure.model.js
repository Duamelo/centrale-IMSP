exports.mesure = {
    GetTableList(id) {
        return this.list
    },
    GetData(table) {
        const values = this.list
        var labels = values.map((record) => {
            return record.recordtime
        })
        var datas = Array.from(table["var-fonc-per"], (variable) => {
            var result = {}
            result[variable.vare] = values.map((values) => values[variable.vare])
            return result
        })
        return {
            labels,
            datas
        }
    },
    list: [{
            "recordtime": "2021-01-14 14:30:00",
            "Ux": 2,
            "Uy": 3,
            "Uz": 1

        },
        {
            "recordtime": "2021-01-14 14:30:00",
            "Ux": 3,
            "Uy": 3,
            "Uz": 1

        }, {
            "recordtime": "2021-01-14 14:30:00",
            "Ux": 7,
            "Uy": 3,
            "Uz": 1

        }
    ]
}