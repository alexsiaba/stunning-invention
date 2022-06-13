/*eslint-disable*/
import React, { useState } from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Apps } from "@material-ui/icons";

// core components
import CustomDropdown from "/components/CustomDropdown/CustomDropdown";
import menu, { myMenu } from "./menu";
import styles from "./headerLinksStyle";
import MenuItem from "@material-ui/core/MenuItem";
import CustomDropdown1 from "../CustomDropdown/CustomDropdown1";

const useStyles = makeStyles(styles);
console.log("myMenu", myMenu);
export default function HeaderLinks(props) {
  const classes = useStyles();
  const [headerMenuList] = useState(menu);

    const myMenuToHeaderLinks = (node, level) => {
        switch (level) {
            case 0:
                return React.createElement(List, {
                    className: classes.list,
                    children: node.children.map(child => myMenuToHeaderLinks(child, level+1))
                })
            case 1:
                return React.createElement(ListItem, {
                    className: classes.listItem,
                    children: node.children.map(child => myMenuToHeaderLinks(child, level+1))
                })
            case 2:
                return React.createElement(CustomDropdown1, {
                    buttonText: node.title,
                    buttonProps: {
                        className: classes.navLink,
                        color: "transparent"
                    },
                    children: [] //node.children.map(child => myMenuToHeaderLinks(child, level+1))
                })
            case 3:
                return (
                    <MenuItem key={node.id}>
                        <Link href={node.href}>
                            <a className={classes.dropdownLink}>{node.title}</a>
                        </Link>
                    </MenuItem>
                )
        }
    }
  return myMenuToHeaderLinks(myMenu, 0)
}
