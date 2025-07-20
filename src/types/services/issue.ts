import type { ClientType, JiraRequestGeneric } from "../global";
import type { AvatarUrls } from "./common";
import type { IssueType } from "./issuetype";
import type { BaseStatus } from "./status";
import type { User } from "./user";
import type { WorklogResponse } from "./worklog";

export type Issue = {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: IssueFields;
};

export type IssueFields = {
  statuscategorychangedate: string;
  issuetype: IssueType;
  timespent?: number;
  project: IssueProject;
  resolution?: null;
  resolutiondate?: null;
  workratio: number;
  lastViewed?: null;
  created: string;
  priority: Priority;
  issuelinks: IssueLinks[];
  assignee?: User | null;
  updated: string;
  status: BaseStatus;
  description: Description;
  summary: string;
  creator: User;
  subtasks: Issue[];
  reporter: User;
  duedate?: null;
  aggregatetimeoriginalestimate: number | null;
  aggregatetimeestimate: number | null;
  fixVersions?: FixVersions[];
  worklog: WorklogResponse;
} & { [k: string]: unknown };

export type FixVersions = {
  self: string;
  id: string;
  description: string;
  name: string;
  archived: boolean;
  released: boolean;
};

export type IssueLinks = {
  id: string;
  self: string;
  type: IssueLinkType;
  inwardIssue?: LinkedIssue;
  outwardIssue?: LinkedIssue;
};

export type IssueLinkType = {
  id: string;
  name: string;
  inward: string;
  outward: string;
  self: string;
};

export type LinkedIssue = {
  id: string;
  key: string;
  self: string;
  fields: {
    summary: string;
    status: BaseStatus;
    priority: Priority;
    issuetype: IssueType;
  };
};

export type IssueProject = {
  self: string;
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  simplified: boolean;
  avatarUrls: AvatarUrls;
};

export type Priority = {
  self: string;
  iconUrl: string;
  name: string;
  id: string;
};

export type Description = {
  type: string;
  version: number;
  content?: null[] | null;
};

export type IssueUpdateBody = {
  fields: {
    summary?: string;
    description?: Description;
    issuetype?: {
      id: string;
    };
    assignee?: {
      id: string;
    };
    reporter?: {
      id: string;
    };
    priority?: {
      id: string;
    };
    parent?: {
      id: string;
      key: string;
    };
  } & { [k: string]: unknown };
  update?: IssueUpdate;
  properties?: { key: string; value: unknown }[];
};

export type IssueCreateBody = {
  fields: {
    summary: string;
    description?: Description;
    issuetype: {
      id: string;
    };
    project: {
      id?: string;
      key?: string;
    };
    assignee?: {
      id: string;
    };
    reporter?: {
      id: string;
    };
    priority?: {
      id: string;
    };
    parent?: {
      id: string;
      key: string;
    };
  } & { [k: string]: unknown };
  update?: IssueUpdate;
  properties?: { key: string; value: unknown }[];
};

export type IssueUpdate = Record<
  string,
  {
    add: unknown;
    remove: unknown;
    set: unknown;
    copy: unknown;
    edit: unknown;
  }
>[];

export type IssueSearchBody = {
  expand?: string;
  fields?: string[];
  fieldsByKeys?: boolean;
  jql?: string;
  maxResults?: number;
  nextPageToken?: string;
  properties?: string[];
  reconcileIssues?: number[];
};

export type GetIssueRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  { issueKeyOrId: string },
  {
    fields?: string;
    fieldsByKeys?: boolean;
    expand?: string;
    properties?: string;
    updateHistory?: boolean;
    failfast?: boolean;
  }
>;

export type IssuePickerResponse = {
  sections: {
    id: string;
    issues: {
      id: number;
      img: string;
      key: string;
      keyHtml: string;
      summary: string;
      summaryText: string;
    }[];
    label: string;
    msg: string;
    sub: string;
  }[];
};

export type CreateIssueRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  undefined,
  { updateHistory?: boolean },
  IssueCreateBody
>;

export type EditIssueRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  { issueKeyOrId: string },
  {
    notifyUsers?: boolean;
    overrideScreenSecurity?: boolean;
    overrideEditableFlag?: boolean;
    returnIssue?: boolean;
    expand?: string;
  },
  IssueUpdateBody
>;

export type DeleteIssueRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  { issueKeyOrId: string }
>;

export type CountIssuesRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  undefined,
  undefined,
  { jql: string }
>;

export type SearchIssuesRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  undefined,
  undefined,
  IssueSearchBody
>;

export type AssignIssueRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  { issueKeyOrId: string },
  undefined,
  { accountId?: string; key?: string; name?: string }
>;

export type CheckIssueRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  undefined,
  undefined,
  { issueIds: string[]; jqls: string[] }
>;

export type IssuePickerRequest<TClient extends ClientType> = JiraRequestGeneric<
  TClient,
  undefined,
  {
    query?: string;
    currentJql?: string;
    currentIssueKey?: string;
    currentProjectId?: string;
    showSubTasks?: boolean;
    showSubTaskParent?: boolean;
  },
  undefined
>;
