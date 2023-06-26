export const ROLE_SUPER_ADMIN           = 0;
export const ROLE_REGULAR_ADMIN         = 1;
export const ROLE_CATEGORY_MODERATOR    = 2;
export const ROLE_FEED_MODERATOR        = 3;
export const ROLE_USER                  = 4;
export const ROLE_ANONYMOUS             = 5;

export const PAID_USER                  = 0;
export const FREE_USER                  = 1;

export const conf_role = [
  { type: ROLE_SUPER_ADMIN, value: "superadmin", label: "Super Admin" },
  { type: ROLE_REGULAR_ADMIN, value: "regularadmin", label: "Regular Admin" },
  { type: ROLE_CATEGORY_MODERATOR, value: "categorymoderator", label: "Category Moderator" },
  { type: ROLE_FEED_MODERATOR, value: "feedmoderator", label: "Feed Moderator" },
  { type: ROLE_USER, value: "user", label: "User" }
];