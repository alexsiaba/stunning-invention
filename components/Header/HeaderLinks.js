/*eslint-disable*/
import React, {useState} from "react";
import Link from "next/link";

// @material-ui/core components
import {makeStyles, useTheme} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import menu from "./menu";
import styles from "./headerLinksStyle";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import { Popper } from "@material-ui/core";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import clsx from "clsx";
import ListItemText from "@material-ui/core/ListItemText";


class MobileMenuRenderer {
  constructor(classes, openDrawer, setOpenDrawer) {
    this.classes = classes
    this.openDrawer = openDrawer
    this.setOpenDrawer = setOpenDrawer
  }
  render(level, children, node) {

    const toggleDrawer = () => this.setOpenDrawer(!this.openDrawer);
    switch (level) {
      case 0: return (
              <SwipeableDrawer
                  open={this.openDrawer}
                  onClose={toggleDrawer}
                  onOpen={toggleDrawer}
                  classes={{
                    paper: this.classes.paperNav,
                  }}
              >
                {children}
              </SwipeableDrawer>
          )
      case 1: return (
          <div
              className={this.classes.mobileNav}
              role="presentation"
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
          >
            <div className={clsx(this.classes.menu, this.openDrawer && this.classes.menuOpen)}>
              <List component="nav">
                {children}
              </List>
            </div>
          </div>
      )
      case 2: return (
                <ListItem
                    button
                    component="a"
                    href={node.href}
                    key={node.id}
                    style={{ animationDuration: `${node * 0.15}s` }}
                >
                  <ListItemText
                      primary={node.title}
                      className={this.classes.menuList}
                  />
                </ListItem>
      )
    }
  }
}
class DesktopMenuRenderer {
  constructor(classes, anchorEl, setAnchorEl) {
    this.classes = classes;
    this.anchorEl = anchorEl
    this.setAnchorEl = setAnchorEl
  }
  render(level, children, node) {
    switch (level) {
      case 0: return <List className={this.classes.list}>{children}</List>;
      case 1:
        const buttonProps = {
          className: this.classes.navLink,
          color: "inherit"
        };
        const onClick = _ => console.log("send to the element's url");
        let button = <Button {...buttonProps} {...{onClick}}>{node.title}</Button>;

        if (children.length) {
          const onMouseEnter = event => this.setAnchorEl(event.currentTarget);
          const onMouseLeave = _ => this.setAnchorEl(null);
          const caretClasses = classNames({[this.classes.caret]: true, [this.classes.caretActive]: Boolean(this.anchorEl)});
          button = <Button {...buttonProps} {... {onClick, onMouseEnter, onMouseLeave}}>
            {node.title} <b className={caretClasses} />
            <Popper
                open={Boolean(this.anchorEl)}
                anchorEl={this.anchorEl}
                transition
                disablePortal
                className={classNames({
                  [this.classes.popperClose]: !this.anchorEl,
                  [this.classes.popperResponsive]: true,
                  [this.classes.popperNav]: Boolean(this.anchorEl)
                })}
            >
              {() => (
                  <Grow
                      in={Boolean(this.anchorEl)}
                      id="menu-list"
                  >
                    <Paper className={this.classes.dropdown}>
                      {children}
                    </Paper>
                  </Grow>
              )}
            </Popper>
          </Button>;
        }
        return <ListItem className={this.classes.listItem}>{button}</ListItem>;
      case 2:
        const dropdownItem = classNames({[this.classes.dropdownItem]: true});
        return <MenuList role="menu" className={this.classes.menuList}>
          <MenuItem className={dropdownItem} key={node.id}>
            <Link href={node.href}>
              <a className={this.classes.dropdownLink}>{node.title}</a>
            </Link>
          </MenuItem>
        </MenuList>
    }
  }
}
class MenuBuilder {
  constructor(isMobile, classes) {

    this.strategy = isMobile ? new MobileMenuRenderer(classes, openDrawer, setOpenDrawer) : new DesktopMenuRenderer(classes, anchorEl, setAnchorEl)
  }

  buildNavMenu = (node, level) => {
    level = level || 0
    let children = []
    if (level < 2)
      children = node.children.map(child => this.buildNavMenu(child, level + 1))
    return this.strategy.render(level, children, node)
  }
}

export default function HeaderLinks() {
  const classes = makeStyles(styles)();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

  const renderDesktop = (level, children, node) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    switch (level) {
      case 0:
        return <List className={classes.list}>{children}</List>;
      case 1:
        const buttonProps = {
          className: classes.navLink,
          color: "inherit"
        };
        const onClick = _ => console.log("send to the element's url");
        let button = <Button {...buttonProps} {...{onClick}}>{node.title}</Button>;

        if (children.length) {
          const onMouseEnter = event => setAnchorEl(event.currentTarget);
          const onMouseLeave = _ => setAnchorEl(null);
          const caretClasses = classNames({[classes.caret]: true, [classes.caretActive]: Boolean(anchorEl)});
          button = <Button {...buttonProps} {...{onClick, onMouseEnter, onMouseLeave}}>
            {node.title} <b className={caretClasses}/>
            <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                transition
                disablePortal
                className={classNames({
                  [classes.popperClose]: !anchorEl,
                  [classes.popperResponsive]: true,
                  [classes.popperNav]: Boolean(anchorEl)
                })}
            >
              {() => (
                  <Grow
                      in={Boolean(anchorEl)}
                      id="menu-list"
                  >
                    <Paper className={classes.dropdown}>
                      {children}
                    </Paper>
                  </Grow>
              )}
            </Popper>
          </Button>;
        }
        return <ListItem className={classes.listItem}>{button}</ListItem>;
      case 2:
        const dropdownItem = classNames({[classes.dropdownItem]: true});
        return <MenuList role="menu" className={classes.menuList}>
          <MenuItem className={dropdownItem} key={node.id}>
            <Link href={node.href}>
              <a className={classes.dropdownLink}>{node.title}</a>
            </Link>
          </MenuItem>
        </MenuList>
    }
  }

  const renderMobile = (level, children, node) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = () => setOpenDrawer(!openDrawer);
    switch (level) {
      case 0:
        return (
            <SwipeableDrawer
                open={openDrawer}
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
                classes={{
                  paper: classes.paperNav,
                }}
            >
              {children}
            </SwipeableDrawer>
        )
      case 1:
        return (
            <div
                className={classes.mobileNav}
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
            >
              <div className={clsx(classes.menu, openDrawer && classes.menuOpen)}>
                <List component="nav">
                  {children}
                </List>
              </div>
            </div>
        )
      case 2:
        return (
            <ListItem
                button
                component="a"
                href={node.href}
                key={node.id}
                style={{animationDuration: `${node * 0.15}s`}}
            >
              <ListItemText
                  primary={node.title}
                  className={classes.menuList}
              />
            </ListItem>
        )
    }
  }

  const buildNavMenu = (node, level) => {
    level = level || 0
    let children = []
    if (level < 2)
      children = node.children.map(child => buildNavMenu(child, level + 1))
    let renderer = isMobile ? renderMobile : renderDesktop
    return renderer(level, children, node)
  }
  return buildNavMenu(menu);
}