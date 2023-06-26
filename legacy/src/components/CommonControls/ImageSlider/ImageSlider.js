import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Slider from "react-slick";

const styles = theme => ({
  root: {
    flexGrow: 1,
    "& li.slick-active button:before": {
      color: theme.palette.text.primary
    },
    "& li button:before": {
      color: theme.palette.text.secondary
    }
  },
  bannerTxt: {
    color: theme.palette.text.primary,
    fontSize: 26,
    lineHeight: 1.2,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    zIndex: 2
  },
  bannerImg: {
    marginTop: -20,
    width: "100%"
  }
});

class ImageSlider extends React.Component {
  render() {
    const { classes } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    };

    return (
      <div className={classes.root}>
        <div>
          <Slider {...settings}>
            <div>
              <Typography className={classes.bannerTxt} gutterBottom>
                The best news.
                <br />
                The best social.
                <br />
                In one app.
              </Typography>
              <img
                className={classes.bannerImg}
                src={"/static/images/site/onboard1.png"}
                alt="slider1"
              />
            </div>
            <div>
              <Typography className={classes.bannerTxt} gutterBottom>
                Let's curate.
                <br />
                Together.
              </Typography>
              <img
                className={classes.bannerImg}
                src={"/static/images/site/onboard2.png"}
                alt="slider2"
              />
            </div>
            <div>
              <Typography className={classes.bannerTxt} gutterBottom>
                Your own feeds.
                <br />
                Anytime. Anywhere.
              </Typography>
              <img
                className={classes.bannerImg}
                src={"/static/images/site/onboard3.png"}
                alt="slider3"
              />
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

ImageSlider.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ImageSlider);
