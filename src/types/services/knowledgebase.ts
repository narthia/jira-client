export interface ArticleDto {
  content?: ContentDto;
  /** Excerpt of the article which matches the given query string. */
  excerpt?: string;
  /** Source of the article. */
  source?: SourceDto;
  /** Title of the article. */
  title?: string;
}
export interface ContentDto {
  /**
   * Url containing the body of the article (without title), suitable for rendering
   * in an iframe
   */
  iframeSrc?: string;
}
/** Source of the article. */
export interface SourceDto extends Record<string, unknown> {
  /** Type of the knowledge base source */
  type?: "confluence";
}