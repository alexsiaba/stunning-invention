import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import CheckIcon from '@material-ui/icons/Check';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { i18n, withTranslation } from '../../i18n';
import useStyles from './header-style';

let themeType = 'light';
if (typeof Storage !== 'undefined') {
  themeType = localStorage.getItem('luxiTheme') || 'light';
}

function Settings(props) {
  const [ctn, setCtn] = useState(null);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDark, setDark] = useState(themeType === 'dark');

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleChangeMode = () => {
    setDark(!isDark);
    props.toggleDark();
  };

  function handleChangeLang(lang) {
    if (lang === 'ara') {
      i18n.changeLanguage('ara');
      props.toggleDir('rtl');
    } else {
      i18n.changeLanguage(lang);
      props.toggleDir('ltr');
    }
    setAnchorEl(null);
  }

  useEffect(() => {
    setCtn(document.getElementById('main-wrap'));
  });

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { invert, t } = props;
  return (
      <div className={classes.setting}>
          <IconButton
              aria-describedby={id}
              aria-label="Settings"
              className={
                    clsx(
                      classes.icon,
                      open && classes.active,
                      invert && classes.invert,
                    )
                }
              onClick={handleClick}
          >
              <SettingsIcon fontSize="inherit" />
          </IconButton>

          <Popover
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              container={ctn}
              id={id}
              onClose={handleClose}
              open={open}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
          >
              <List
                  aria-label="Mode-menu"
                  className={classes.modeMenu}
                  component="nav"
                  subheader={(
                      <ListSubheader component="div">
                          {t('common:architect-landing.header_theme')}
                      </ListSubheader>
                    )}
              >
                  <ListItem>
                      <Typography component="div">
                          <Grid
                              alignItems="center"
                              component="label"
                              container
                              spacing={1}
                          >
                              <Grid item>
                                  {t('common:architect-landing.header_light')}
                              </Grid>

                              <Grid item>
                                  <Switch
                                      checked={isDark}
                                      inputProps={{ 'aria-label': 'checkbox' }}
                                      onChange={handleChangeMode}
                                      value={isDark}
                                  />
                              </Grid>

                              <Grid item>
                                  {t('common:architect-landing.header_dark')}
                              </Grid>
                          </Grid>
                      </Typography>
                  </ListItem>
              </List>

              <Divider />

              <List
                  aria-label="Language-menu"
                  className={classes.langMenu}
                  component="nav"
                  subheader={(
                      <ListSubheader component="div">
                          {t('common:architect-landing.header_language')}
                      </ListSubheader>
                    )}
              >
                  {i18n.options.allLanguages ? i18n.options.allLanguages.map((val) => (
                      <ListItem
                          button
                          dense
                          key={val}
                          onClick={() => handleChangeLang(val)}
                          role={undefined}
                      >
                          <ListItemIcon>
                              <i className={val} />
                          </ListItemIcon>

                          <ListItemText primary={t(`common:${val}`)} />

                          {i18n.language === val && (
                          <ListItemSecondaryAction>
                              <CheckIcon color="primary" />
                          </ListItemSecondaryAction>
                          )}
                      </ListItem>
                  )) : null}
              </List>
          </Popover>
      </div>
  );
}

Settings.propTypes = {
  toggleDark: PropTypes.func,
  toggleDir: PropTypes.func,
  t: PropTypes.func,
  invert: PropTypes.bool,
};

Settings.defaultProps = {
  invert: false,
};

export default withTranslation(['common', 'architect-landing'])(Settings);
