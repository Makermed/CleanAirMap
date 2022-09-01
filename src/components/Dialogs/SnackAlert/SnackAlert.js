import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    "& .MuiSnackbarContent-action": {
      position: "absolute",
      right: 16
    }
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.success.contrastText,
    "& .MuiSnackbarContent-action": {
      position: "absolute",
      right: 16
    }
  },
  info: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.success.contrastText,
    "& .MuiSnackbarContent-action": {
      position: "absolute",
      right: 16
    }
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.success.contrastText,
    "& .MuiSnackbarContent-action": {
      position: "absolute",
      right: 16
    }
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center",
    marginRight: 44
  }
}));

const SnakeAlert = forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    className,
    variant,
    message,
    openStats,
    vertical,
    horizontal,
    handleEvent,
    ...other
  } = props;

  const Icon = variantIcon[variant];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (handleEvent !== undefined) {
      handleEvent();
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: vertical || "bottom",
          horizontal: horizontal || "left"
        }}
        open={openStats}
        autoHideDuration={6000}
        ref={ref}
        onClose={handleClose}
      >
        <SnackbarContent
          className={clsx(classes[variant], className)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
          {...other}
        />
      </Snackbar>
    </div>
  );
});

SnakeAlert.propTypes = {
  classes: PropTypes.object,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["info", "success", "warning", "error"])
};

SnakeAlert.defaultProps = {
  variant: "info"
};

export default SnakeAlert;
