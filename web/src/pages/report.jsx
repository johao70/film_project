import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import axios from "axios";

const API = "http://localhost:5000/film/raw4";

charts(FusionCharts);

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table_header: {
        pelicula: "Película",
        boletos: "Número de Boletos",
        precio: "Valor Unitario",
        total: "Total Recaudado",
      },
      reporte: [],
    };
  }

  componentDidMount() {
    axios
      .get(API)
      .then((response) => {
        this.setState({ reporte: response.data.datos });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { reporte } = this.state;
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
      data: this.state.reporte,
    };

    const chartConfigs = {
      type: "doughnut2d",
      dataSource: datos,
      width: "800",
      height: "600",
    };
    // return (<ReactFusioncharts {...chartConfigs} />);
    return (
      <div className="flex">
        <div className="flex w-1/5 border-r-2 h-screen px-6">
          <Sidebar />
        </div>
        <div className="w-full">
          <div>
            <Header />
          </div>
          <div className="flex flex-col px-12">
            <div className="flex flex-col px-12">
              <p className="mt-5 text-2xl">Reporte de compras</p>
            </div>
            <div className="px-3 py-4 flex flex-col justify-center">
              <table className="w-full text-md bg-white shadow-md rounded mb-4">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-3 px-5">
                      {this.state.table_header.pelicula}
                    </th>
                    <th className="text-left p-3 px-5">
                      {this.state.table_header.precio}
                    </th>
                    <th className="text-left p-3 px-5">
                      {this.state.table_header.boletos}
                    </th>
                    <th className="text-left p-3 px-5">
                      {this.state.table_header.total}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b hover:bg-orange-100 bg-gray-100">
                    <td>
                      {reporte.map((element) => (
                        <p className="p-2 px-5" key={element.id}>
                          {" "}
                          {element.label}{" "}
                        </p>
                      ))}
                    </td>
                    <td>
                      {reporte.map((element) => (
                        <p className="p-2 px-5" key={element.id}>
                          {" "}
                          {element.valorBoleto}{" "}
                        </p>
                      ))}
                    </td>
                    <td>
                      {reporte.map((element) => (
                        <p className="p-2 px-5" key={element.id}>
                          {" "}
                          {element.value}{" "}
                        </p>
                      ))}
                    </td>
                    <td>
                      {reporte.map((element) => (
                        <p className="p-2 px-5" key={element.id}>
                          {" "}
                          {element.recaudado}{" "}
                        </p>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className=" sm:ml-6 sm:mr-6 pb-8 flex flex-wrap">
              <div className="w-full px-4">
                <div className="bg-white border-t border-b sm:rounded sm:border shadow">
                  <div>
                    <div className="text-center px-6">
                      <div className="">
                        <div className=" flex-grow flex-no-shrink ">
                          <ReactFusioncharts {...chartConfigs} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Report);