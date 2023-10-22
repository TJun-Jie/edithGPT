// components/Layout.tsx
import React from "react";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./AppBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      <Container style={{ width: "100%", maxWidth: "100%", padding: "0" }}>
        <main>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
