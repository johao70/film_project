import React from "react";
import { useHistory } from "react-router-dom";

const Sidebar = () => {
  const router = useHistory();

  return (
    <div className="xl:border-r-2 lg:border-r-2 border-b-2">
      <nav className="flex xl:flex-col lg:flex-col flex-row flex-wrap xl:justify-start lg:justify-start justify-center xl:w-1/5 lg:w-1/5 w-full px-6">
        <div className="text-gray-700 whitespace-no-wrap uppercase p-4">
          <h1 className="font-bold text-2xl tracking-tight">Film Project</h1>
        </div>
        <div className="flex xl:flex-col lg:flex-col flex-row">
          <div className="flex xl:flex-col lg:flex-col flex-row flex-wrap py-4">
            <p className="text-gray-900 text-md uppercase py-3 font-bold xl:flex lg:flex hidden">
              <i className="fas fa-film mr-2 text-md"></i>
              Movies
            </p>
            <button
              className="mx-6 text-gray-600 hover:text-gray-900"
              onClick={() => {
                router.push("/billboard/add-movie");
              }}
            >
              <i className="fas fa-plus mr-2"></i>
              Add Movie
            </button>
            <button
              className="mx-6 text-gray-600 hover:text-gray-900"
              onClick={() => {
                router.push("/billboard");
              }}
            >
              <i className="fas fa-ticket-alt mr-2"></i>
              Catalogue
            </button>
            <button
              className="mx-6 text-gray-600 hover:text-gray-900"
              onClick={() => {
                router.push("report");
              }}
            >
              <i className="fas fa-newspaper mr-2"></i>
              Purchasing Report
            </button>
          </div>

          <div className="py-4 flex xl:flex-col lg:flex-col flex-row flex-wrap">
            <p className="text-gray-900 text-md uppercase py-3 font-bold xl:flex lg:flex hidden">
              <i className="fas fa-check mr-2 text-md"></i>
              Create and Assign
            </p>
            <button
              className="mx-6 text-gray-600 hover:text-gray-900"
              onClick={() => {
                router.push("rooms");
              }}
            >
              <i className="fas fa-person-booth mr-2"></i>
              Add Rooms
            </button>
            <button
              className="mx-6 text-gray-600 hover:text-gray-900"
              onClick={() => {
                router.push("schedules");
              }}
            >
              <i className="fas fa-calendar-plus mr-2"></i>
              Add Schedules
            </button>
            <button
              className="mx-6 text-gray-600 hover:text-gray-900"
              onClick={() => {
                router.push("films_room");
              }}
            >
              <i className="fas fa-map-signs mr-2"></i>
              Assign Movies
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
