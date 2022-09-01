import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { 
  Grid, Checkbox, Typography, Box, 
  Button, FormControl, Select, MenuItem 
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { CONF_BRANCHES } from "constants/branches";
import { MIN_CARD_WIDTH, MAX_CARD_WIDTH } from "constants/types";

const styles = (theme) => ({
  root: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
    minWidth: MIN_CARD_WIDTH - 16,
    maxWidth: MAX_CARD_WIDTH - 16,
  },
  grid: {
    // justifyContent: "left",
    flexWrap: "inherit",
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.background.card,
    // margin: 3,
    borderRadius: 5,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  image: {
    objectFit: "cover",
    height: 80,
    width: 80,
    borderRadius: 10,
    // margin: theme.spacing(1),
  },
  number: {
    position: "absolute",
    fontSize: "12px",
    fontWeight: 600,
    fontStyle: "italic",
    lineHeight: "16px",
    left: theme.spacing(1),
    top: theme.spacing(1),
    zIndex: 100,
  },
  check: {
    position: "absolute",
    left: 0,
    top: theme.spacing(0.5),
    zIndex: 100,
  },
  button: {
    margin: 0,
  },
  triangle_corner: {
    position: "absolute",
    borderRight: "32px solid transparent",
    borderLeft: `32px solid ${theme.palette.background.default}`,
    borderBottom: "32px solid transparent",
    height: 0,
    width: 0,
    left: 0,
    top: 0,
    zIndex: 2,
  },
  title: {
    position: "relative",
    width: `calc(100% - 80px)`,
    textAlign: "left",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "18px",
    textTransform: "none",
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  branchimage: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    width: 16,
    height: 16,
  },
  description: {
    position: "relative",
    width: "100% - 170px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: 100,
    lineHeight: "14px",
    textTransform: "none",
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(5),
  },
  gridupvotes: {
    width: 28,
  },
  upvotes: {
    position: "absolute",
    width: 28,
    right: theme.spacing(0.5),
    top: 50,
    textAlign: "center",
    fontSize: "11px",
    fontWeight: 100,
  },
  upvote_mark: {
    position: "absolute",
    height: 24,
    width: 24,
    color: theme.palette.text.secondary,
    right: theme.spacing(0.7),
    top: 34,
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  actionbtn: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "20px",
    padding: "4px 10px",
    marginLeft: theme.spacing(1),
    textTransform: "initial",
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  actionicon: {
    padding: 0,
    width: 24,
    height: 24,
    color: theme.palette.primary.contrastText,
  },
  throttlediv: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: 16,
    width: 140,
    height: 32,
    marginLeft: theme.spacing(1),
  },
  throttlelabel: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '18px',
    color: theme.palette.text.primary,
    textTransform: 'none',
    marginLeft: theme.spacing(1),
  },
  throttle: {
    height: 18,
    width: 60,
    marginLeft: theme.spacing(1),
    margin: 0,
    padding: 0
  },
  selectEmpty: {
    margin: 0,
    height: 20,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '16px',
    color: theme.palette.text.secondary
  },
  selectitem: {
    height: 20,
    minHeight: 20,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '16px',
    textTransform: 'none',
    color: theme.palette.text.secondary
  },
});

const chkstyles = (theme) => ({
  root: {
    height: 14,
    color: theme.palette.text.secondary,
    "&$checked": {
      color: theme.palette.text.primary,
    },
    padding: 0,
    marginLeft: 0,
  },
  checked: {},
});

const CustomCheckbox = withStyles(chkstyles)((props) => <Checkbox color="default" {...props} />);

