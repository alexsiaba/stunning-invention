import React from "react";
import Head from "next/head";
import About from "../components/About";
import brand from "../public/text/brand";

export default function AboutFn() {
  return (
    <>
      <Head>
        <title>
          {brand.architect.name}
          &nbsp; - About
        </title>
      </Head>
      <main>
        <About />
      </main>
    </>
  );
}
