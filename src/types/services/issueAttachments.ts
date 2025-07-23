import type { UserDetails, User, ApplicationRole, GroupName } from "./common";
/** Details about an attachment. */
export interface Attachment extends Record<string, unknown> {
  /** Details of the user who added the attachment. */
  author?: UserDetails;
  /** The content of the attachment. */
  content?: string;
  /** The datetime the attachment was created. */
  created?: string;
  /** The file name of the attachment. */
  filename?: string;
  /** The ID of the attachment. */
  id?: string;
  /** The MIME type of the attachment. */
  mimeType?: string;
  /** The URL of the attachment details response. */
  self?: string;
  /** The size of the attachment. */
  size?: number;
  /** The URL of a thumbnail representing the attachment. */
  thumbnail?: string;
}
export interface AttachmentArchiveEntry {
  abbreviatedName?: string;
  entryIndex?: number;
  mediaType?: string;
  name?: string;
  size?: number;
}
export interface AttachmentArchiveImpl {
  /** The list of the items included in the archive. */
  entries?: AttachmentArchiveEntry[];
  /** The number of items in the archive. */
  totalEntryCount?: number;
}
/** Metadata for an item in an attachment archive. */
export interface AttachmentArchiveItemReadable {
  /** The position of the item within the archive. */
  index?: number;
  /** The label for the archive item. */
  label?: string;
  /** The MIME type of the archive item. */
  mediaType?: string;
  /** The path of the archive item. */
  path?: string;
  /** The size of the archive item. */
  size?: string;
}
/** Metadata for an archive (for example a zip) and its contents. */
export interface AttachmentArchiveMetadataReadable {
  /** The list of the items included in the archive. */
  entries?: AttachmentArchiveItemReadable[];
  /** The ID of the attachment. */
  id?: number;
  /** The MIME type of the attachment. */
  mediaType?: string;
  /** The name of the archive file. */
  name?: string;
  /** The number of items included in the archive. */
  totalEntryCount?: number;
}
/** Metadata for an issue attachment. */
export interface AttachmentMetadata {
  /** Details of the user who attached the file. */
  author?: User;
  /** The URL of the attachment. */
  content?: string;
  /** The datetime the attachment was created. */
  created?: string;
  /** The name of the attachment file. */
  filename?: string;
  /** The ID of the attachment. */
  id?: number;
  /** The MIME type of the attachment. */
  mimeType?: string;
  /** Additional properties of the attachment. */
  properties?: {
    [key: string]: unknown;
  };
  /** The URL of the attachment metadata details. */
  self?: string;
  /** The size of the attachment. */
  size?: number;
  /** The URL of a thumbnail representing the attachment. */
  thumbnail?: string;
}
/** Details of the instance's attachment settings. */
export interface AttachmentSettings {
  /** Whether the ability to add attachments is enabled. */
  enabled?: boolean;
  /** The maximum size of attachments permitted, in bytes. */
  uploadLimit?: number;
}
export interface ListWrapperCallbackApplicationRole {}
export interface ListWrapperCallbackGroupName {}
export interface MultipartFile {
  bytes?: string[];
  contentType?: string;
  empty?: boolean;
  inputStream?: {
    [key: string]: unknown;
  };
  name?: string;
  originalFilename?: string;
  resource?: Resource;
  size?: number;
}
export interface Resource {
  description?: string;
  file?: Blob | ReadableStream;
  filename?: string;
  inputStream?: {
    [key: string]: unknown;
  };
  open?: boolean;
  readable?: boolean;
  uri?: string;
  url?: string;
}
/** The application roles the user is assigned to. */
export interface SimpleListWrapperApplicationRole {
  callback?: ListWrapperCallbackApplicationRole;
  items?: ApplicationRole[];
  "max-results"?: number;
  pagingCallback?: ListWrapperCallbackApplicationRole;
  size?: number;
}
/** The groups that the user belongs to. */
export interface SimpleListWrapperGroupName {
  callback?: ListWrapperCallbackGroupName;
  items?: GroupName[];
  "max-results"?: number;
  pagingCallback?: ListWrapperCallbackGroupName;
  size?: number;
}
