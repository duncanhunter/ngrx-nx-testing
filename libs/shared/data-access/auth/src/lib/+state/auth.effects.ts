import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { fromAuthActions } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { Store, select, Action } from '@ngrx/store';
import { authQuery } from './auth.selectors';
import { User } from './auth.reducer';

@Injectable()
export class AuthEffects {
  loadAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.loadAuth),
      mergeMap(() =>
        this.authService.loadUsers().pipe(
          map(users => fromAuthActions.authLoaded({ users })),
          catchError(error => of(fromAuthActions.authLoadError(error)))
        )
      )
    )
  );

  loadSelectedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.loadAuth),
      withLatestFrom(this.store.pipe(select(authQuery.getSelectedId))),
      tap(([action, selectedUserId]: [Action, string]) => console.log('selectedUserId', selectedUserId)),
      mergeMap(([action, selectedUserId]: [Action, string]) => {
        console.log('-----selectedUserId-----',  selectedUserId);//?
        return this.authService.loadUsers().pipe(
          map(users => fromAuthActions.authLoaded({ users })),
          catchError(error => of(fromAuthActions.authLoadError(error)))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<any>
  ) {}
}
