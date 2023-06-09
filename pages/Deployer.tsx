import Navbar from "@/components/Navbar";
import Code from "@/components/SolidityCode";
import React from "react";

const Deployer = () => {
  return (
    <div className="min-h-[100vh] bg-black">
      <Navbar />
      <Code />
    </div>
  );
};

export default Deployer;
