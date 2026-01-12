/**
 * An association type referencing service ID or keys.
 * 
 * @example
 * {
 *   "associationType": "serviceIdOrKeys",
 *   "values": [
 *     "some-service-key"
 *   ]
 * }
 */
export interface ServiceIdOrKeysAssociation extends Record<string, unknown> {
  /**
   * Defines the association type.
   * 
   * @example
   * serviceIdOrKeys
   */
  associationType: "serviceIdOrKeys";
  /**
   * The service ID or keys to associate the entity with.
   * 
   * The number of values counted across all associationTypes must not exceed a
   * limit of 500.
   */
  values: string[];
}