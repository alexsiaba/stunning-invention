/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const { dropup } = props;
  const classes = useStyles();
  const buttonProps = {
    className: classes.navLink,
    color: "inherit"
  };
  const dropdownItem = classNames({
    [classes.dropdownItem]: true
  });
  const buildTopClickableButtons = (node, children) => {
    let button = <Button {...buttonProps}>{node.title}</Button>;

    if (node.children.length) {
      const [anchorEl, setAnchorEl] = React.useState(null);
      const handleClick = event => console.log("send to the element's url");
      const onMouseEnter = event => setAnchorEl(event.currentTarget);
      const onMouseLeave = event => setAnchorEl(null);
      const caretClasses = classNames({
        [classes.caret]: true,
        [classes.caretActive]: Boolean(anchorEl)
      });
      button = <Button {...buttonProps} onClick={handleClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {node.title} <b className={caretClasses} />
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
              style={{transformOrigin: `0 ${dropup ? "100%" : "0"} 0`}}
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
  };
  const buildDropDownMenu = (node) => {
    return (
      <MenuList role="menu" className={classes.menuList}>
        <MenuItem className={dropdownItem} key={node.id}>
          <Link href={node.href}>
            <a className={classes.dropdownLink}>{node.title}</a>
          </Link>
        </MenuItem>
      </MenuList>
    );
  };
  const buildChildren = (node, level) => node.children.map(child => buildTopMenu(child, level));

  const buildTopMenu = (node, level) => {
    switch (level) {
      case 0:
        return <List className={classes.list}>{buildChildren(node, level + 1)}</List>;
      case 1:
        return buildTopClickableButtons(node, buildChildren(node, level + 1));
      case 2:
        return buildDropDownMenu(node);
    }
  };
  return buildTopMenu(menu, 0);
}