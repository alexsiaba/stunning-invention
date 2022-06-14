/*eslint-disable*/
import React, { useState } from "react";
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
import {Popper} from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
    const classes = useStyles();
    const buttonProps = {
        className: classes.navLink,
        color: "inherit"
    }

    const buildTopClickableButtons = (node, children) => {
        let button = <Button {...buttonProps}>{node.title}</Button>

        if (node.children.length) {
            const [anchorEl, setAnchorEl] = React.useState(null);
            const handleClick = event => console.log("send to the element's url")
            const onMouseEnter = event => setAnchorEl(event.currentTarget);
            const onMouseLeave = event => setAnchorEl(null);
            const caretClasses = classNames({
                [classes.caret]: true,
                [classes.caretActive]: Boolean(anchorEl),
            })
            button = <Button {...buttonProps} onClick={handleClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {node.title} <b className={caretClasses}/>
                <Popper
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    transition
                    disablePortal
                    className={classNames({
                        [classes.popperClose]: !anchorEl,
                        [classes.popperResponsive]: true,
                        [classes.popperNav]: Boolean(anchorEl),
                    })}
                >{children}</Popper>
            </Button>
        }
        return <ListItem className={classes.listItem}>{button}</ListItem>
    }
    const buildDropDownMenu = (node) => {
        return <MenuItem key={node.id}>
            <Link href={node.href}>
                <a className={classes.dropdownLink}>{node.title}</a>
            </Link>
        </MenuItem>
    }
    const buildChildren = (node, level) => node.children.map(child => buildTopMenu(child, level))

    const buildTopMenu = (node, level) => {
        switch (level) {
            case 0:
                return <List className={classes.list}>{buildChildren(node, level + 1)}</List>
            case 1:
                return buildTopClickableButtons(node, buildChildren(node, level + 1))
            case 2:
                return buildDropDownMenu(node)
        }
    }
    return buildTopMenu(menu, 0);
}