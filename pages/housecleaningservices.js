import React from "react";
import Head from "next/head";
import About from "../components/About";
import brand from "../public/text/brand";

// eslint-disable-next-line react/function-component-definition
export default function ServicesFn() {
  return (
    <>
      <Head>
        <title>
          {brand.architect.name}
          &nbsp; - Services
        </title>
      </Head>
      <main>
        <About />
      </main>
    </>
  );
}
