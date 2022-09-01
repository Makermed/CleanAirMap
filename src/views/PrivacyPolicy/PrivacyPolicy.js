import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { BasicAppBar } from "components";
import { MAX_ARTICLE_WIDTH } from "constants/types";
import { privacy_html } from "./privacy_html";


const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default
  },
  appbar: {
    width: MAX_ARTICLE_WIDTH,
    maxWidth: "100%",
    height: "56px",
    [theme.breakpoints.up('sm')]: {
      height: "64px",
    },
  },
  container: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    fontFamily: "roboto",
    color: theme.palette.text.primary,
  },
});


class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavBack = this.handleNavBack.bind(this);
  }

  handleNavBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            width={MAX_ARTICLE_WIDTH}
            title={"Privacy Policy"}
            onNavBack={this.handleNavBack}
          />
        </div>

        <div 
          className={classes.container}
          dangerouslySetInnerHTML={{ __html: privacy_html }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(PrivacyPolicy);
