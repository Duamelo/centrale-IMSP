const m = require('mithril');
var Plotly = require('plotly.js-dist-min');


const plotly = {
    x:[],
    data: [],
    layout: {},
    canva: undefined,
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
        plotly.canva = document.getElementById("canva");
        plotly.graphPlot = Plotly.newPlot(canva, data, layout);
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
        return m("canvas[id='canva'][width='400'][height='400']")
    }
}

module.exports = plotly;