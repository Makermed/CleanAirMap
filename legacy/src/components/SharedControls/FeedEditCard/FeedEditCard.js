import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withFirebase } from "services";
import { ImageSelector } from "components";
import { SourceLink } from "./components";
import { check_static_link } from "utility/checklink";
import { MAX_ARTICLE_WIDTH, MAX_WINDOW_WIDTH } from "constants/types";


const BLANK_IMAGE = "/static/images/placeholder.png";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: MAX_WINDOW_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
  },
  sourceItem: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  image_error: {
    border: "2px solid red",
    borderRadius: 10,
  },
  detail: {
    marginLeft: theme.spacing(2),
  },
  name: {
    display: 'block',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    padding: 2,
    paddingLeft: 4,
    border: 0,
    fontSize: 20,
    "&:focus": {
      outline: "0px",
    },
  },
  name_error: {
    display: 'block',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    padding: 2,
    paddingLeft: 4,
    border: 0,
    fontSize: 20,
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.error.main,
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.error.main,
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.error.main,
    },
  },
  description: {
    display: 'block',
    height: 70,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    border: 0,
    fontSize: 14,
    padding: 2,
    paddingLeft: 4,
    marginTop: 4,
    fontFamily: "Roboto",
    "&:focus": {
      outline: "0px",
    },
  },
  description_error: {
    display: 'block',
    height: 70,
    color: theme.palette.text.error,
    backgroundColor: theme.palette.background.default,
    border: 0,
    fontSize: 14,
    padding: 2,
    paddingLeft: 4,
    marginTop: 4,
    fontFamily: "Roboto",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.error.main,
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.error.main,
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.error.main,
    },
  },
  sourcelink: {
    marginBottom: theme.spacing(4),
  },
});


// const schema = {
//   name: {
//     presence: { allowEmpty: false, message: "is required" },
//     length: {
//       maximum: 128
//     }
//   },
//   description: {
//     presence: { allowEmpty: false, message: "is required" },
//     length: {
//       maximum: 1024
//     }
//   }
// };


class FeedEditCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changed: false,
    };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleChangeLink = this.handleChangeLink.bind(this);
    this.handleSelectLink = this.handleSelectLink.bind(this);
    this.handleDeleteLink = this.handleDeleteLink.bind(this);
    this.handleApplyLink = this.handleApplyLink.bind(this);
  }

  handleImageChange = ({ target }) => {
    if (target.files.length === 0) {
      return;
    }
    this.props.onImageChange(this.props.id, target);
    this.setState({
      ...this.state,
      changed: true
    });
  };

  handleChange = event => {
    event.persist();

    this.props.onChange(this.props.id, event);
    this.setState({
      ...this.state,
      changed: true
    });
  };

  handleDeleteLink = (link_id) => {
    this.props.onDeleteLink(link_id);
  };

  handleApplyLink = async (link_id, branch, socialtype, source, weblink) => {
    let new_link = {
      id: link_id,
      branch: branch,
      socialtype: socialtype,
      source: source,
      weblink: weblink
    };
    
    // get link information if the link is a static link
    const static_link_type = check_static_link(source, branch);
    if (static_link_type) {
      new_link.socialtype = static_link_type;
    } else {
      new_link.socialtype = socialtype;
    }

    this.props.onUpdateLink(this.props.id, new_link);
    this.setState({
      ...this.state,
      changed: false
    });
  };

  handleChangeLink = () => {
    this.setState({
      ...this.state,
      changed: true
    });
  }

  // empty function
  handleSelectLink = (link_id) => {
  }
  // empty function

  render() {
    const { 
      classes, 
      theme_mode,
      socialtypes,
      name,
      description,
      image,
      linkImage,
      link
    } = this.props;
    const { changed } = this.state;

    let source_image = image;
    if (image === BLANK_IMAGE) {
      source_image = linkImage ? linkImage : BLANK_IMAGE;
    }

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;

    // source name & description width
    let text_width = width > MAX_ARTICLE_WIDTH ? MAX_ARTICLE_WIDTH - 148 : width - 148;

    return (
      <div className={classes.root}>
        <div className={classes.sourceItem}>
          <div className={source_image === BLANK_IMAGE ? classes.image_error : null}>
            <ImageSelector
              image={source_image}
              imageHandleChanged={this.handleImageChange}
              title={name}
            />
          </div>
          <div className={classes.detail}>
            <input
              name="name"
              placeholder={name === "" ? "name is required" : null}
              value={name || ""}
              className={name === "" ? classes.name_error : classes.name}
              style={{width: text_width}}
              onChange={this.handleChange}
            />
            <textarea
              name="description"
              placeholder={description === "" ? "description is required" : null}
              value={description || ""}
              className={description === "" ? classes.description_error : classes.description}
              style={{width: text_width}}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className={classes.sourcelink}>
          <SourceLink
            selected={true}
            theme={theme_mode}
            socialtypes={socialtypes}
            link={link}
            changed={changed}
            onChange={this.handleChangeLink}
            onSelect={this.handleSelectLink}
            onDelete={this.handleDeleteLink}
            onApply={this.handleApplyLink}
          />
        </div>
      </div>
    );
  }
}

FeedEditCard.propTypes = {
  className: PropTypes.string,
  theme_mode: PropTypes.string,
  socialtypes: PropTypes.array,
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  linkImage: PropTypes.string,
  link: PropTypes.object,
  onChange: PropTypes.func,
  onImageChange: PropTypes.func,
  onUpdateLink: PropTypes.func,
  onDeleteLink: PropTypes.func
};

export default compose(
  withFirebase,
  withRouter,
  withStyles(styles)
)(FeedEditCard);
