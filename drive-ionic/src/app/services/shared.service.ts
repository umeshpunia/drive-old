import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  isFolderCreated = new BehaviorSubject<boolean>(false);
  isFileUploaded = new BehaviorSubject<boolean>(false);

  constructor() {}
}
