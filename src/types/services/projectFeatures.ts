/** The list of features on a project. */
export interface ContainerForProjectFeatures {
  /** The project features. */
  features?: ProjectFeature[];
}
/** Details of a project feature. */
export interface ProjectFeature {
  /** The key of the feature. */
  feature?: string;
  /** URI for the image representing the feature. */
  imageUri?: string;
  /** Localized display description for the feature. */
  localisedDescription?: string;
  /** Localized display name for the feature. */
  localisedName?: string;
  /** List of keys of the features required to enable the feature. */
  prerequisites?: string[];
  /** The ID of the project. */
  projectId?: number;
  /**
   * The state of the feature. When updating the state of a feature, only ENABLED
   * and DISABLED are supported. Responses can contain all values
   */
  state?: "ENABLED" | "DISABLED" | "COMING_SOON";
  /** Whether the state of the feature can be updated. */
  toggleLocked?: boolean;
}
/** Details of the feature state. */
export interface ProjectFeatureState {
  /** The feature state. */
  state?: "ENABLED" | "DISABLED" | "COMING_SOON";
}
