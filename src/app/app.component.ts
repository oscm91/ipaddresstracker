import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IpService } from './shared/services/ip.service';
import { MapService } from './shared/services/map.service';

import { IpLocation } from './shared/interfaces/location.interface';

@Component({
  selector: 'ipaddresstracker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public inputValue = '';
  // Expresión regular para validar una dirección IPv4
  private ipV4AdressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/gm;

  private clientIpAddress = '';
  private firstLogin = true;

  // Datos de la ubicación obtenidos a partir de la dirección IP
  public locationData: IpLocation | undefined;
  public errorMessage = '';

  // Subject para manejar la desuscripción de observables
  private unsubscribe$ = new Subject<void>();

  constructor(private ipService: IpService, private mapService: MapService) {}

  ngOnInit(): void {
    // Crear el mapa y añadir la capa de teselas al iniciar el componente
    this.mapService.createMap('map', { zoomControl: false });
    this.mapService.addTileLayer();
    // Obtener la dirección IP del cliente
    this.getClientIpAddress();
  }

  ngOnDestroy(): void {
    // Desuscribirse de todos los observables al destruir el componente
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Método para obtener la dirección IP del cliente
  private getClientIpAddress(): void {
    this.ipService.getClientIpAddress().pipe(takeUntil(this.unsubscribe$)).subscribe((clientIp: string) => {
      this.clientIpAddress = clientIp;
      if (this.clientIpAddress) {
        // Si se obtuvo una dirección IP, buscar los datos de la ubicación
        this.getIpAddressData(this.clientIpAddress);
      }
    });
  }

  // Método para obtener los datos de la ubicación a partir de una dirección IP
  private getIpAddressData(ipAddress: string): void {
    this.ipService.getIpAddressData(ipAddress).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (response: IpLocation) => {
        this.locationData = response;
        if (this.locationData.location) {
          // Si se obtuvieron datos de la ubicación, actualizar la vista del mapa
          this.setMapView(
            this.locationData.location.lat,
            this.locationData.location.lng
          );
        }
      },
      () => {
        // En caso de error, mostrar un mensaje
        this.errorMessage =
          'Error occurred while fetching location data. Try again later';
      }
    );
  }

  // Método para actualizar la vista del mapa
  private setMapView(x: number, y: number): void {
    this.mapService.setView(x, y);

    if (this.firstLogin) {
      // Si es el primer inicio de sesión, añadir un marcador y abrir un popup
      this.mapService.addMarker(x, y).bindPopup('Your location').openPopup();
      this.firstLogin = false;
    } else {
      // Si no es el primer inicio de sesión, solo añadir un marcador
      this.mapService.addMarker(x, y);
    }
  }

  // Método para obtener la ubicación a partir de la dirección IP ingresada por el usuario
  public getLocation(): void {
    if (this.inputValue.trim() && this.inputValue.match(this.ipV4AdressRegex)) {
      // Si la entrada es una dirección IP válida, buscar los datos de la ubicación
      this.getIpAddressData(this.inputValue);
      this.inputValue = '';
    } else {
      // Si la entrada no es válida, mostrar un mensaje de error
      this.errorMessage = 'Please, use a valid IPv4 address.';
    }
  }
}
