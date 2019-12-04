import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { AuthEffects } from './auth.effects';
import { loadAuth, fromAuthActions } from './auth.actions';
import { AuthService } from '../services/auth.service';

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
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
  });

  describe('loadAuth$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: fromAuthActions.loadAuth });
      const expected = hot('-a-|', {
        a: fromAuthActions.authLoaded({ users: [] })
      });
      expect(effects.loadAuth$).toBeObservable(expected);
    });
  });
});
