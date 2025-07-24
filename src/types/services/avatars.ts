import type { Avatar } from "./common";
/** Details about system and custom avatars. */
export interface Avatars {
  /** Custom avatars list. */
  custom?: Avatar[];
  /** System avatars list. */
  system?: Avatar[];
}
export interface StreamingResponseBody {}
/** List of system avatars. */
export interface SystemAvatars {
  /** A list of avatar details. */
  system?: Avatar[];
}
