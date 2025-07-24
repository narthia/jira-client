/** Jql function precomputation. */
export interface JqlFunctionPrecomputationBean {
  /** The list of arguments function was invoked with. */
  arguments?: string[];
  /** The timestamp of the precomputation creation. */
  created?: string;
  /** The error message to be displayed to the user. */
  error?: string;
  /** The field the function was executed against. */
  field?: string;
  /** The function key. */
  functionKey?: string;
  /** The name of the function. */
  functionName?: string;
  /** The id of the precomputation. */
  id?: string;
  /** The operator in context of which function was executed. */
  operator?: string;
  /** The timestamp of the precomputation last update. */
  updated?: string;
  /** The timestamp of the precomputation last usage. */
  used?: string;
  /** The JQL fragment stored as the precomputation. */
  value?: string;
}
/** Request to fetch precomputations by ID. */
export interface JqlFunctionPrecomputationGetByIdRequest {
  precomputationIDs?: string[];
}
/** Get precomputations by ID response. */
export interface JqlFunctionPrecomputationGetByIdResponse {
  /** List of precomputations that were not found. */
  notFoundPrecomputationIDs?: string[];
  /** The list of precomputations. */
  precomputations?: JqlFunctionPrecomputationBean[];
}
/** Precomputation id and its new value. */
export interface JqlFunctionPrecomputationUpdateBean {
  /**
   * The error message to be displayed to the user if the given function clause is
   * no longer valid during recalculation of the precomputation.
   */
  error?: string;
  /** The id of the precomputation to update. */
  id: string;
  /** The new value of the precomputation. */
  value?: string;
}
/** Error response returned updating JQL Function precomputations fails. */
export interface JqlFunctionPrecomputationUpdateErrorResponse {
  /** The list of error messages produced by this operation. */
  errorMessages?: string[];
  /** List of precomputations that were not found. */
  notFoundPrecomputationIDs?: string[];
}
/** List of pairs (id and value) for precomputation updates. */
export interface JqlFunctionPrecomputationUpdateRequestBean {
  values?: JqlFunctionPrecomputationUpdateBean[];
}
/** Result of updating JQL Function precomputations. */
export interface JqlFunctionPrecomputationUpdateResponse {
  /**
   * List of precomputations that were not found and skipped. Only returned if the
   * request passed skipNotFoundPrecomputations=true.
   */
  notFoundPrecomputationIDs?: string[];
}
/** A page of items. */
export interface PageBean2JqlFunctionPrecomputationBean {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: JqlFunctionPrecomputationBean[];
}
