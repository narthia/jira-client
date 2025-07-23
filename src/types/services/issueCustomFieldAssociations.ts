/** Field association for example PROJECT\_ID. */
export interface AssociationContextObject {
  identifier?: {
    [key: string]: unknown;
  };
  type: string;
}
/** Details of field associations with projects. */
export interface FieldAssociationsRequest {
  /** Contexts to associate/unassociate the fields with. */
  associationContexts: AssociationContextObject[];
  /** Fields to associate/unassociate with projects. */
  fields: FieldIdentifierObject[];
}
/** Identifier for a field for example FIELD\_ID. */
export interface FieldIdentifierObject {
  identifier?: {
    [key: string]: unknown;
  };
  type: string;
}
