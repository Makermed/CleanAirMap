export const is_paid_user = (loggedIn, authUser) => {
  if (!loggedIn) {
    return false;
  }
  if (!authUser.paid || !authUser.paid_until) {
    return false;
  } else {
    const paid_until_ts = Date.parse(authUser.paid_until);
    const now_ts = Date.now();
    return paid_until_ts >= now_ts;
  }
};

export const is_twitter_user = (loggedIn, authUser) => {
  if (!loggedIn) {
    return false;
  }

  const links = authUser.links;
  if (links.length === 0) {
    return false;
  }

  return links.find((link) => link.type === "twitter") !== undefined;
};
