import type { PagedLinkDto } from "./common";
/** Details of an Assets workspace ID. */
export interface AssetsWorkspaceDto {
  /** The workspace ID used as the identifier to access the Assets REST API. */
  workspaceId?: string;
}
export interface I18nErrorMessage {
  i18nKey?: string;
  parameters?: string[];
}
/** Details of an insight workspace ID. */
export interface InsightWorkspaceDto {
  /** The workspace ID used as the identifier to access the Insight REST API. */
  workspaceId?: string;
}
export interface PagedDtoAssetsWorkspaceDto {
  _expands?: string[];
  /** List of the links relating to the page. */
  _links?: PagedLinkDto;
  /** Indicates if this is the last page of records (true) or not (false). */
  isLastPage?: boolean;
  /**
   * Number of items to be returned per page, up to the maximum set for these
   * objects in the current implementation.
   */
  limit?: number;
  /** Number of items returned in the page. */
  size?: number;
  /** Index of the first item returned in the page. */
  start?: number;
  /** Details of the items included in the page. */
  values?: AssetsWorkspaceDto[];
}
export interface PagedDtoInsightWorkspaceDto {
  _expands?: string[];
  /** List of the links relating to the page. */
  _links?: PagedLinkDto;
  /** Indicates if this is the last page of records (true) or not (false). */
  isLastPage?: boolean;
  /**
   * Number of items to be returned per page, up to the maximum set for these
   * objects in the current implementation.
   */
  limit?: number;
  /** Number of items returned in the page. */
  size?: number;
  /** Index of the first item returned in the page. */
  start?: number;
  /** Details of the items included in the page. */
  values?: InsightWorkspaceDto[];
}