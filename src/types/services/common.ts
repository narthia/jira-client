export type AvatarUrls = {
  "48x48": string;
  "24x24": string;
  "16x16": string;
  "32x32": string;
};

export type Project = {
  expand: string;
  self: string;
  id: string;
  key: string;
  name: string;
  avatarUrls: AvatarUrls;
  projectTypeKey: string;
  simplified: boolean;
  style: string;
  isPrivate: boolean;
  properties: object;
  archived?: boolean;
};
