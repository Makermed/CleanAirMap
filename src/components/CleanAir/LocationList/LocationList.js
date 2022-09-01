import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem } from "@material-ui/core";
import { Location } from "components";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default
  },
  listitem: {
    padding: 0
  }
});

class LocationList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.scrollFn = this.listenToScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollFn);
    window.scrollTo(this.props.scrollPos.x, this.props.scrollPos.y);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollFn);
  }

  handleClick = article => {
    this.props.saveScrollPos(window.scrollX, window.scrollY);
    this.props.onSelectArticle(article);
  };

  listenToScroll = (event) => {
    event.preventDefault();

    // const { bottomNavbar, topNavbar } = this.props;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight - window.innerHeight;
    if (height === 0) {
      return;
    }

    const scrolled = winScroll * 1.0 / height;

    // console.log("listenToScroll saveScrollPos");
    this.props.saveScrollPos(window.scrollX, window.scrollY);
    if (scrolled === 0.0) {
      // this.props.showTopNavbar(true);
    } else if (scrolled === 1.0 || scrolled >= 0.99) {
      // this.props.saveScrollPos(window.scrollX, window.scrollY);
      // this.props.onNeedMore();
    // } else if (winScroll > 30) {
    } else {
      // if (topNavbar) {
      //   this.props.showTopNavbar(false);
      // }
      // if (!bottomNavbar) {
      //   this.props.showBottomNavbar(true);
      // }
    }
  };

  render() {
    const { 
      classes,
      locations, 
      onNeedLogin,
      onReport,
      onModerate,
      onModerateRegion,
      onEdit,
      onResign,
      onReadMore
    } = this.props;

    if (locations.length === 0) {
      return <div></div>;
    }

    return (
      <div className={classes.root}>
        <List component="location-list" aria-label="location list">
          {locations.map(location => (
            <ListItem className={classes.listitem} key={location.id}>
              <Location
                location={location}
                onLogin={onNeedLogin}
                onReport={onReport}
                onModerate={onModerate}
                onModerateRegion={onModerateRegion}
                onEdit={onEdit}
                onResign={onResign}
                onReadMore={onReadMore}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

LocationList.propTypes = {
  classes: PropTypes.object,
  locations: PropTypes.array,
  onNeedMore: PropTypes.func,
  onLogin: PropTypes.func,
  onReport: PropTypes.func,
  onModerate: PropTypes.func,
  onModerateRegion: PropTypes.func,
  onEdit: PropTypes.func,
  onResign: PropTypes.func,
  onReadMore: PropTypes.func,
};


const mapStateToProps = state => ({
  scrollPos: state.uiState.scrollPos,
  // bottomNavbar: state.uiState.bottomNavbar,
  // topNavbar: state.uiState.topNavbar,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(LocationList);
