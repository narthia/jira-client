export interface CustomerCreateDto {
  /** Customer's name for display in the UI. */
  displayName?: string;
  /** Customer's email address. */
  email?: string;
  /** Deprecated, please use 'displayName'. */
  fullName?: string;
}
/** URLs for the customer record and related items. */
export interface UserLinkDto {
  /**
   * Links to the various sizes of the customer's avatar. Note that this property is
   * deprecated, and will be removed in future versions.
   */
  avatarUrls?: {
    [key: string]: string;
  };
  /** REST API URL for the customer. */
  jiraRest?: string;
  self?: string;
}