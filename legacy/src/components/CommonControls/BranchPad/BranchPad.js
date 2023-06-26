import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { BRANCH_ALL, ARTICLE_BRANCH_USERPOST, CONF_BRANCHES, ARTICLE_BRANCH_MAPPOST_TWITTER, ARTICLE_BRANCH_MAPPOST_INSTAGRAM } from "constants/branches";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    width: 132,
    height: 172,
    borderRadius: 4,
  },
  button: {
    margin: 0,
    padding: 0,
  },
  branchimage: {
    padding: 4,
    width: 28,
    height: 28,
    opacity: 0.38,
  },
  branchimage_selected: {
    padding: 4,
    width: 28,
    height: 28,
  },
  all: {
    padding: 4,
    fontSize: 14,
  },
  all_disabled: {
    padding: 4,
    fontSize: 14,
    opacity: 0.38,
  }
});

class BranchPad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: -1,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      selected: this.props.selected,
    });
  }

  handleClick = (branch) => {
    const { useAll } = this.props;
    if (!useAll && branch.value === BRANCH_ALL) {
      return;
    }

    this.setState({
      ...this.state,
      selected: branch.value,
    });

    this.props.onSelect(branch);
  };

  render() {
    const { classes, theme } = this.props;
    const { selected } = this.state;

    const branches = 
      CONF_BRANCHES
        .filter(item => 
          item.value !== ARTICLE_BRANCH_USERPOST && 
          item.value !== ARTICLE_BRANCH_MAPPOST_TWITTER && 
          item.value !== ARTICLE_BRANCH_MAPPOST_INSTAGRAM
        );

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          {branches.map((branch, index) => {
            let image_class =
              selected === branch.value
                ? classes.branchimage_selected
                : classes.branchimage;
            let all_class = selected === BRANCH_ALL ? classes.all : classes.all_disabled;
            return (
              <Grid item xs={3} key={`link-${index}`}>
                <IconButton
                  className={classes.button}
                  onClick={(event) => this.handleClick(branch)}
                >
                  {branch.value === BRANCH_ALL && (
                    <Typography className={all_class}>
                      All
                    </Typography>
                  )}
                  {branch.value !== BRANCH_ALL && (
                    <img
                      className={image_class}
                      alt={branch.name}
                      src={`/static/images/icons/${theme}/${branch.image}`}
                    />
                  )}
                </IconButton>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

BranchPad.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  useAll: PropTypes.any,
  selected: PropTypes.number,
  onSelect: PropTypes.func
};


export default withStyles(styles)(BranchPad);
