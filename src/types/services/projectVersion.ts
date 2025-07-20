export type ProjectVersion = {
  archived: boolean;
  description: string;
  id: string;
  name: string;
  overdue: boolean;
  projectId: number;
  releaseDate?: number;
  releaseDateSet: boolean;
  released: boolean;
  self: string;
  startDateSet: boolean;
  userReleaseDate?: string;
  issuesStatusForFixVersion?: IssuesStatusForFixVersion;
};

export type IssuesStatusForFixVersion = {
  done: number;
  inProgress: number;
  toDo: number;
  unmapped: number;
};
