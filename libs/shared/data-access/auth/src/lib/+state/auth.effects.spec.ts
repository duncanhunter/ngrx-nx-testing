import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Observable, of, throwError } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { AuthEffects } from './auth.effects';
import { loadAuth, fromAuthActions } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { authQuery } from './auth.selectors';

describe('AuthEffects', () => {
  let actions: Observable<any>;
  let effects: AuthEffects;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        AuthEffects,
        { provide: AuthService, useValue: { loadUsers: () => of([]) } },
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore({
          selectors: [
            {
              selector: authQuery.getSelectedId,
              value: 'test-id'
            }
          ]
        })
      ]
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
  });

  describe('loadAuth$', () => {
    it('should work return no items', () => {
      actions = hot('-a-|', { a: fromAuthActions.loadAuth });
      const expected = cold('-a-|', {
        a: fromAuthActions.authLoaded({ users: [] })
      });
      expect(effects.loadAuth$).toBeObservable(expected);
    });

    it('should dispatch error', () => {
      // jest.spyOn(authService, 'loadUsers').mockImplementation(() => throwError({error: 'error'}));
      jest
        .spyOn(authService, 'loadUsers')
        .mockReturnValue(cold('#', null, { error: 'error' }));
      actions = hot('-a-|', { a: fromAuthActions.loadAuth });

      const expected = cold('-a-|', {
        a: fromAuthActions.authLoadError({ error: 'error' })
      });
      expect(effects.loadAuth$).toBeObservable(expected);
    });

    it('should log user id from store in effect', () => {
      const users = [{ id: 'test-id', name: 'test-name' }];

      jest
        .spyOn(authService, 'loadUsers')
        .mockReturnValue(cold('a|', { a: users }));

      actions = hot('-a-|', { a: fromAuthActions.loadAuth });

      const expected = cold('-a-|', {
        a: fromAuthActions.authLoaded({ users })
      });

      expect(effects.loadSelectedUser$).toBeObservable(expected);
    });
  });
});
