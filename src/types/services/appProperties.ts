/**
 * @example
 * {
 *   "message": "An example message.",
 *   "statusCode": 200
 * }
 */
export interface OperationMessage {
  /** The human-readable message that describes the result. */
  message: string;
  /** The status code of the response. */
  statusCode: number;
}
