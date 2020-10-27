import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import axios from "axios";

import { API_URL } from "./components/web-service";

charts(FusionCharts);

const Report = () => {
  const [table_header] = useState({
      film: "Película",
      tickets: "Número de Boletos",
      value: "Valor Unitario",
      total: "Total Recaudado por Película",
    }),
    [report, SetReport] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/raw4`)
      .then((response) => {
        SetReport(response.data.datos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      data: report,
    },
    chartConfigs = {
      type: "doughnut2d",
      dataSource: datos,
      width: "100%",
      height: "600",
    };

  return (
    <div className="flex flex-col px-12 w-full">
      <div className="flex flex-col">
        <p className="mt-5 text-2xl">Reporte de compras</p>
      </div>
      <div className="flex flex-col justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead className="border-b">
            <tr>
              <th className="text-left p-3 px-5">{table_header.film}</th>
              <th className="text-left p-3 px-5">{table_header.value}</th>
              <th className="text-left p-3 px-5">{table_header.tickets}</th>
              <th className="text-left p-3 px-5">{table_header.total}</th>
            </tr>
          </thead>

          <tbody>
            {report.map((element) => (
              <tr
                className="border-b hover:bg-orange-100 bg-gray-100"
                key={element.label}
              >
                <td className="p-2 px-5">{element.label}</td>
                <td className="p-2 px-5">{element.valorBoleto}</td>
                <td className="p-2 px-5">{element.value}</td>
                <td className="p-2 px-5">$ {element.recaudado}</td>
              </tr>
            ))}
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
  );
};

export default Report;
