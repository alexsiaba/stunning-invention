import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import VideoBanner from "../components/VideoBanner";
import Notification from "../components/Notification";
import brand from "../public/text/brand";
import Services from "../components/Services";

const sectionMargin = (margin) => margin * 20;
const useStyles = makeStyles((theme) => ({
  mainWrap: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    background:
      theme.palette.type === "dark"
        ? theme.palette.background.default
        : theme.palette.background.paper,
  },
  spaceBottom: {
    paddingBottom: sectionMargin(theme.spacing()),
    [theme.breakpoints.down("md")]: {
      paddingBottom: sectionMargin(6),
    },
  },
  spaceBottomShort: {
    paddingBottom: sectionMargin(theme.spacing() / 2),
  },
  spaceTop: {
    paddingTop: sectionMargin(theme.spacing()),
    [theme.breakpoints.down("md")]: {
      paddingTop: sectionMargin(6),
    },
  },
  spaceTopShort: {
    paddingTop: sectionMargin(theme.spacing() / 2),
  },
  containerWrap: {
    "& > section": {
      position: "relative",
    },
  },
}));

const Landing = function (props) {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <>
      <Head>
        <title>
          {brand.architect.name}
          &nbsp; - Home Page
        </title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <main className={classes.containerWrap}>
          <section id="home">
            <VideoBanner />
          </section>
          <section id="services" className={classes.spaceTopShort}>
            <Services />
          </section>
          {/* <section id="project" className={isMobile ? classes.spaceTopShort : classes.spaceTop}> */}
          {/*    <Project/> */}
          {/* </section> */}
          {/* <section id="featured" className={isMobile ? classes.spaceTopShort : classes.spaceTop}> */}
          {/*    <Featured/> */}
          {/* </section> */}
          {/* <section id="about"> */}
          {/*    <div className={isTablet ? classes.spaceTopShort : classes.spaceTop}> */}
          {/*        <About/> */}
          {/*    </div> */}
          {/*    <div className={classes.spaceTopShort}> */}
          {/*        <Team/> */}
          {/*    </div> */}
          {/*    <div> */}
          {/*        <Counter/> */}
          {/*    </div> */}
          {/* </section> */}
          {/* <div id="blog" className={classes.spaceTopShort}> */}
          {/*    <Blog/> */}
          {/* </div> */}
          {/* <section id="subscribe" className={classes.spaceTopShort}> */}
          {/*    <Subscribe/> */}
          {/* </section> */}
          {/* <Footer toggleDir={onToggleDir}/> */}
        </main>
        {/* <Hidden mdDown> */}
        {/*    <PageNav/> */}
        {/* </Hidden> */}
        <Notification />
      </div>
    </>
  );
};

Landing.getInitialProps = async () => ({
  namespacesRequired: ["common", "architect-landing"],
});

Landing.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

export default Landing;
