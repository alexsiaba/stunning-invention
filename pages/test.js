
import * as React from 'react';
import Button from "@material-ui/core/Button";
import Menu from '@material-ui/core/Menu';
import {withTranslation} from "../i18n";
import {Fade, MenuItem} from "@material-ui/core";

 function Test() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
     function handleClick(event) {
         if (anchorEl !== event.currentTarget) {
             setAnchorEl(event.currentTarget);
         }
     }
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                onMouseOver={handleClick}
            >
                Test
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>TEXT1</MenuItem>
                <MenuItem onClick={handleClose}>Text2</MenuItem>
                <MenuItem onClick={handleClose}>TEXT3</MenuItem>
            </Menu>
        </div>
    );
}

export default withTranslation(['common'])(Test);