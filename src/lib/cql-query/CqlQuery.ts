/**
 * CQL (Contextual Query Language) Query Builder
 * Utility class for building and encoding CQL query strings
 */

/**
 * Encodes a string value for use in CQL queries
 * Escapes special characters that have meaning in CQL
 */
function cqlEncode(value: string): string {
  if (!value) return '';

  return value
    .replace(/\\/g, '\\\\')  // Escape backslashes
    .replace(/"/g, '\\"')    // Escape quotes
    .replace(/\*/g, '\\*')   // Escape wildcards
    .replace(/\?/g, '\\?')   // Escape question marks
    .replace(/\^/g, '\\^');  // Escape carets
}

/**
 * CQL Query builder class
 */
export class CqlQuery {
  private readonly query: string;

  private constructor(query: string) {
    this.query = query;
  }

  /**
   * Creates a CqlQuery for an exact match on the given parameter and value
   */
  static exactMatch(param: string, value: string): string {
    return CqlQuery.exactMatchQuery(param, value).toText();
  }

  /**
   * Builds a CQL query string for matching a specific field with exact value
   * and combining with other conditions
   */
  static createComplexQuery(
    fieldMatches: Array<{ field: string; value: string }>,
    anyMatches?: Array<{ field: string; values: string[] }>
  ): string {
    if (!fieldMatches || fieldMatches.length === 0) {
      throw new Error('At least one field match is required');
    }

    let query = CqlQuery.exactMatchQuery(fieldMatches[0].field, fieldMatches[0].value);

    // Add remaining exact matches
    for (let i = 1; i < fieldMatches.length; i++) {
      query = query.and(
        CqlQuery.exactMatchQuery(fieldMatches[i].field, fieldMatches[i].value),
        true
      );
    }

    // Add any matches
    if (anyMatches && anyMatches.length > 0) {
      for (const anyMatch of anyMatches) {
        query = query.and(
          CqlQuery.exactMatchAnyQuery(anyMatch.field, anyMatch.values),
          true
        );
      }
    }

    return query.toText();
  }

  /**
   * Combines this CqlQuery with another using an AND operation
   */
  and(query: CqlQuery, simplifiedJoin: boolean = false): CqlQuery {
    if (simplifiedJoin) {
      return new CqlQuery(`${this.query} and ${query.query}`);
    }
    return new CqlQuery(`(${this.query}) and (${query.query})`);
  }

  /**
   * Combines this CqlQuery with another using an OR operation
   */
  or(query: CqlQuery, simplifiedJoin: boolean = false): CqlQuery {
    if (simplifiedJoin) {
      return new CqlQuery(`${this.query} or ${query.query}`);
    }
    return new CqlQuery(`(${this.query}) or (${query.query})`);
  }

  /**
   * Returns the encoded CQL query string representation
   */
  toText(): string {
    return this.query;
  }

  /**
   * Returns the raw (unencoded) CQL query string
   */
  toString(): string {
    return this.query;
  }

  /**
   * Creates a CqlQuery for an exact match
   */
  private static exactMatchQuery(param: string, value: string): CqlQuery {
    return new CqlQuery(`${param}==${cqlEncode(value)}`);
  }

  /**
   * Creates a CqlQuery for matching any of the provided values
   */
  private static exactMatchAnyQuery(param: string, values: string[]): CqlQuery {
    if (!values || values.length === 0) {
      throw new Error('At least one value is required for exactMatchAny query');
    }

    const encodedValues = values
      .filter((v) => v !== null && v !== undefined && v !== '')
      .map((v) => cqlEncode(v))
      .join(' or ');

    return new CqlQuery(`${param}==(${encodedValues})`);
  }

  /**
   * Creates a CqlQuery for matching any of the provided values with custom mapper
   */
  static exactMatchAny<T>(
    param: string,
    values: T[],
    mapper: (value: T) => string
  ): CqlQuery {
    const stringValues = values
      .filter((v) => v !== null && v !== undefined)
      .map(mapper);

    return CqlQuery.exactMatchAnyQuery(param, stringValues);
  }

  /**
   * Creates a CqlQuery for a "contains" match (searches for substring)
   */
  static contains(param: string, value: string): string {
    return new CqlQuery(`${param}=*${cqlEncode(value)}*`).toText();
  }

  /**
   * Creates a CqlQuery for a "starts with" match
   */
  static startsWith(param: string, value: string): string {
    return new CqlQuery(`${param}=${cqlEncode(value)}*`).toText();
  }

  /**
   * Creates a CqlQuery for a "not equal" match
   */
  static notEqual(param: string, value: string): string {
    return new CqlQuery(`${param}<>${cqlEncode(value)}`).toText();
  }

  /**
   * Creates a CqlQuery for comparison operations
   */
  static comparison(param: string, operator: '>' | '>=' | '<' | '<=', value: string | number): string {
    return new CqlQuery(`${param}${operator}${value}`).toText();
  }

  /**
   * Creates a CqlQuery that matches all records (no filter)
   */
  static matchAll(): string {
    return new CqlQuery('cql.allRecords==1').toText();
  }
}

export default CqlQuery;
