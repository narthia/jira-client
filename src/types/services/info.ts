import type { SelfLinkDto, DateDto } from "./common";
export interface SoftwareInfoDto {
  /** REST API URL of the instance. */
  _links?: SelfLinkDto;
  /** Reference of the change set included in the build. */
  buildChangeSet?: string;
  /** Date of the current build. */
  buildDate?: DateDto;
  /** Indicates whether the instance is licensed (true) or not (false). */
  isLicensedForUse?: boolean;
  /** Jira Platform version upon which Service Desk is based. */
  platformVersion?: string;
  /** Jira Service Management version. */
  version?: string;
}