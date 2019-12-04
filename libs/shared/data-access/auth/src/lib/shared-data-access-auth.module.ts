import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAuth from './+state/auth.reducer';
import { NxModule } from '@nrwl/angular';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer)
  ]
})
export class SharedDataAccessAuthModule {}
