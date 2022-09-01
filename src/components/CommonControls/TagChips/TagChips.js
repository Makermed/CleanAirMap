import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";

const styles = theme => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
    // height: 130,
    overflowX: "hidden",
    overflowY: "auto"
  },
  chip: {
    margin: theme.spacing(0.5),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.background.main,
    opacity: 0.5,
  },
  selected_chip: {
    margin: theme.spacing(0.5),
    color: "#FFF",
    backgroundColor: "#1878F3"
  }
});

class TagChips extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (index) => {
    this.props.onSelect(index);
  }

  render() {
    const { classes, chips, selected } = this.props;
    // const { selected } = this.state;

    return (
      <div className={classes.root}>
        {chips.map((chip, index) => {
          let selected_index = selected.findIndex(item => item === chip);
          if (selected_index === -1) {
            return (
              <Chip
                className={classes.chip}
                clickable={false}
                key={index}
                label={chip}
                name={chip}
                onClick={event => this.handleClick(chip)}
              />
            );
          } else {
            return (
              <Chip
                className={classes.selected_chip}
                clickable={false}
                key={index}
                label={chip}
                name={chip}
                onClick={event => this.handleClick(chip)}
              />
            );
          }
        })}
      </div>
    );
  }
}

TagChips.propTypes = {
  classes: PropTypes.object,
  chips: PropTypes.array,
  selected: PropTypes.array,
  onSelect: PropTypes.func
};

export default withStyles(styles)(TagChips);
