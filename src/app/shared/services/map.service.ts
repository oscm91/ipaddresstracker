import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: L.Map;

  private customMarker = L.icon({
    iconUrl: 'assets/images/icon-location.svg',
    iconSize: [50, 60],
    iconAnchor: [25, 60],
    popupAnchor: [0, 0],
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * Crea el mapa Leaflet.
   * @param elementId El ID del elemento HTML para renderizar el mapa.
   * @param options Las opciones para configurar el mapa.
   */
  createMap(elementId: string, options: L.MapOptions): void {
    this.map = L.map(elementId, options);
  }

  /**
   * Agrega una capa de teselas al mapa.
   * @param url La URL de la capa de teselas.
   * @param options Las opciones para configurar la capa de teselas.
   */
  addTileLayer(
    url = 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png',
    options: L.TileLayerOptions = {
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }
  ): void {
    L.tileLayer(url, options).addTo(this.map);
  }

  /**
   * Establece la vista del mapa a las coordenadas especificadas y al nivel de zoom.
   * @param lat La coordenada de latitud.
   * @param lng La coordenada de longitud.
   * @param zoom El nivel de zoom (por defecto: 16).
   */
  setView(lat: number, lng: number, zoom = 16): void {
    this.map.setView([lat, lng], zoom);
  }

  /**
   * Agrega un marcador al mapa en las coordenadas especificadas.
   * @param lat La coordenada de latitud.
   * @param lng La coordenada de longitud.
   * @param options Las opciones para configurar el marcador (por defecto: usando el icono customMarker).
   * @returns El objeto marcador creado.
   */
  addMarker(
    lat: number,
    lng: number,
    options: L.MarkerOptions = { icon: this.customMarker }
  ): L.Marker {
    const marker = L.marker([lat, lng], options).addTo(this.map);
    return marker;
  }
}
