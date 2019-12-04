import { AuthState, User, initialState, reducer } from './auth.reducer';
import { fromAuthActions } from './auth.actions';

describe('Auth Reducer', () => {
  const getAuthId = it => it['id'];
  let createAuth;

  beforeEach(() => {
    createAuth = (id: string, name = ''): User => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Auth actions ', () => {
    it('should return set the list of known Auth', () => {
      const users: User[] = [
        createAuth('PRODUCT-AAA'),
        createAuth('PRODUCT-zzz')
      ];
      const action = fromAuthActions.authLoaded({ users });
      const result: AuthState = reducer(initialState, action);
      const selId: string = getAuthId(result.entities[users[1].id]);

      expect(result.loaded).toBe(true);
      expect(Object.keys(result.entities).length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
