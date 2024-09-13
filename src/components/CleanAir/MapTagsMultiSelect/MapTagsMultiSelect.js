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
    background: "transparent",
  },
  chip: {
    marginLeft: theme.spacing(0.3),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.background.default,
  },
  selected_chip: {
    marginLeft: theme.spacing(0.3),
    color: "#FFF",
    backgroundColor: "#1878F3",
  },
});

class MapTagsMultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (index) => {
    this.props.onSelect(index);
  };

  render() {
    const { classes, width, tags, selecteditems } = this.props;

    return (
      <Paper
        component="ul"
        className={classes.root}
        style={{ maxWidth: width }}
      >
        {tags.map((tag, index) => {
          let selected_index = selecteditems.findIndex(
            (item) => item.tag_name === tag.tag_name
          );
          return (
            <li key={tag.id}>
              <Chip
                className={
                  selected_index === -1 ? classes.chip : classes.selected_chip
                }
                clickable={false}
                key={index}
                label={tag.tag_name}
                name={tag.tag_name}
                onClick={(e) => this.handleClick(tag)}
              />
            </li>
          );
        })}
      </Paper>
    );
  }
}

MapTagsMultiSelect.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.number,
  tags: PropTypes.array,
  selecteditems: PropTypes.array,
  onSelect: PropTypes.func,
};

export default withStyles(styles)(MapTagsMultiSelect);
