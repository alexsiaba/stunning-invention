import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import useStyles from "./mobileMenuStyle";
import { withTranslation } from "../../i18n";
import menu from "./menu";

const MobileMenu = function (props) {
  const classes = useStyles();
  const { toggleDrawer, open, t } = props;
  console.log("menu.children", menu.children);
  const SideList = function () {
    return (
      <div
        className={classes.mobileNav}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <div className={clsx(classes.menu, open && classes.menuOpen)}>
          <List component="nav">
            {menu.children.map((item) => (
              <ListItem
                button
                component="a"
                href={item.href}
                key={item.id}
                style={{ animationDuration: `${item * 0.15}s` }}
              >
                <ListItemText
                  primary={item.title}
                  className={classes.menuList}
                />
              </ListItem>
            ))}
          </List>
          <ListItem
            button
            component="a"
            // href={routeLink.architect.contact}
            style={{ animationDuration: `${menu.children.length * 0.15}s` }}
          >
            <ListItemText
              primary={t("common:architect-landing.header_contact")}
              className={classes.menuList}
            />
          </ListItem>
        </div>
      </div>
    );
  };

  return (
    <SwipeableDrawer
      open={open}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
      classes={{
        paper: classes.paperNav,
      }}
    >
      <SideList />
    </SwipeableDrawer>
  );
};

MobileMenu.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation(["architect-landing"])(MobileMenu);
