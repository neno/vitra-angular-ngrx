import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbArtist } from '../shared/artist.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService {
  private baseUrl = '/api/manufacturers';

  constructor(private http: HttpClient) {}

  public findAllManufacturers(): Observable<DbArtist[]> {
    return this.http.get<DbArtist[]>(this.baseUrl);
  }

  public findManufacturerById(id: number): Observable<DbArtist> {
    return this.http.get<DbArtist>(`${this.baseUrl}/${id}`);
  }

  public findFilteredManufacturers(
    filter: string | null
  ): Observable<DbArtist[]> {
    if (!filter) {
      return this.findAllManufacturers();
    }
    const url = `${this.baseUrl}?PerFullText_like=${filter}`;
    return this.http.get<DbArtist[]>(url);
  }
}
