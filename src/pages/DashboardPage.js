import React from "react";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/Sidebar";

function DashboardPage() {
  return (
    <div>
      <Header />
      <div>
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}

export default DashboardPage;
