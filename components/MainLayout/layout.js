import React from "react";
// eslint-disable-next-line sort-imports
import Header from "../Header";
// eslint-disable-next-line sort-imports
import Footer from "../Footer";
import HeaderLinks from "../Header/HeaderLinks";

// eslint-disable-next-line react/prop-types,react/function-component-definition
export default function Layout({ children }, props) {
  const { ...rest } = props;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <Header
        brand="BRAND"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
