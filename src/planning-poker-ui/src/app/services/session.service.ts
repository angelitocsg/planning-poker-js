import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  createSession(ownerName: string) {
    throw new Error('Method not implemented.');
  }
}
