import React, { Component } from "react";
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import axios from 'axios';

const API = "http://localhost:5000/film/raw4";

// Resolves charts dependancy
charts(FusionCharts);

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reporte: [],
    };
  }

  componentDidMount() {
    axios.get(API)
    .then(response => {
      this.setState({ reporte: response.data.datos })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    const datos = {
      chart: {
        caption: "Reporte de Compras",
        subcaption: `Películas más aceptadas por los usuario`,
        showpercentvalues: "1",
        aligncaptionwithcanvas: "0",
        captionpadding: "0",
        decimals: "1",
        plottooltext: "<h1>$percentValue</h1> recaudado por <h1>$label</h1>",
        theme: "fusion",
        baseFont: "Verdana",
        baseFontSize: "15",
        baseFontColor: "#0066cc",
      },
      data: this.state.reporte
    };

    const chartConfigs = {
      type: 'doughnut2d',
      dataSource: datos,
      width: "800",
      height: "600",
    };
    // return (<ReactFusioncharts {...chartConfigs} />);
    return(
      <div>
          <Sidebar />,
          <Header />,
          <div className="ml-64">
            <hr />
            <main className="my-8">
              <ReactFusioncharts {...chartConfigs} />
            </main>
          </div>
      </div>
    )
  }
}