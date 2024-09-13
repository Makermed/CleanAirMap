import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Chip, Paper } from "@material-ui/core";

const styles = (theme) => ({
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
    backgroundColor: theme.palette.background.main,
    opacity: 0.5,
  },
  selected_chip: {
    margin: theme.spacing(0.5),
    color: "#FFF",
    backgroundColor: "#1878F3",
  },
});

class MapTagsSingleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (index) => {
    this.props.onSelect(index);
  };

  render() {
    const { classes, width, tags, selecteditem } = this.props;

    return (
      <Paper
        component="ul"
        className={classes.root}
        style={{ maxWidth: width }}
      >
        {tags.map((tag, index) => (
          <li key={index}>
            <Chip
              className={
                selecteditem && selecteditem.tag_name === tag.tag_name
                  ? classes.selected_chip
                  : classes.chip
              }
              clickable={false}
              key={tag.id}
              label={tag.tag_name}
              name={tag.tag_name}
              onClick={(e) => this.handleClick(tag)}
            />
          </li>
        ))}
      </Paper>
    );
  }
}

MapTagsSingleSelect.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.number,
  tags: PropTypes.array,
  selecteditem: PropTypes.object,
  onSelect: PropTypes.func,
};

export default withStyles(styles)(MapTagsSingleSelect);
