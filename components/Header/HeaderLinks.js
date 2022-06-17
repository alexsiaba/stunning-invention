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
import {Accordion, AccordionDetails, AccordionSummary, Popper} from "@material-ui/core";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import clsx from "clsx";
import ListItemText from "@material-ui/core/ListItemText";
import {ExpandMore} from "@material-ui/icons";

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    switch (level) {
      case 0:
        console.log("children", 0, children)
        return <List component="nav">{children}</List>
      case 1:
        console.log("children", 1, children)
        return (
            <Accordion>
              <AccordionSummary  expandIcon={<ExpandMore />}>
                {node.title}
              </AccordionSummary>

              <AccordionDetails>
                <List component="nav">
                  {children}
                </List>
              </AccordionDetails>
            </Accordion>
        )
      case 2:
        console.log("children", 2, children)
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
    let [children, renderer] = [[], renderDesktop]
    if (level < 2) children = node.children.map(child => buildNavMenu(child, level + 1))
    if (isMobile) renderer = renderMobile
    return renderer(level, children, node)
  }
  return buildNavMenu(menu);
}