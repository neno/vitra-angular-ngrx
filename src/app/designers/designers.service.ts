import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbArtist } from '../shared/artist.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignersService {
  private baseUrl = '/api/designers';

  constructor(private http: HttpClient) {}

  findDesignerById(id: number): Observable<DbArtist> {
    return this.http.get<DbArtist>(`${this.baseUrl}/${id}`);
  }

  findAllDesigners(): Observable<DbArtist[]> {
    return this.http.get<DbArtist[]>(this.baseUrl);
  }

  findFilteredProducts(filter: string): Observable<DbArtist[]> {
    if (!filter) {
      return this.findAllDesigners();
    }
    const url = `${this.baseUrl}?PerFullText_like=${filter}`;
    return this.http.get<DbArtist[]>(url);
  }
}
