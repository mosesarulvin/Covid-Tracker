import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from "numeral"

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius:0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode :"index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes:[
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },    
            },
        ],
        yAxes:[
            {
                gridLines: {
                    display: false,
                },
                ticks:{
                    callback: function (value, index, values){
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const buildChartData = (data, casesType = "cases") => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases){
        if(lastDataPoint){
            let newDataPoint ={
                x:  date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

function LineGraph({casesType = "cases", ...props}) {
    const [data, setData] = useState({}); 
    const borderColor = {
        cases:"#026fe6",
        recovered : "#269742",
        deaths : "#fe073a",
    };
    
    const backgroundColor = {
        cases:"#026fe626",
        recovered : "#2697422b",
        deaths : "#fe073a29",
    };

    useEffect(()=> {
        const fetchData = async () =>{
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
            .then(response=>response.json())
            .then(data=> {
                let chartData = buildChartData(data , casesType);
                setData(chartData);
            });
        };
        fetchData();
    },[casesType]);

    return (
        <div className={props.className}>
            {data?.length > 0 && ( 
            <Line 
                options = {options}
                data = {{
                    datasets: [
                        {
                            backgroundColor: backgroundColor[casesType],
                            borderColor: borderColor[casesType],
                            data:data, 
                        },
                    ],
                }} 
            />
            )}
        </div>
    )
}

export default LineGraph
