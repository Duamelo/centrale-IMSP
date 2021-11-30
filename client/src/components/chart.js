const m = require('mithril');
import Chart from 'chart.js';


const chart = {
    type: "",
    labels: [],
    datasets: [],
    canvas: undefined,
    graph: undefined,
    changeChartType(type) {
        this.graph.type = type;
    },
    convert(dataset) {
        return {
            label: dataset.label,
            data: dataset.data,
            fill: dataset.fill,
            backgroundColor: dataset.bgColor,
            borderColor: dataset.borderColor,
        }
    },
    oncreate(vnode) {
        chart.canvas = document.getElementById("canvas")
        chart.graph = new Chart(canvas, {
            type: chart.type,
            data: {
                labels: chart.labels,
                datasets: chart.datasets,
            },
            options: {
                resonsive: true,
                scales: {
                    x: {
                        type: 'timeseries',
                    }
                }
            }
        })
        changeChartType()
    },
    oninit(vnode) {
        chart.type = vnode.attrs.type
        chart.labels = vnode.attrs.labels
        chart.datasets = vnode.attrs.datas.map((data) => chart.convert(data))
    },
    view(vnode) {
        return m("canvas[id='canvas'][width='400'][height='400']")
    }
}
module.exports = chart