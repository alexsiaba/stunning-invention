import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Icon from "@material-ui/core/Icon";
import Popper from "@material-ui/core/Popper";

// core components
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import styles from "./customDropdownStyle";

const useStyles = makeStyles(styles);

// eslint-disable-next-line react/function-component-definition
export default function CustomDropdown1(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = (param) => {
    setAnchorEl(null);
    if (props && props.onClick) {
      props.onClick(param);
    }
  };
  const handleCloseAway = (event) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
  };
  const classes = useStyles();
  const {
    buttonText,
    buttonIcon,
    dropdownList,
    buttonProps,
    dropup,
    dropdownHeader,
    caret,
    hoverColor,
    left,
    rtlActive,
    noLiPadding,
    navDropdown,
      children
  } = props;
  const caretClasses = classNames({
    [classes.caret]: true,
    [classes.caretActive]: Boolean(anchorEl),
    [classes.caretRTL]: rtlActive,
  });
  const dropdownItem = classNames({
    [classes.dropdownItem]: true,
    [classes[`${hoverColor}Hover`]]: true,
    [classes.noLiPadding]: noLiPadding,
    [classes.dropdownItemRTL]: rtlActive,
  });
  let icon = null;
  switch (typeof buttonIcon) {
    case "object":
      icon = <props.buttonIcon className={classes.buttonIcon} />;
      break;
    case "string":
      icon = <Icon className={classes.buttonIcon}>{props.buttonIcon}</Icon>;
      break;
    default:
      icon = null;
      break;
  }
  const router = useRouter();

  const handleRouteToPage = (e, path) => {
    e.preventDefault();
    console.log(path);
    router.push(path);
  };
  return (
    <>
      <Button
          {...buttonProps}
          onClick={handleClick}
          onDoubleClick={e => handleRouteToPage(e, `${buttonText.toLowerCase()}`)}
      >
        {buttonText}
        {caret && <b className={caretClasses} />}
      </Button>
      <Popper
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
        {children}
      </Popper>
    </>
  );
}

CustomDropdown1.defaultProps = {
  caret: true,
  hoverColor: "primary",
};

CustomDropdown1.propTypes = {
  hoverColor: PropTypes.oneOf([
    "black",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
  ]),
  buttonText: PropTypes.node.isRequired,
  buttonIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  // dropdownList: PropTypes.array,
  buttonProps: PropTypes.object,
  dropup: PropTypes.bool,
  dropdownHeader: PropTypes.node,
  rtlActive: PropTypes.bool,
  caret: PropTypes.bool,
  left: PropTypes.bool,
  noLiPadding: PropTypes.bool,
  navDropdown: PropTypes.bool,
  // function that retuns the selected item
  onClick: PropTypes.func,
};
