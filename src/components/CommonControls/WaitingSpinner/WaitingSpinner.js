import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { ThreeDots } from "react-loader-spinner";

const styles = (theme) => ({
  spinIcon: {
    color: theme.palette.primary.contrastText,
  },
});

class WaitingSpinner extends React.Component {
  render() {
    const { classes, open } = this.props;

    return (
      <div>
        {open && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <ThreeDots
                height="32"
                width="32"
                radius="4"
                color={classes.spinIcon.color}
                ariaLabel="waiting-spinner"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(WaitingSpinner);
