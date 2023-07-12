import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IpLocation } from '../interfaces/location.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la dirección IP del cliente.
   * @returns Un observable que emite la dirección IP del cliente.
   */
  getClientIpAddress(): Observable<string> {
    return this.http.get('https://api.ipify.org?format=json').pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((response: any) => {
        return response.ip;
      })
    );
  }

  /**
   * Obtiene los datos de ubicación para la dirección IP especificada.
   * @param ipAddress La dirección IP para la cual obtener los datos de ubicación.
   * @returns Un observable que emite los datos de ubicación.
   */
  getIpAddressData(ipAddress: string): Observable<IpLocation> {
    const url = this.API_URL + ipAddress;

    return this.http.get<IpLocation>(url);
  }
}
