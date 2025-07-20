export type Comment = {
  version: number;
  type: string;
  content?: ContentEntity[] | null;
};

type ContentEntity = {
  type: string;
  content?: ContentEntity1[] | null;
};

type ContentEntity1 = {
  type: string;
  text: string;
  marks?: MarksEntity[] | null;
};

type MarksEntity = {
  type: string;
};
