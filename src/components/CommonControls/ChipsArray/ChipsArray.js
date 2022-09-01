import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Chip, IconButton } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
  },
  foldicon: {
    position: "absolute",
    top: -24,
    right: 0,
    width: 16,
    height: 16,
    marginBottom: 8,
    color: theme.palette.text.primary,
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.background.light,
  }
});

class ChipsArray extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChips: true
    };

    this.handleFoldButton = this.handleFoldButton.bind(this);
  }

  handleFoldButton = () => {
    this.setState({
      showChips: !this.state.showChips
    });
  };

  render() {
    const { classes, chips, onDeleteChip, color, readOnly } = this.props;
    const { showChips } = this.state;

    if (!readOnly) {
      return (
        <div className={classes.root}>
          {showChips ? (
            <IconButton
              edge="start"
              className={classes.foldicon}
              aria-label="fold"
              onClick={this.handleFoldButton}
            >
              <ExpandLessIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              className={classes.foldicon}
              aria-label="fold"
              onClick={this.handleFoldButton}
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
          {showChips && chips.map((chip, index) => {
            return (
              <Chip
                key={index}
                color={color}
                label={chip}
                name={chip}
                onDelete={event => onDeleteChip(chip)}
                className={classes.chip}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          {showChips ? (
            <IconButton
              edge="start"
              className={classes.foldicon}
              aria-label="fold"
              onClick={this.handleFoldButton}
            >
              <ExpandLessIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              className={classes.foldicon}
              aria-label="fold"
              onClick={this.handleFoldButton}
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
          {showChips && chips.map((chip, index) => {
            return (
              <Chip
                key={index}
                color={color}
                size="small"
                label={chip}
                name={chip}
                className={classes.chip}
              />
            );
          })}
        </div>
      );
    }
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  readOnly: PropTypes.any,
  chips: PropTypes.array,
  onDeleteChip: PropTypes.func
};

export default withStyles(styles)(ChipsArray);
