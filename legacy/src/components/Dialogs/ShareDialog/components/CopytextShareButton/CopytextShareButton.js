import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { IconButton } from "@material-ui/core";

const styles = theme => ({
  share_icon: {
    margin: 0,
    padding: 0
  },
  share_icon_image: {
    width: 32,
    height: 32
  },
});

class CopytextShareButton extends React.Component {
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
  }

  render() {
    const {
      classes,
    } = this.props;

    return (
      <div>
        <IconButton
          className={classes.share_icon}
          onClick={e => this.handleCopy()}
        >
          <img 
            className={classes.share_icon_image}
            alt="copy to text"
            src={"/static/images/icons/copy.png"} 
          />
        </IconButton>
      </div>
    );
  }
}

CopytextShareButton.propTypes = {
  url: PropTypes.string,
};

CopytextShareButton.defaultProps = {
  url: "",
};

export default withStyles(styles)(CopytextShareButton);