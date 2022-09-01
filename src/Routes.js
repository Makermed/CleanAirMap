import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import * as ROUTES from "constants/routes";
import { default as PageTransition } from "utility/pagetransition";

import {
  Home as HomeView,
  SignIn as SignInView,
  SignInEmail as SignInEmailView,
  SignInPhone as SignInPhoneView,
  SignUp as SignUpView,
  Notifications as NotificationsView,
  Profile as ProfileView,
  ProfilePhone as ProfilePhoneView,
  Onboarding as OnboardingView,
  ResetPassword as ResetPasswordView,
  CleanAirMap as CleanAirMapView,
  CleanAirTutorial as CleanAirTutorialView,
  CleanAirLocationAdd as CleanAirLocationAddView,
  CleanAirLocationEdit as CleanAirLocationEditView,
  CleanAirLocation as CleanAirLocationView,
  CleanAirLocationModeration as CleanAirLocationModerationView,
  CleanAirPostsFlagged as CleanAirPostsFlaggedView,
  CleanAirPostsProposed as CleanAirPostsProposedView,
  CleanAirReadingsFlagged as CleanAirReadingsFlaggedView,
  CleanAirReadingsProposed as CleanAirReadingsProposedView,
  CleanAirModeratorsFlagged as CleanAirModeratorsFlaggedView,
  CleanAirLocationLogs as CleanAirLocationLogsView,
  CleanAirLocationSettings as CleanAirLocationSettingsView,
  CleanAirPost as CleanAirPostView,
  Settings as SettingsView,
  NotFound as NotFoundView,
  Membership as MembershipView,
  User as UserView,
  About as AboutView,
  ContactUs as ContactUsView,
  OurValues as OurValuesView,
  TOS as TOSView,
  PrivacyPolicy as PrivacyPolicyView,
} from "./views";

const animations = {
  left: {
    preset: "fadeFromRight",
    enter: null,//"moveFromRight",
    exit: null,//"moveToLeft"
  },
  right: {
    preset: "fadeFromLeft",
    enter: null,//"moveFromLeft",
    exit: null,//"moveToRight"
  },
  top: {
    preset: "fadeFromTop",
    enter: null,//"moveFromTop",
    exit: null,//"moveToBottom",
  },
  bottom: {
    preset: "fadeFromBottom",
    enter: null,//"moveFromBottom",
    exit: null,//"moveToTop"
  }
};

const Routes = () => {
  return (
    <Route
      render={({ location }) => {
        // console.log("location :", location);

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

        // console.log("animation :", animation);

        return (
          <PageTransition
            preset={animation.preset}
            transitionKey={location.pathname}
            exitAnimation={animation.exit}
            enterAnimation={animation.enter}
          >
            <Switch location={location}>
              <Redirect exact from={ROUTES.LANDING} to={ROUTES.HOME} />
              <Route component={HomeView} exact path={ROUTES.HOME} />
              <Route component={SignUpView} exact path={ROUTES.SIGN_UP} />
              <Route component={SignInView} exact path={ROUTES.SIGN_IN} />
              <Route component={SignInEmailView} exact path={ROUTES.EMAIL_SIGNIN} />
              <Route component={SignInPhoneView} exact path={ROUTES.PHONE_SIGNIN} />
              <Route component={ResetPasswordView} exact path={ROUTES.RESET_PASSWORD} />

              <Route component={NotificationsView} exact path={ROUTES.NOTIFICATIONS} />
              <Route component={ProfileView} exact path={ROUTES.PROFILE} />
              <Route component={ProfilePhoneView} exact path={ROUTES.PROFILE_PHONE} />
              <Route component={NewsletterFeedsView} exact path={ROUTES.PROFILE_NEWSLETTER} />
              <Route component={OnboardingView} exact path={ROUTES.ONBOARDING} />
              
              <Route component={CleanAirMapView} exact path={ROUTES.CLEANAIRMAP} />
              <Route component={CleanAirTutorialView} exact path={ROUTES.CLEANAIRMAP_TUTORIAL} />
              <Route component={CleanAirLocationAddView} exact path={ROUTES.CLEANAIRMAP_ADD} />
              <Route component={CleanAirLocationEditView} exact path={ROUTES.CLEANAIRMAP_EDIT} />
              <Route component={CleanAirLocationView} exact path={ROUTES.CLEANAIRMAP_DETAIL} />
              <Route component={CleanAirLocationView} exact path={ROUTES.CLEANAIRMAP_READINGS} />
              <Route component={CleanAirLocationView} exact path={ROUTES.CLEANAIRMAP_POSTS} />
              <Route component={CleanAirLocationModerationView} exact path={ROUTES.CLEANAIRMAP_MODERATION} />
              <Route component={CleanAirPostsFlaggedView} exact path={ROUTES.CLEANAIRMAP_FLAGGED_POSTS} />
              <Route component={CleanAirPostsProposedView} exact path={ROUTES.CLEANAIRMAP_PROPOSED_POSTS} />
              <Route component={CleanAirReadingsFlaggedView} exact path={ROUTES.CLEANAIRMAP_FLAGGED_READINGS} />
              <Route component={CleanAirReadingsProposedView} exact path={ROUTES.CLEANAIRMAP_PROPOSED_READINGS} />
              <Route component={CleanAirModeratorsFlaggedView} exact path={ROUTES.CLEANAIRMAP_FLAGGED_MODERATORS} />
              <Route component={CleanAirLocationLogsView} exact path={ROUTES.CLEANAIRMAP_LOCATION_LOGS} />
              <Route component={CleanAirLocationSettingsView} exact path={ROUTES.CLEANAIRMAP_LOCATION_SETTING} />
              <Route component={CleanAirPostView} exact path={ROUTES.CLEANAIRMAP_POST} />
              
              <Route component={SettingsView} exact path={ROUTES.SETTINGS} />
              <Route component={MembershipView} exact path={ROUTES.MEMBERSHIP} />
              <Route component={UserView} exact path={ROUTES.USER_DETAIL} />
              <Route component={ContactsView} exact path={ROUTES.CONTACTS} />

              <Route component={AboutView} exact path={ROUTES.ABOUT} />
              <Route component={ContactUsView} exact path={ROUTES.CONTACTUS} />
              <Route component={OurValuesView} exact path={ROUTES.OUR_VALUES} />
              <Route component={TOSView} exact path={ROUTES.TERMS_OF_SERVICE} />
              <Route component={PrivacyPolicyView} exact path={ROUTES.PRIVACY_POLICY} />
              
              <Route component={NotFoundView} exact path={ROUTES.NOT_FOUND} />
              <Redirect to={ROUTES.NOT_FOUND} />
            </Switch>
          </PageTransition>
        );
      }}
    />
  );
};

export default Routes;
