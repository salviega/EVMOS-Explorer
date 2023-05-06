import React, { useEffect, useState } from "react";

import { useAccount, useContract, useProvider } from "wagmi";
import NavBar from "../components/Navbar";
import { useToast } from "@chakra-ui/react";

const private_key: any = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const Explorer = () => {
  return (
    <>
      <NavBar/>
    </>
  );
};

export default Explorer;
