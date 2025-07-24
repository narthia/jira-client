export interface ErrorCollections {}
/** Details about a license for the Jira instance. */
export interface License {
  /** The applications under this license. */
  applications: LicensedApplication[];
}
/** Details about a licensed Jira application. */
export interface LicensedApplication {
  /** The ID of the application. */
  id: string;
  /** The licensing plan. */
  plan: "UNLICENSED" | "FREE" | "PAID";
}
/** A metric that provides insight into the active licence details */
export interface LicenseMetric {
  /** The key of a specific license metric. */
  key?: string;
  /**
   * The calculated value of a licence metric linked to the key. An example licence
   * metric is the approximate number of user accounts.
   */
  value?: string;
}
