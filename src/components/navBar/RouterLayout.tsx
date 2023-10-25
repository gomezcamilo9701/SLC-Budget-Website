import React from "react";
import { Outlet } from "react-router-dom";
import { Root } from "../materialUI-common";
import { NavBar } from "./NavBar";

export const RouterLayout: React.FC = () => {
  return (
    <Root>
      <NavBar />
      <Outlet />
    </Root>
  );
};
