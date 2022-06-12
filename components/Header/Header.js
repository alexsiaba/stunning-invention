// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import AppBar from "@material-ui/core/AppBar";
// import Grid from "@material-ui/core/Grid";
// import clsx from "clsx";
// import Button from "@material-ui/core/Button";
// import Link from "next/link";
// import IconButton from "@material-ui/core/IconButton";
// import Container from "@material-ui/core/Container";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { useTheme } from "@material-ui/core/styles";
// import AnchorLink from "react-anchor-link-smooth-scroll";
// import Scrollspy from "react-scrollspy";
// import {
//   ClickAwayListener,
//   Grow,
//   MenuItem,
//   MenuList,
//   Popper,
// } from "@material-ui/core";
// import Paper from "@material-ui/core/Paper";
// import MobileMenu from "./MobileMenu";
// import useStyles from "./header-style";
// import navMenu from "./menu";
// import { withTranslation } from "../../i18n";
// import routeLink from "../../public/text/link";
// import logo from "../../public/images/architect-logo.svg";
// import brand from "../../public/text/brand";
//
// const counter = 0;
//
// /*
//  * function createData(name, url, offset) {
//  *   counter += 1;
//  *   return {
//  *     id: counter,
//  *     name,
//  *     url,
//  *     offset,
//  *   };
//  * }
//  */
//
// const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
//   return <AnchorLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
// });
//
// const Header = function (props) {
//   const [fixed, setFixed] = useState(false);
//   let flagFixed = false;
//   const handleScroll = () => {
//     const doc = document.documentElement;
//     const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
//     const newFlagFixed = scroll > 100;
//     if (flagFixed !== newFlagFixed) {
//       setFixed(newFlagFixed);
//       flagFixed = newFlagFixed;
//     }
//   };
//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//   }, []);
//   const classes = useStyles();
//   const theme = useTheme();
//   const { onToggleDark, onToggleDir, invert, t } = props;
//
//   const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
//   const isTablet = useMediaQuery(theme.breakpoints.down("md"));
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [menuList] = useState(
//     /*
//      * createData(navMenu[0].name, `#${navMenu[0]}`),
//      * createData(navMenu[1].name, `#${navMenu[1]}`),
//      * createData(navMenu[2], `#${navMenu[2]}`),
//      * createData(navMenu[3], `#${navMenu[3]}`),
//      * createData(navMenu[4], `#${navMenu[4]}`),
//      */
//     navMenu
//   );
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//
//   function handleClick(event) {
//     if (anchorEl !== event.currentTarget) {
//       setAnchorEl(event.currentTarget);
//     }
//   }
//
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleOpenDrawer = () => {
//     setOpenDrawer(!openDrawer);
//   };
//   return (
//     <>
//       {isMobile ? (
//         <MobileMenu open={openDrawer} toggleDrawer={handleOpenDrawer} />
//       ) : null}
//
//       <AppBar
//         className={clsx(
//           classes.header,
//           fixed && classes.fixed,
//           invert && classes.invert,
//           openDrawer && classes.openDrawer
//         )}
//         component="div"
//         id="header"
//         position="relative"
//       >
//         <Container
//           fixed={!isMobile}
//           maxWidth="xl"
//         >
//           <Grid container>
//             <Grid item sm={2} xs={7}>
//               <div className={classes.logo}>
//                 {isMobile ? (
//                   <IconButton
//                     className={clsx(
//                       "hamburger hamburger--spring",
//                       classes.mobileMenu,
//                       openDrawer && "is-active"
//                     )}
//                     onClick={handleOpenDrawer}
//                     className={clsx('hamburger hamburger--spring', classes.mobileMenu, openDrawer && 'is-active')}
//                   >
//                     <span className="hamburger-box">
//                       <span className={clsx(classes.bar, 'hamburger-inner')} />
//                     </span>
//                   </IconButton>
//                 )}
//                 {invert ? (
//                   <Link href="/">
//                     <a>
//                       <img src={logo} alt="logo" />
//                       {isDesktop && brand.architect.projectName}
//                     </a>
//                   </Link>
//                 ) : (
//                   <AnchorLink href="#home">
//                     <img src={logo} alt="logo" />
//                     {isDesktop && brand.architect.projectName}
//                   </AnchorLink>
//                 )}
//               </div>
//             </Grid>
//
//             <Grid columns={16} item sm={isTablet ? 10 : 9} xs={8}>
//               <div className={classes.headerContent}>
//                 <nav
//                   className={clsx(classes.navMenu, invert && classes.invert)}
//                 >
//                   {isDesktop ? (
//                     <Scrollspy currentClassName="active" items={navMenu}>
//                       {menuList.map((item) => (
//                         <li key={item.id.toString()}>
//                           {invert ? (
//                             // eslint-disable-next-line
//                           <Link href={item.url}>
//                               <a>
//                                 <Button href={item.url}>{item.name}</Button>
//                               </a>
//                             </Link>
//                           ) : (
//                             /*
//                              * <Button offset={item.offset && item.offset || 0} href={item.url}>
//                              *     {item.name}
//                              * </Button>
//                              */
//                             // eslint-disable-next-line
//                           <Link href={item.url}>
//                               <a>
//                                 <Button
//                                   aria-controls={
//                                     open ? "about-menu" : undefined
//                                   }
//                                   aria-expanded={open ? "true" : undefined}
//                                   aria-haspopup="true"
//                                   href={item.url}
//                                   id="about-butoon"
//                                   onClick={handleClick}
//                                   onMouseOver={handleClick}
//                                 >
//                                   {item.name}
//                                 </Button>
//                               </a>
//                             </Link>
//                           )}
//
//                           {/* <Popper */}
//
//                           {/*    anchorEl={anchorEl} */}
//
//                           {/*    disablePortal */}
//
//                           {/*    onMouseLeave={() => setTimeout(() => { */}
//
//                           {/*      handleClose(); */}
//
//                           {/*    }, 500)} */}
//
//                           {/*    open={open} */}
//
//                           {/*    placement="bottom-start" */}
//
//                           {/*    role={undefined} */}
//
//                           {/*    transition */}
//
//                           {/* > */}
//
//                           {/*    {({ TransitionProps, placement }) => ( */}
//
//                           {/*        <Grow */}
//
//                           {/*            {...TransitionProps} */}
//
//                           {/*            style={{ */}
//
//                           {/*              transformOrigin: */}
//
//                           {/*                    placement === 'bottom-start' ? 'left top' : 'left bottom', */}
//
//                           {/*            }} */}
//
//                           {/*        > */}
//
//                           {/*            <Paper> */}
//
//                           {/*                <ClickAwayListener onClickAway={handleClose}> */}
//
//                           {/*                    <MenuList */}
//
//                           {/*                        aria-labelledby="about-button" */}
//
//                           {/*                        autoFocusItem={open} */}
//
//                           {/*                        id="about-menu" */}
//
//                           {/*                    > */}
//
//                           {/*                        <MenuItem onClick={handleClose}> */}
//
//                           {/*                            TEST1 */}
//
//                           {/*                        </MenuItem> */}
//
//                           {/*                        <MenuItem onClick={handleClose}> */}
//
//                           {/*                            TEST2 */}
//
//                           {/*                        </MenuItem> */}
//
//                           {/*                        <MenuItem onClick={handleClose}> */}
//
//                           {/*                            TEST3 */}
//
//                           {/*                        </MenuItem> */}
//
//                           {/*                    </MenuList> */}
//
//                           {/*                </ClickAwayListener> */}
//
//                           {/*            </Paper> */}
//
//                           {/*        </Grow> */}
//
//                           {/*    )} */}
//
//                           {/* </Popper> */}
//                         </li>
//                       ))}
//
//                       {/* <li> */}
//
//                       {/*      <Link href={routeLink.architect.contact}> */}
//
//                       {/*          <a> */}
//
//                       {/*              <Button href={routeLink.architect.contact}> */}
//
//                       {/*                  {t('common:contact')} */}
//
//                       {/*              </Button> */}
//
//                       {/*          </a> */}
//
//                       {/*      </Link> */}
//
//                       {/*  </li> */}
//
//                       <li>
//                         <Link href={routeLink.architect.test}>
//                           <Button
//                             aria-controls={open ? "basic-menu" : undefined}
//                             aria-expanded={open ? "true" : undefined}
//                             aria-haspopup="true"
//                             href={routeLink.architect.test}
//                             id="basic-button"
//                             onClick={handleClick}
//                             onMouseOver={handleClick}
//                           >
//                             {t("common:test")}
//                           </Button>
//                         </Link>
//
//                         <Popper
//                           anchorEl={anchorEl}
//                           disablePortal
//                           onMouseLeave={() =>
//                             setTimeout(() => {
//                               handleClose();
//                             }, 500)
//                           }
//                           open={open}
//                           placement="bottom-start"
//                           role={undefined}
//                           transition
//                         >
//                           {({ TransitionProps, placement }) => (
//                             <Grow
//                               {...TransitionProps}
//                               style={{
//                                 transformOrigin:
//                                   placement === "bottom-start"
//                                     ? "left top"
//                                     : "left bottom",
//                               }}
//                             >
//                               <Paper>
//                                 <ClickAwayListener onClickAway={handleClose}>
//                                   <MenuList
//                                     aria-labelledby="composition-button"
//                                     autoFocusItem={open}
//                                     id="composition-menu"
//                                   >
//                                     <MenuItem onClick={handleClose}>
//                                       TEST1
//                                     </MenuItem>
//
//                                     <MenuItem onClick={handleClose}>
//                                       TEST2
//                                     </MenuItem>
//
//                                     <MenuItem onClick={handleClose}>
//                                       TEST3
//                                     </MenuItem>
//                                   </MenuList>
//                                 </ClickAwayListener>
//                               </Paper>
//                             </Grow>
//                           )}
//                         </Popper>
//                       </li>
//                     </Scrollspy>
//                   )}
//                 </nav>
//                 <nav className={classes.navMenu}>
//                   {/* <Settings */}
//
//                   {/*    invert={invert} */}
//
//                   {/*    toggleDark={onToggleDark} */}
//
//                   {/*    toggleDir={onToggleDir} */}
//
//                   {/* /> */}
//
//                   <Button
//                     color="primary"
//                     href={routeLink.architect.test}
//                     variant="contained"
//                   >
//                     Request a free estimate
//                   </Button>
//                 </nav>
//               </div>
//             </Grid>
//           </Grid>
//         </Container>
//       </AppBar>
//     </>
//   );
// };
//
// Header.propTypes = {
//   invert: PropTypes.bool,
//   t: PropTypes.func,
// };
//
// Header.defaultProps = {
//   sticky: false,
//   invert: false,
// };
//
// export default withTranslation(["common"])(Header);
import React from "react";
import Link from "next/link";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import styles from "./header-style";

const useStyles = makeStyles(styles);

// eslint-disable-next-line react/function-component-definition
export default function Header(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.changeColorOnScroll) {
      // eslint-disable-next-line no-use-before-define
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });
  const brandComponent = (
    <Link href="/components" as="/components">
      <Button className={classes.title}>{brand}</Button>
    </Link>
  );
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {leftLinks !== undefined ? brandComponent : null}
        <div className={classes.flex}>
          {leftLinks !== undefined ? (
            <Hidden smDown implementation="css">
              {leftLinks}
            </Hidden>
          ) : (
            brandComponent
          )}
        </div>
        <Hidden smDown implementation="css">
          {rightLinks}
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  // eslint-disable-next-line react/require-default-props
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  // eslint-disable-next-line react/require-default-props
  rightLinks: PropTypes.node,
  // eslint-disable-next-line react/require-default-props
  leftLinks: PropTypes.node,
  // eslint-disable-next-line react/require-default-props
  brand: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  fixed: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  // eslint-disable-next-line react/require-default-props
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
};
