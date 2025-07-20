import type { Comment } from "./comment";
import type { User } from "./user";

export type WorklogResponse = {
  startAt: number;
  maxResults: number;
  total: number;
  worklogs: WorklogsEntity[];
};

export type WorklogsEntity = {
  self: string;
  author: User;
  updateAuthor: User;
  comment: Comment;
  created: string;
  updated: string;
  started: string;
  timeSpent: string;
  timeSpentSeconds: number;
  id: string;
  issueId: string;
};
