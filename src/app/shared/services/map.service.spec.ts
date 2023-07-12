import { TestBed } from '@angular/core/testing';
import { MapService } from './map.service';

// Mock de la biblioteca Leaflet
jest.mock('leaflet', () => ({
  map: jest.fn().mockReturnThis(),
  tileLayer: jest.fn().mockReturnThis(),
  addTo: jest.fn().mockReturnThis(),
  setView: jest.fn().mockReturnThis(),
  icon: jest.fn().mockReturnThis(),
  marker: jest.fn().mockReturnThis(),
}));

describe('MapService', () => {
  let service: MapService;
  let L: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService);
    L = require('leaflet');
  });

  // Verifica que el servicio se haya creado correctamente

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Verifica que se pueda crear un mapa

  it('should create a map', () => {
    service.createMap('test', {});
    expect(L.map).toHaveBeenCalled();
  });

  // Verifica que se pueda agregar una capa de teselas (tile layer)
  it('should add a tile layer', () => {
    service.addTileLayer();
    expect(L.tileLayer).toHaveBeenCalled();
    expect(L.addTo).toHaveBeenCalled();
  });

  // Verifica que se pueda establecer la vista
  it('should set the view', () => {
    service.createMap('test', {});
    service.setView(0, 0);
    expect(L.setView).toHaveBeenCalled();
  });

  // Verifica que se pueda agregar un marcador
  it('should add a marker', () => {
    service.createMap('test', {});
    const marker = service.addMarker(0, 0);
    expect(L.marker).toHaveBeenCalled();
    expect(L.addTo).toHaveBeenCalled();
    expect(marker).toBeTruthy();
  });
});