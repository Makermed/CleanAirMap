import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { 
  Grid,
  Typography,
} from "@material-ui/core";
import { ToastSuccess } from "utility/toast";

const styles = theme => ({
  share_icon: {
    margin: 0,
    padding: 0
  },
  share_icon_image: {
    width: 32,
    height: 32
  },
  title: {
    fontSize: "14px",
    marginTop: theme.spacing(1),
  },
});

class CopylinkButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleCopy = this.handleCopy.bind(this);
  }

  handleCopy = () => {
    const { url } = this.props;
    
    var dummy = document.createElement("input");
    dummy.style = "position: absolute; left: -1000px; top: -1000px";
    dummy.value = url;
    document.body.appendChild(dummy);
    dummy.select();
    dummy.focus();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    ToastSuccess('Link Copied to Clipboard!');
  }

  render() {
    const {
      classes,
      theme_mode
    } = this.props;

    return (
      <div
        className={classes.share_icon}
        onClick={e => this.handleCopy()}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item style={{height: '32px'}}>
            <img 
              className={classes.share_icon_image}
              alt="copy link"
              src={`/static/images/icons/${theme_mode}/link.png`} 
            />
          </Grid>
          <Grid item>
            <Typography className={classes.title}>Copy link</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CopylinkButton.propTypes = {
  url: PropTypes.string,
  theme_mode: PropTypes.string
};

CopylinkButton.defaultProps = {
  url: "",
};

export default withStyles(styles)(CopylinkButton);