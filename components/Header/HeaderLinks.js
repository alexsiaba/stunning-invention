/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import menu from "./menu";
import styles from "./headerLinksStyle";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import { Accordion, AccordionDetails, AccordionSummary, Popper } from "@material-ui/core";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListItemText from "@material-ui/core/ListItemText";
import { ExpandMore } from "@material-ui/icons";
import { useRouter } from "next/router";

export default function HeaderLinks() {
  const classes = makeStyles(styles)();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const router = useRouter();
  const sendToRouter = node => ev => ev.target.id === node.id && router.push(`/${node.href}`, `/${node.id}`, { node });

  const renderDesktop = (level, children, node) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const onClick = sendToRouter(node);
    switch (level) {
      case 0:
        return <List className={classes.list}>{children}</List>;
      case 1:
        const buttonProps = {
          className: classes.navLink,
          color: "inherit"
        };
        let button = <Button {...buttonProps} {...{ onClick }} id={node.id}>{node.title}</Button>;

        if (children.length) {
          const onMouseEnter = event => setAnchorEl(event.currentTarget);
          const onMouseLeave = _ => setAnchorEl(null);
          const caretClasses = classNames({ [classes.caret]: true, [classes.caretActive]: Boolean(anchorEl) });
          button = <Button key={node?.id} {...buttonProps} {...{ onClick, onMouseEnter, onMouseLeave }}>
            <span id={node.id}>{node.title}</span> <b className={caretClasses} />
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
                  <Paper key={node.id} className={classes.dropdown}>
                    {children}
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Button>;
        }
        return <ListItem key={node.id} className={classes.listItem}>{button}</ListItem>;//problem with keys was here
      case 2:
        const dropdownItem = classNames({ [classes.dropdownItem]: true });
        return <MenuList role="menu" className={classes.menuList} key={node.id}>
          <MenuItem className={dropdownItem}>
            <span {...{ onClick }} id={node.id}>{node.title}</span>
          </MenuItem>
        </MenuList>;
    }
  };

  const renderMobile = (level, children, node) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    switch (level) {
      case 0:
        return <List component="nav">{children}</List>;
      case 1:
        return (
          <Accordion key={node?.id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              {node.title}
            </AccordionSummary>

            <AccordionDetails>
              <List key={node?.id} component="nav">
                {children}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      case 2:
        return (
          <ListItem
            button
            component="a"
            href={node.href}
            key={node?.id}
            style={{ animationDuration: `${node * 0.15}s` }}
          >
            <ListItemText
              primary={node.title}
              className={classes.menuList}
            />
          </ListItem>
        );
    }
  };

  const buildNavMenu = (node, level) => {
    level = level || 0;
    let [children, renderer] = [[], renderDesktop];
    if (level < 2) children = node.children.map(child => buildNavMenu(child, level + 1));
    if (isMobile) renderer = renderMobile;
    return renderer(level, children, node);
  };
  return buildNavMenu(menu);
}