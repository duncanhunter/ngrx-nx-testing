import { User } from './auth.reducer';
import { authQuery } from './auth.selectors';

describe('Auth Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  let storeState;

  beforeEach(() => {
    storeState = {
      auth: {
        entities: {
          'PRODUCT-BBB': {
            name: 'foo',
            id: 'PRODUCT-BBB'
          }
        },
        ids: ['PRODUCT-BBB'],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Auth Selectors', () => {
    it('getAllAuth() should return the list of Auth', () => {
      const results = authQuery.getAllAuth(storeState);
      const selectedId = 'PRODUCT-BBB';

      expect(results.length).toBe(1);
      expect(selectedId).toBe('PRODUCT-BBB');
    });

    it('getSelectedAuth() should return the selected Entity', () => {
      const result = authQuery.getSelectedAuth(storeState);
      const selectedId = result;
      expect(selectedId).toEqual({ name: 'foo', id: 'PRODUCT-BBB' });
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = authQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = authQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
