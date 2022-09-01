import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    position: "relative",
    width: 95,
    cursor: "pointer",
    padding: theme.spacing(1),
    border : `2px solid ${theme.palette.text.secondary}`
  },
  root_selected: {
    position: "relative",
    width: 95,
    cursor: "pointer",
    padding: theme.spacing(1),
    border: `2px solid ${theme.palette.text.primary}`
  },
  container: {
    textAlign: "center",
    opacity: 0.31,
  },
  container_selected: {
    textAlign: "center",
    opacity: 1.0
  },
  image: {
    height: 32,
    width: 32,
  },
  title: {
    fontSize: "16px",
    lineHeight: "20px",
    color: theme.palette.text.primary,
  },
});

class MaskOption extends React.Component {

  render() {
    const { classes, id, selected, image, text1, text2, onSelect } = this.props;

    return (
      <div 
        className={selected ? classes.root_selected : classes.root} 
        onClick={e => onSelect(id)}
      >
        <div className={selected ? classes.container_selected : classes.container}>
          <img 
            className={classes.image} 
            src={image} 
            alt={`${text1} ${text2}`} 
          />
          <Typography className={classes.title}>{text1}</Typography>
          <Typography className={classes.title}>{text2}</Typography>
        </div>
      </div>
    );
  }
}

MaskOption.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.number,
  selected: PropTypes.bool,
  image: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  onSelect: PropTypes.func,
};

export default withStyles(styles)(MaskOption);
