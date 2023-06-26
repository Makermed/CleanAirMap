import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Source } from "./components";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
});

class SourceCardList extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeThrottle = this.handleChangeThrottle.bind(this);
  }

  handleSelect = (source_id, selected) => {
    this.props.onSelected(source_id, selected);
  };

  handleEdit = (source_id) => {
    this.props.onEdit(source_id);
  }

  handleDelete = (source_id) => {
    this.props.onDelete(source_id);
  }

  handleChangeThrottle = (source_id, throttle) => {
    this.props.onChangeThrottle(source_id, throttle);
  }

  render() {
    const { classes, editable, deletable, noncheck, sources, selected, theme } = this.props;

    if (sources.length === 0) {
      return <div></div>;
    }
    let sorted_sources = sources.sort((a, b) => b.upvotes - a.upvotes);

    return (
      <div className={classes.root}>
        <Grid container className={classes.sources}>
          {sorted_sources.map((source, index) => {
            let isSelected = false;
            if (selected && selected.find(item => item.id === source.id) !== undefined) {
              isSelected = true;
            } 

            return (
              <Grid item key={index}>
                <Source
                  source={source}
                  selected={isSelected}
                  theme={theme}
                  editable={editable !== undefined}
                  deletable={deletable !== undefined}
                  noncheck={noncheck !== undefined}
                  onSelected={noncheck === undefined ? this.handleSelect : null}
                  onEdit={editable === undefined ? null : this.handleEdit}
                  onDelete={deletable === undefined ? null : this.handleDelete}
                  onChangeThrottle={editable === undefined ? null : this.handleChangeThrottle}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

SourceCardList.propTypes = {
  classes: PropTypes.object,
  noncheck: PropTypes.any,
  editable: PropTypes.any,
  deletable: PropTypes.any,
  sources: PropTypes.array,
  theme: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onChangeThrottle: PropTypes.func
};

export default withStyles(styles)(SourceCardList);