class Source extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeThrottle = this.handleChangeThrottle.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
      selected: this.props.selected
    });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.selected !== prevProps.selected) {
      this.setState({
        ...this.state,
        selected: this.props.selected
      });
    }
  }

  handleClick = () => {
    this.setState({
      selected: !this.state.selected
    });
  }

  handleCheck = (event) => {
    // console.log("handleCheck :", event.target.checked);
    const { source } = this.props;
    const selected = event.target.checked;
    this.setState({
      selected: selected,
    });
    this.props.onSelected(source.id, selected);
  };

  handleEdit = () => {
    const { source } = this.props;
    this.props.onEdit(source.id);
  };

  handleDelete = () => {
    const { source } = this.props;
    this.props.onDelete(source.id);
  };

  handleChangeThrottle = (event, source_id) => {
    const throttle = parseInt(event.target.value, 10);
    this.props.onChangeThrottle(source_id, throttle);
  }

  renderThrottle = (classes, source_id, throttle, onChangeThrottle) => {
    const throttles = [100, 75, 50, 25];
    return (
      <Grid container>
        <Grid item>
          <Typography className={classes.throttlelabel}>
            Throttle
          </Typography>
        </Grid>
        <Grid item>
          <FormControl className={classes.throttle}>
            <Select
              value={throttle}
              name="Throttle"
              onChange={e => onChangeThrottle(e, source_id)}
              className={classes.selectEmpty}>
              {throttles.map(thvalue => (
                <MenuItem
                  className={classes.selectitem}
                  key={`throttle-${thvalue}`}
                  value={thvalue}>
                  {`${thvalue}%`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }

  makeSummary = (text) => {
    let words = text.split(" ");
    let characters = 0;
    let word_count = 0;
    let new_words = [];
    while (characters < 150 && word_count < words.length) {
      new_words.push(words[word_count]);
      characters += words[word_count].length;
      word_count++;
    }

    let summary = new_words.join(" ");
    if (word_count < words.length) {
      summary += "...";
    }
    return summary;
  }

  render() {
    const { classes, noncheck, editable, deletable, source, theme } = this.props;
    const { selected } = this.state;

    let branchimage = "";
    let branchname = "";
    let branchInfo = CONF_BRANCHES.find(
      (branch) => branch.value === source.branch
    );
    if (branchInfo !== undefined) {
      branchimage = `/static/images/icons/${theme}/${branchInfo.image}`;
      branchname = branchInfo.name;
    }

    let refined_description = this.makeSummary(source.description);

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    if (width > MAX_CARD_WIDTH)
      width = MAX_CARD_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;
    width = width - 112 - 16;

    return (
      <div className={classes.root}>
        <img
          className={classes.branchimage}
          src={branchimage}
          alt={branchname}
        />
        <Grid container 
          className={classes.grid}
          onClick={noncheck ? this.handleClick : null}
        >
          {!noncheck && (
            <div>
              <div className={classes.triangle_corner}></div>
              <CustomCheckbox
                className={classes.check}
                checked={selected}
                onClick={this.handleCheck}
              />
            </div>
          )}
          <Grid item>
            <img
              className={classes.image}
              src={source.image}
              alt={source.name}
            />
          </Grid>
          <Grid item>
            <Typography className={classes.title}>{source.name}</Typography>
            <Typography className={classes.description}>
              {refined_description}
            </Typography>
            <div style={{ width: width }}></div>
          </Grid>
          <Grid item className={classes.gridupvotes}>
            <ArrowDropUpIcon className={classes.upvote_mark} />
            <Typography className={classes.upvotes}>
              {source.upvotes}
            </Typography>
          </Grid>
        </Grid>
        <Box className={classes.btncontainer}>
          {selected && editable && (
            <Button
              className={classes.actionbtn}
              startIcon={
                <img
                  className={classes.actionicon}
                  alt="edit"
                  src={`/static/images/edit.png`}
                />
              }
              onClick={this.handleEdit}
            >
              Edit
            </Button>
          )}
          {selected && deletable && (
            <Button
              className={classes.actionbtn}
              startIcon={
                <img
                  className={classes.actionicon}
                  alt="delete"
                  src={`/static/images/delete.png`}
                />
              }
              onClick={this.handleDelete}
            >
              Delete
            </Button>
          )}
          {selected && editable && (  
            <div className={classes.throttlediv}>
              {this.renderThrottle(classes, source.id, source.throttle, this.handleChangeThrottle)}
            </div>
          )}
        </Box>
      </div>
    );
  }
}

Source.propTypes = {
  classes: PropTypes.object,
  source: PropTypes.object,
  selected: PropTypes.bool,
  theme: PropTypes.string,
  editable: PropTypes.bool,
  deletable: PropTypes.bool,
  noncheck: PropTypes.bool,
  onSelected: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onChangeThrottle: PropTypes.func
};

export default withStyles(styles)(Source);
