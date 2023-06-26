import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  appBar: {
    position: "relative",
  },
  filtericon: {
    padding: 4,
    width: 32,
    height: 32,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    width: 160,
    fontSize: 18,
    fontWeight: 500,
  },
  actionbutton: {
    padding: 0,
    margin: 0,
  },
  actionbutton_disabled: {
    padding: 0,
    margin: 0,
    opacity: 0.38,
  },
  actionimg: {
    padding: 2,
    width: 32,
    height: 32,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 0,
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  keywordtext: {
    flex: 1,
    color: theme.palette.text.primary,
    margin: 0,
    padding: 4,
    backgroundColor: theme.palette.background.dark,
    "& input": {
      fontSize: 14,
      fontWeight: 18,
      backgroundColor: theme.palette.background.dark,
    },
  },
});

class DlgKeyword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyword = this.handleKeyword.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
      keyword: this.props.keyword
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.keyword !== this.props.keyword) {
      this.setState({
        ...this.state,
        keyword: this.props.keyword
      });
    };
  }

  handleChange = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  handleKeyword = () => {
    this.props.onApplyKeyword(this.state.keyword);
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const { classes, open, title, theme } = this.props;
    const { keyword } = this.state;

    const button_class = (keyword !== null && keyword !== undefined && keyword.length > 0) ? classes.actionbutton : classes.actionbutton_disabled;

    return (
      <div className={classes.root}>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <img
                className={classes.filtericon}
                alt="filter"
                src={`/static/images/icons/${theme}/filter.png`}
              />
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              <IconButton
                onClick={(keyword !== null && keyword !== undefined && keyword.length > 0) ? this.handleKeyword : null}
                className={button_class}
              >
                <img
                  className={classes.actionimg}
                  alt="apply"
                  src="/static/images/approve.png"
                />
              </IconButton>
              <IconButton
                onClick={this.handleCancel}
                className={classes.actionbutton}
              >
                <img
                  className={classes.actionimg}
                  alt="apply"
                  src="/static/images/delete.png"
                />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <InputBase
              id="keyword-text"
              className={classes.keywordtext}
              multiline
              fullWidth
              rows="2"
              name="keyword"
              value={keyword}
              onChange={this.handleChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

DlgKeyword.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  theme: PropTypes.string,
  title: PropTypes.string,
  keyword: PropTypes.string,
  onApplyKeyword: PropTypes.func,
  onCancel: PropTypes.func
};

export default withStyles(styles)(DlgKeyword);
