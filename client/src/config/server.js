module.exports = {
    url: "http://10.16.7.150:4000/api/v1"
}


/*
data = {
    layout: {
        title: "Time Series",
        xaxis: {
            autorange: true,
            range: ['2021-09-01', '2021-10-01'],
            rangeselectore: {buttons: [
                {
                    count: 1,
                    label: '1m',
                    step: 'month',
                    stepmode: 'backward'
                  },
                  {
                    count: 6,
                    label: '6m',
                    step: 'month',
                    stepmode: 'backward'
                  },
                  {step: 'all'}
            ]},
            rangeslider: {range: ['2021-09-01', '2021-10-01']},
            type: 'date'
        },
        yaxis: {
            autorange: true,
            type: 'linear'
        }
    },
    time: mesure.mesure.data.time,
    datas: Object.keys(mesure.mesure.data).filter((value) => value != "time").map((variable) => {
        return {
            type: "scatter",
            mode: "lines",
            name: variable,
            y: mesure.mesure.data[variable], //.slice(0, this.size),
            line: {color: '#7F7F7F' }
        };
    })
}

*/