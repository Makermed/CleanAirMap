import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Chip, Paper } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "nowrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    overflow: "auto",
    background: theme.palette.background.default,
  },
  chip: {
    margin: theme.spacing(0.5),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.background.light,
    opacity: 0.5,
  },
  selected_chip: {
    margin: theme.spacing(0.5),
    color: "#FFF",
    backgroundColor: theme.palette.secondary.main,
  }
});

class TagChipsSlide extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (index) => {
    this.props.onSelect(index);
  }

  render() {
    const { classes, width, chips, selected } = this.props;

    return (
      <Paper component="ul" className={classes.root} style={{maxWidth: width}}>
        {chips.map((chip, index) =>
          <li key={index}>
            <Chip
              className={selected === index ? classes.selected_chip : classes.chip}
              clickable={false}
              key={index}
              label={chip}
              name={chip}
              onClick={event => this.handleClick(index)}
            />
          </li>
        )}
      </Paper>
    );
  }
}

TagChipsSlide.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.number,
  chips: PropTypes.array,
  selected: PropTypes.array,
  onSelect: PropTypes.func
};

export default withStyles(styles)(TagChipsSlide);
