import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  appBar: {
    position: "relative",
  },
  alerticon: {
    padding: 4,
    width: 32,
    height: 32,
  },
  title: {
    marginLeft: theme.spacing(4),
    flex: 1,
    width: 160,
    fontSize: 18,
    fontWeight: 500,
  },
  cancelbutton: {
    padding: 0,
    margin: 0,
  },
  actionimg: {
    padding: 0,
    width: 32,
    height: 32,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
  },
  plus: {
    padding: 8,
    width: 32,
    height: 32,
    color: theme.palette.primary.contrastText,
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    margin: theme.spacing(1),
  },
  actionbtn: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "20px",
    padding: "4px 10px",
    textTransform: "initial",
  },
});

class DlgSuggestSource extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickSourceAdd = this.handleClickSourceAdd.bind(this);
    this.handleClickSourceSearch = this.handleClickSourceSearch.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleClickSourceAdd = () => {
    this.props.onSourceAdd();
  };

  handleClickSourceSearch = () => {
    this.props.onSourceSearch();
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const { classes, open, theme } = this.props;

    const title = "Suggest a Source";

    return (
      <div className={classes.root}>
        <Dialog open={open} PaperProps={{ style: { borderRadius: 10 } }}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              <IconButton
                onClick={this.handleCancel}
                className={classes.cancelbutton}
              >
                <img
                  className={classes.actionimg}
                  alt="cancel"
                  src="/static/images/delete.png"
                />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <div className={classes.btncontainer}>
              <Button
                className={classes.actionbtn}
                startIcon={
                  <img
                    className={classes.plus}
                    alt="plus"
                    src={`/static/images/icons/${theme}/plus.png`}
                  />
                }
                onClick={this.handleClickSourceAdd}
              >
                Add a Source
              </Button>
              <Button
                className={classes.actionbtn}
                startIcon={
                  <img
                    className={classes.plus}
                    alt="search"
                    src={`/static/images/icons/${theme}/search.png`}
                  />
                }
                onClick={this.handleClickSourceSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

DlgSuggestSource.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  theme: PropTypes.string,
  onCancel: PropTypes.func,
  onSourceAdd: PropTypes.func,
  onSourceSearch: PropTypes.func
};

export default withStyles(styles)(DlgSuggestSource);
