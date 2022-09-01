// Log Actions
export const ACTIVITY_ADD             = 0;
export const ACTIVITY_CHANGE          = 1;
export const ACTIVITY_DELETE          = 2;
export const ACTIVITY_REMOVE          = 3;
export const ACTIVITY_APPROVE         = 4;
export const ACTIVITY_REJECT          = 5;
export const ACTIVITY_MAKE            = 6;
export const ACTIVITY_APPLY           = 7;
export const ACTIVITY_REQUEST         = 8;
export const ACTIVITY_REPORT          = 9;
export const ACTIVITY_PIN             = 10;
export const ACTIVITY_MOVETOP         = 11;
export const ACTIVITY_COPY            = 12;

export const ACTIVITY_TYPE_SYSTEM     = 0;
export const ACTIVITY_TYPE_CATEGORY   = 1;
export const ACTIVITY_TYPE_FEED       = 2;
export const ACTIVITY_TYPE_SOURCE     = 3;
export const ACTIVITY_TYPE_USER       = 4;
export const ACTIVITY_TYPE_ONBOARDING = 5;
export const ACTIVITY_TYPE_CLEANAIRMAP= 6;

export const conf_activity = [
  { type: ACTIVITY_ADD, message: "added" },
  { type: ACTIVITY_CHANGE, message: "changed" },
  { type: ACTIVITY_DELETE, message: "deleted" },
  { type: ACTIVITY_REMOVE, message: "removed" },
  { type: ACTIVITY_APPROVE, message: "approved" },
  { type: ACTIVITY_REJECT, message: "rejected" },
  { type: ACTIVITY_MAKE, message: "made" },
  { type: ACTIVITY_APPLY, message: "applied" },
  { type: ACTIVITY_REQUEST, message: "requested" },
  { type: ACTIVITY_REPORT, message: "reported" },
  { type: ACTIVITY_PIN, message: "pinned" },
  { type: ACTIVITY_MOVETOP, message: "moved to top" },
  { type: ACTIVITY_COPY, message: "copied" }
];