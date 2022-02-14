const m = require('mithril');
var Plotly = require('plotly.js-dist');


const plotly = {
    x:[],
    data: [],
    layout: {},
    canvas: undefined,
    graphPlot: undefined,

    convert(data) {
        return {
            type: data.type,
            mode: data.mode,
            name: data.name,
            y: data.y,
            line: data.line
        }
    },

    oncreate(vnode) {
        plotly.canvas = document.getElementById("mydiv");
        plotly.graphPlot = Plotly.newPlot(this.canvas, this.data, this.layout);
        console.log(this.data);
    },

    oninit(vnode) {
        plotly.x = vnode.attrs.time;
        plotly.layout = vnode.attrs.layout;
        plotly.data = vnode.attrs.datas.map( (data) => plotly.convert(data));
        plotly.data.map( (obj)=> {
            obj.x = plotly.x;
        })
        console.log(plotly.data);
    },
    view(vnode) {
        return m("div[id='mydiv'][width='900'][height='900']")
    }
}

module.exports = plotly;