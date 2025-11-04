import { describe, it, expect } from 'vitest';
import { CqlQuery } from './CqlQuery';

describe('CqlQuery', () => {
  describe('exactMatch', () => {
    it('should create exact match query with simple value', () => {
      const result = CqlQuery.exactMatch('status', 'active');
      expect(decodeURIComponent(result)).toBe('status==active');
    });

    it('should encode special characters', () => {
      const result = CqlQuery.exactMatch('name', 'test*value');
      expect(decodeURIComponent(result)).toBe('name==test\\*value');
    });

    it('should encode quotes', () => {
      const result = CqlQuery.exactMatch('title', 'book "test"');
      expect(decodeURIComponent(result)).toBe('title==book \\"test\\"');
    });

    it('should encode backslashes', () => {
      const result = CqlQuery.exactMatch('path', 'C:\\folder');
      expect(decodeURIComponent(result)).toBe('path==C:\\\\folder');
    });
  });

  describe('contains', () => {
    it('should create contains query', () => {
      const result = CqlQuery.contains('title', 'typescript');
      expect(decodeURIComponent(result)).toBe('title=*typescript*');
    });

    it('should encode special characters in contains query', () => {
      const result = CqlQuery.contains('description', 'test*value');
      expect(decodeURIComponent(result)).toBe('description=*test\\*value*');
    });
  });

  describe('startsWith', () => {
    it('should create starts with query', () => {
      const result = CqlQuery.startsWith('name', 'John');
      expect(decodeURIComponent(result)).toBe('name=John*');
    });

    it('should encode special characters', () => {
      const result = CqlQuery.startsWith('prefix', 'test?');
      expect(decodeURIComponent(result)).toBe('prefix=test\\?*');
    });
  });

  describe('notEqual', () => {
    it('should create not equal query', () => {
      const result = CqlQuery.notEqual('status', 'deleted');
      expect(decodeURIComponent(result)).toBe('status<>deleted');
    });
  });

  describe('comparison', () => {
    it('should create greater than query', () => {
      const result = CqlQuery.comparison('price', '>', 100);
      expect(decodeURIComponent(result)).toBe('price>100');
    });

    it('should create greater than or equal query', () => {
      const result = CqlQuery.comparison('age', '>=', 18);
      expect(decodeURIComponent(result)).toBe('age>=18');
    });

    it('should create less than query', () => {
      const result = CqlQuery.comparison('count', '<', 50);
      expect(decodeURIComponent(result)).toBe('count<50');
    });

    it('should create less than or equal query', () => {
      const result = CqlQuery.comparison('quantity', '<=', 10);
      expect(decodeURIComponent(result)).toBe('quantity<=10');
    });

    it('should work with string values', () => {
      const result = CqlQuery.comparison('date', '>', '2024-01-01');
      expect(decodeURIComponent(result)).toBe('date>2024-01-01');
    });
  });

  describe('matchAll', () => {
    it('should create match all query', () => {
      const result = CqlQuery.matchAll();
      expect(decodeURIComponent(result)).toBe('cql.allRecords=1');
    });
  });

  describe('createComplexQuery', () => {
    it('should create query with single field match', () => {
      const result = CqlQuery.createComplexQuery([
        { field: 'status', value: 'active' }
      ]);
      expect(decodeURIComponent(result)).toBe('status==active');
    });

    it('should create query with multiple field matches', () => {
      const result = CqlQuery.createComplexQuery([
        { field: 'status', value: 'active' },
        { field: 'type', value: 'book' }
      ]);
      expect(decodeURIComponent(result)).toBe('status==active and type==book');
    });

    it('should create query with field matches and any matches', () => {
      const result = CqlQuery.createComplexQuery(
        [
          { field: 'itemId', value: '123' }
        ],
        [
          { field: 'status', values: ['open', 'pending', 'active'] }
        ]
      );
      expect(decodeURIComponent(result)).toBe('itemId==123 and status==(open or pending or active)');
    });

    it('should throw error when no field matches provided', () => {
      expect(() => CqlQuery.createComplexQuery([])).toThrow('At least one field match is required');
    });

    it('should filter empty values in any matches', () => {
      const result = CqlQuery.createComplexQuery(
        [{ field: 'id', value: '1' }],
        [{ field: 'status', values: ['open', '', 'closed'] }]
      );
      expect(decodeURIComponent(result)).toBe('id==1 and status==(open or closed)');
    });
  });

  describe('exactMatchAny', () => {
    it('should create query matching any value', () => {
      const query = CqlQuery.exactMatchAny('status', ['open', 'pending', 'active'], (v) => v);
      expect(decodeURIComponent(query.toText())).toBe('status==(open or pending or active)');
    });

    it('should filter null and undefined values', () => {
      const query = CqlQuery.exactMatchAny(
        'type',
        ['book', null, 'article', undefined],
        (v) => v as string
      );
      expect(decodeURIComponent(query.toText())).toBe('type==(book or article)');
    });

    it('should work with custom mapper', () => {
      interface Item {
        code: string;
      }
      const items: Item[] = [
        { code: 'A' },
        { code: 'B' },
        { code: 'C' }
      ];
      const query = CqlQuery.exactMatchAny('itemCode', items, (item) => item.code);
      expect(decodeURIComponent(query.toText())).toBe('itemCode==(A or B or C)');
    });
  });

  describe('and method', () => {
    it('should combine queries with AND (with parentheses)', () => {
      const query1 = CqlQuery.exactMatchAny('status', ['open'], (v) => v);
      const query2 = CqlQuery.exactMatchAny('type', ['book'], (v) => v);
      const result = query1.and(query2);
      expect(decodeURIComponent(result.toText())).toBe('(status==(open)) and (type==(book))');
    });

    it('should combine queries with AND (simplified)', () => {
      const query1 = CqlQuery.exactMatchAny('status', ['open'], (v) => v);
      const query2 = CqlQuery.exactMatchAny('type', ['book'], (v) => v);
      const result = query1.and(query2, true);
      expect(decodeURIComponent(result.toText())).toBe('status==(open) and type==(book)');
    });
  });

  describe('or method', () => {
    it('should combine queries with OR (with parentheses)', () => {
      const query1 = CqlQuery.exactMatchAny('status', ['open'], (v) => v);
      const query2 = CqlQuery.exactMatchAny('status', ['closed'], (v) => v);
      const result = query1.or(query2);
      expect(decodeURIComponent(result.toText())).toBe('(status==(open)) or (status==(closed))');
    });

    it('should combine queries with OR (simplified)', () => {
      const query1 = CqlQuery.exactMatchAny('status', ['open'], (v) => v);
      const query2 = CqlQuery.exactMatchAny('status', ['closed'], (v) => v);
      const result = query1.or(query2, true);
      expect(decodeURIComponent(result.toText())).toBe('status==(open) or status==(closed)');
    });
  });

  describe('toString', () => {
    it('should return unencoded query string', () => {
      const query = CqlQuery.exactMatchAny('status', ['open'], (v) => v);
      expect(query.toString()).toBe('status==(open)');
    });
  });

  describe('URL encoding', () => {
    it('should properly encode queries for URL', () => {
      const result = CqlQuery.exactMatch('status', 'active');
      // Should be URL encoded
      expect(result).toContain('%3D%3D'); // ==
    });
  });
});
