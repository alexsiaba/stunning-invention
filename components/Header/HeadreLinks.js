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
import menu from "./menu";
import styles from "./headerLinksStyle";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const [headerMenuList] = useState(menu);
  return (
    <List className={classes.list}>
      {headerMenuList.map((item) => (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            navDropdown
            buttonText={item.name}
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={Apps}
            dropdownList={item.dropdownList}
          />
        </ListItem>
      ))}
      <ListItem className={classes.listItem}>
        <Link href="/contact">
          <a className={classes.navLink}>Contact</a>
        </Link>
      </ListItem>
    </List>
  );
}
