import React, { useEffect, useState } from "react";
import App from "next/app";
import Head from "next/head";
import PropTypes from "prop-types";
import {
  createTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import { create } from "jss";
import { PageTransition } from "next-page-transitions";
import rtl from "jss-rtl";
import CssBaseline from "@material-ui/core/CssBaseline";
import LoadingBar from "react-top-loading-bar";
import { appWithTranslation, i18n } from "../i18n";
import appTheme from "../theme/appTheme";

/* import css vendors */
import "../vendors/hamburger-menu.css";
import "animate.css/animate.css";
import "../vendors/top-loading-bar.css";
import "../vendors/animate-extends.css";
import "../vendors/page-transition.css";
import "../vendors/slick/slick.css";
import "../vendors/slick/slick-theme.css";
import Layout from "../components/MainLayout/layout";

let themeType = "light";
if (typeof Storage !== "undefined") { // eslint-disable-line
  themeType = localStorage.getItem("luxiTheme") || "light";
}

const MyApp = function (props) {
  const [loading, setLoading] = useState(0);
  const [theme, setTheme] = useState({
    ...appTheme("greenLeaf", themeType),
    direction: i18n.language === "ara" ? "rtl" : "ltr",
  });

  useEffect(() => {
    // Set layout direction
    document.dir = i18n.language === "ara" ? "rtl" : "ltr";

    // Remove preloader
    const preloader = document.getElementById("preloader");
    if (preloader !== null || undefined) {
      setTimeout(() => {
        preloader.remove();
      }, 1500);
    }

    // Remove loading bar
    setLoading(0);
    setTimeout(() => {
      setLoading(100);
    }, 2000);

    // Refresh JSS in SSR
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const toggleDarkTheme = () => {
    const newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    localStorage.setItem(
      "luxiTheme",
      theme.palette.type === "light" ? "dark" : "light"
    );
    setTheme({
      ...appTheme("greenLeaf", newPaletteType),
      direction: theme.direction,
    });
  };

  const toggleDirection = (dir) => {
    document.dir = dir;
    setTheme({
      ...theme,
      direction: dir,
      palette: {
        ...theme.palette,
      },
    });
  };

  const muiTheme = createTheme(theme);
  const { Component, pageProps, router } = props; // eslint-disable-line
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
  return (
    <div>
      <Head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          name="viewport"
        />
      </Head>

      <StylesProvider jss={jss}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />

          <LoadingBar
            className="top-loading-bar"
            color={theme.palette.primary.light}
            height={0}
            progress={loading}
          />

          <div id="main-wrap">
            <PageTransition classNames="page-fade-transition" timeout={300}>
              <Layout>
                <Component
                  {...pageProps}
                  key={router.route}
                  onToggleDark={toggleDarkTheme}
                  onToggleDir={toggleDirection}
                />
              </Layout>
            </PageTransition>
          </div>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
