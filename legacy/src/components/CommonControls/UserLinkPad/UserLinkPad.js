import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import { conf_userlinks } from "constants/userlinks";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    width: 112,
    height: 140,
    borderRadius: 4,
  },
  button: {
    margin: 0,
    padding: 0,
  },
  iconimage: {
    padding: 4,
    width: 28,
    height: 28,
    opacity: 0.38,
  },
  iconimage_selected: {
    padding: 4,
    width: 28,
    height: 28,
  },
});

class UserLinkPad extends React.Component {
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

  handleClick = (userlink) => {
    this.setState({
      ...this.state,
      selected: userlink.type,
    });
    this.props.onSelect(userlink);
  };

  render() {
    const { classes, theme } = this.props;
    const { selected } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          {conf_userlinks.map((userlink, index) => {
            let image_class =
              selected === userlink.type
                ? classes.iconimage_selected
                : classes.iconimage;
            return (
              <Grid item xs={3} key={`link-${index}`}>
                <IconButton
                  className={classes.button}
                  onClick={(event) => this.handleClick(userlink)}
                >
                  <img
                    className={image_class}
                    alt={userlink.name}
                    src={`/static/images/icons/${theme}/${userlink.image}`}
                  />
                </IconButton>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

UserLinkPad.propTypes = {
  classes: PropTypes.object,
  selected: PropTypes.number,
  theme: PropTypes.string,
  onSelect: PropTypes.func
};

export default withStyles(styles)(UserLinkPad);
