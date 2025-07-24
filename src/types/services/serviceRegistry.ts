export interface ServiceRegistry extends Record<string, unknown> {
  /** service description */
  description?: string | null;
  /** service ID */
  id?: string;
  /** service name */
  name?: string;
  /** organization ID */
  organizationId?: string;
  /** service revision */
  revision?: string;
  serviceTier?: ServiceRegistryTier;
}
export interface ServiceRegistryTier extends Record<string, unknown> {
  /** tier description */
  description?: string | null;
  /** tier ID */
  id?: string;
  /** tier level */
  level?: number;
  /** tier name */
  name?: string | null;
  /**
   * name key of the tier
   *
   * @example
   * service-registry.tier1.name
   */
  nameKey?: string;
}
