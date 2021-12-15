const timelength = {
    _secondes: 0,
    get secondes() {
        return this._secondes
    },
    set secondes(value) {
        if (value < 0)
            return
        else if (value > 59)
            this.minutes = this.minutes + Math.floor(value / 60)
        this._secondes = value % 60
    },
    _minutes: 0,
    get minutes() {
        return this._minutes
    },
    set minutes(value) {
        if (value < 0)
            return
        else if (value > 59)
            this.hours = this.hours + Math.floor(value / 60)
        this._minutes = value % 60
    },
    _hours: 0,
    get hours() {
        return this._hours
    },
    set hours(value) {
        this._hours = value
    },
    get value() {
        return this.secondes + this.minutes * 60 + this.hours * 60 * 60
    },
    view() {
        controler = this
        return m("div.row",
            [
                m("input.col-2[min='0'][type='number']", {
                    value: timelength.hours,
                    onchange(e) {
                        timelength.hours = e.target.value
                    }
                }), m("", "H"),
                m("input.col-2[min='0'][type='number']", {
                    value: timelength.minutes,
                    onchange(e) {
                        timelength.minutes = e.target.value
                    }
                }), m("", "min"),
                m("input.col-2[min='0'][type='number']", {
                    value: timelength.secondes,
                    onchange(e) {
                        timelength.secondes = e.target.value
                    }
                }), m("", "sec"),
                m("div")
            ]
        )
    }
}
module.export = timelength