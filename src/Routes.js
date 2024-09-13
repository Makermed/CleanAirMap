import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { default as PageTransition } from "./utility/pagetransition";
import {
  CleanAirMap as CleanAirMapView,
  CleanAirTutorial as CleanAirTutorialView,
  CleanAirLocationAdd as CleanAirLocationAddView,
  CleanAirLocation as CleanAirLocationView,
  SignIn as SignInView,
  SignInEmail as SignInEmailView,
  SignInPhone as SignInPhoneView,
} from "./views";

const animations = {
  left: {
    preset: "fadeFromRight",
    enter: null, //"moveFromRight",
    exit: null, //"moveToLeft"
  },
  right: {
    preset: "fadeFromLeft",
    enter: null, //"moveFromLeft",
    exit: null, //"moveToRight"
  },
  top: {
    preset: "fadeFromTop",
    enter: null, //"moveFromTop",
    exit: null, //"moveToBottom",
  },
  bottom: {
    preset: "fadeFromBottom",
    enter: null, //"moveFromBottom",
    exit: null, //"moveToTop"
  },
};

const Routes = () => {
  return (
    <Route
      render={({ location }) => {
        let animation = animations["right"];
        if (location.state && location.state.animation) {
          if (location.state.animation === "left") {
            animation = animations["left"];
          } else if (location.state.animation === "right") {
            animation = animations["right"];
          } else if (location.state.animation === "top") {
            animation = animations["top"];
          } else if (location.state.animation === "bottom") {
            animation = animations["bottom"];
          }
        }

        return (
          <PageTransition
            preset={animation.preset}
            transitionKey={location.pathname}
            exitAnimation={animation.exit}
            enterAnimation={animation.enter}
          >
            <Switch location={location}>
              <Redirect exact from={ROUTES.LANDING} to={ROUTES.CLEANAIRMAP} />
              <Route
                component={CleanAirMapView}
                exact
                path={ROUTES.CLEANAIRMAP}
              />
              <Route
                component={CleanAirLocationAddView}
                exact
                path={ROUTES.CLEANAIRMAP_ADD}
              />
              <Route
                component={CleanAirTutorialView}
                exact
                path={ROUTES.CLEANAIRMAP_TUTORIAL}
              />
              <Route
                component={CleanAirLocationView}
                exact
                path={ROUTES.CLEANAIRMAP_DETAIL}
              />
              <Route
                component={CleanAirLocationView}
                exact
                path={ROUTES.CLEANAIRMAP_READINGS}
              />
              <Route component={SignInView} exact path={ROUTES.SIGN_IN} />
              <Route
                component={SignInEmailView}
                exact
                path={ROUTES.EMAIL_SIGNIN}
              />
              <Route
                component={SignInPhoneView}
                exact
                path={ROUTES.PHONE_SIGNIN}
              />
              <Redirect to={ROUTES.NOT_FOUND} />
            </Switch>
          </PageTransition>
        );
      }}
    />
  );
};

export default Routes;
