import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../+state/auth.reducer';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  loadUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('fake-url');
  }
}
