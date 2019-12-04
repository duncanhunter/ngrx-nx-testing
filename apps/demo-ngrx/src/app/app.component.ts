import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { fromAuthActions } from 'libs/shared/data-access/auth/src/lib/+state/auth.actions';

@Component({
  selector: 'ngrx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo-ngrx';

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(fromAuthActions.loadAuth());
  }
}
