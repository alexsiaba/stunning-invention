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
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import {Popper} from "@material-ui/core";

const useStyles = makeStyles(styles);
console.log("myMenu", myMenu);
export default function HeaderLinks(props) {
    const classes = useStyles();
    const [headerMenuList] = useState(menu);

    const myMenuToHeaderLinks = (node, level) => {
        const buttonProps = {
            className: classes.navLink,
            color: "transparent"
        }
        const caretClasses = classNames({
            [classes.caret]: true,
            //[classes.caretActive]: Boolean(anchorEl),
        })
        switch (level) {
            case 0:
                return React.createElement(List, {
                    className: classes.list,
                    children: node.children.map(child => myMenuToHeaderLinks(child, level + 1))
                })
            case 1:
                let button = (
                    <Button {...buttonProps}>
                        {node.title}
                        {node.children.length > 0 && <b className={caretClasses}/>}
                        {node.children.length > 0 && (() => {
                            const [anchorEl, setAnchorEl] = React.useState(null);
                            return <Popper
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                transition
                                disablePortal
                                className={classNames({
                                    [classes.popperClose]: !anchorEl,
                                    [classes.popperResponsive]: true,
                                    [classes.pooperNav]: Boolean(anchorEl) && navDropdown,
                                })}
                            >
                                {node.children.map(child => myMenuToHeaderLinks(child, level + 1))}
                            </Popper>
                        })()
                        }

                    </Button>
                )
                return <ListItem className={classes.listItem}>{button}</ListItem>
            case 2:
                return (
                    <MenuItem key={node.id}>
                        <Link href={node.href}>
                            <a className={classes.dropdownLink}>{node.title}</a>
                        </Link>
                    </MenuItem>
                )
        }
    }
    const compiledMenu = myMenuToHeaderLinks(myMenu, 0)
    console.log(compiledMenu)
    return compiledMenu;
}