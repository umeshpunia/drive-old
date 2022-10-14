import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(private http: HttpClient) {}

  createFolder(val: any) {
    return this.http.post(`${environment.apiUrl}/folder/add-folder`, val);
  }

  getFolders(data: any) {
    return this.http.post(`${environment.apiUrl}/folder/folders`, data);
  }

  getInsideFolder(id: string) {
    return this.http.get(`${environment.apiUrl}/folder/folder/${id}`);
  }
  getInsideFolderFiles(data: any) {
    return this.http.post(`${environment.apiUrl}/folder/folder-files`, data);
  }

  createSubFolder(data: any) {
    return this.http.post(`${environment.apiUrl}/folder/add-sub-folder`, data);
  }
}
