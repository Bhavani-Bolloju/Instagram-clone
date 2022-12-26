import React from "react";
import Header from "../components/Header/Header";
import Timeline from "../components/Timeline/Timeline";
import Sidebar from "../components/Sidebase/Sidebar";

function DashboardPage() {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-3 gap-8 justify-between mx-auto max-w-screen-lg mt-4">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}

export default DashboardPage;
