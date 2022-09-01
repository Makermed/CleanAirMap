import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Chip, Paper } from "@material-ui/core";
import TagFacesIcon from "@material-ui/icons/TagFaces";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "nowrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    overflow: "auto",
    maxWidth: "360px"
  },
  chip: {
    margin: theme.spacing(0.5)
  }
});

class ChipsSlide extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chipData: [
        { key: 0, label: "Angular" },
        { key: 1, label: "jQuery" },
        { key: 2, label: "Polymer" },
        { key: 3, label: "React" },
        { key: 4, label: "Vue" },
        { key: 5, label: "Knockout" },
        { key: 6, label: "Ember" },
        { key: 7, label: "D3" },
        { key: 8, label: "Google Charts" }
      ]
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = (chipToDelete) => () => {
    const { chipData } = this.state;
    const new_chips = chipData.filter(chip =>  chip.key !== chipToDelete.key);
    this.setState({
      ...this.state,
      chipData: new_chips
    });
  };

  render() {
    const { classes } = this.props;
    const { chipData } = this.state;

    return (
      <Paper component="ul" className={classes.root}>
        {chipData.map((data) => {
          let icon;
          if (data.label === "React") {
            icon = <TagFacesIcon />;
          }

          return (
            <li key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={data.label === "React" ? undefined : this.handleDelete(data)}
                className={classes.chip}
              />
            </li>
          );
        })}
      </Paper>
    );
  }
}

ChipsSlide.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ChipsSlide);