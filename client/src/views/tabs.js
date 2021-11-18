var m = require("mithril");

const tabs = {
    _active: 0,
    tabs: [],
    get active() {
        return this._active;
    },
    set active(value) {
        this._active = value;
    },
    isActive(index) {
        return this.active === index;
    },
    get current() {
        return this.tabs[this.active]
    },
    addTab(tab) {
        this.tabs.push({
            name: tab.name,
            view: tab.view
        });
    },
    clear() {
        this.tabs = []
    },
    view() {
        const tabs = this;
        return [
            m("ul.nav.nav-tabs[id='myTab'][role='tablist']", this.tabs.map((tab, index) => {
                var classes = "nav-link " + (this.isActive(index) ? "active" : "")
                return m("li.nav-item[role='presentation']",
                    m("a[data-toggle='tab'][role='tab'][aria-controls='home'][aria-selected='true']", {
                        class: classes,
                        onclick() {
                            tabs.active = index;
                        }
                    }, tab.name)
                );
            })),
            m(".tab-content",
                m(".tab-pane.fade.show.active[role='tabpanel'][aria-labelledby='home-tab']",
                    tabs.current.view())
            )
        ];
    }
};
exports.tabs = tabs;