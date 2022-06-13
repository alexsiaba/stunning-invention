import React, { Fragment } from "react";
import Head from "next/head";
import About from "../components/About";
import brand from "../public/text/brand";

export default function AboutFn() {
  return (
    <>
      <Head>
        <title>
          {brand.architect.name}
          &nbsp; - Contact
        </title>
      </Head>
      <div className={classes.mainWrap}>
        <About />
      </div>
    </>
  );
}
