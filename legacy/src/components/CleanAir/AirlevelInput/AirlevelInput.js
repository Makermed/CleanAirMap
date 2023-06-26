import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    position: "relative",
    width: 170,
    cursor: "pointer",
    padding: theme.spacing(2),
    border : `2px solid ${theme.palette.text.secondary}`
  },
  root_selected: {
    position: "relative",
    width: 170,
    cursor: "pointer",
    padding: theme.spacing(2),
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
    height: 48,
    width: 48,
  },
  title: {
    fontSize: "24px",
    lineHeight: "28px",
    color: theme.palette.text.primary,
  },
  levelinput: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    padding: 4,
    border: 0,
    marginTop: theme.spacing(1),
    fontSize: 16,
    fontFamily: "Roboto",
    cursor: "text",
    textAlign: "center",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
      textAlign: "center",
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
      textAlign: "center",
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.secondary,
      textAlign: "center",
    },
  },
  levelinput_error: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    padding: 4,
    border: "1px solid red",
    marginTop: theme.spacing(1),
    fontSize: 16,
    fontFamily: "Roboto",
    cursor: "text",
    textAlign: "center",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
      textAlign: "center",
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
      textAlign: "center",
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.secondary,
      textAlign: "center",
    },
  },
});

class AirlevelInput extends React.Component {

  render() {
    const { classes, name, min, max, selected, image, text1, text2, placeholder, level, onSelect, onChange } = this.props;

    const real_level = level === -1 ? "" : level;
    let input_class = classes.levelinput;
    if (selected && real_level && (level < min || level > max)) {
      input_class = classes.levelinput_error;
    }

    return (
      <div 
        className={selected ? classes.root_selected : classes.root} 
        onClick={e => onSelect(name)}
      >
        <div className={selected ? classes.container_selected : classes.container}>
          <img 
            className={classes.image} 
            src={image} 
            alt={`${text1} ${text2}`} 
          />
          <Typography className={classes.title}>{text1}</Typography>
          <Typography className={classes.title}>{text2}</Typography>
          <input 
            type="number"
            name={name}
            min={min}
            max={max}
            placeholder={placeholder}
            value={ real_level }
            className={input_class}
            style={{width: 120}}
            onChange={e => onChange(e.target.value)}
          />
        </div>
      </div>
    );
  }
}

AirlevelInput.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  selected: PropTypes.bool,
  image: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  placeholder: PropTypes.string,
  level: PropTypes.number,
  onSelect: PropTypes.func,
  onChange: PropTypes.func
};

export default withStyles(styles)(AirlevelInput);
