import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { IpService } from './shared/services/ip.service';
import { MapService } from './shared/services/map.service';
import { IpLocation } from './shared/interfaces/location.interface';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let ipService: IpService;

  const mockIpLocation: IpLocation = {
    ip: '192.0.2.0',
    location: {
      city: 'Test City',
      region: 'Test Region',
      country: 'TC',
      lat: 0,
      lng: 0,
      timezone: 'UTC',
      postalCode: '00500',
      geonameId: 1,
    },
    isp: 'Test ISP',
    domains: [],
    as: {
      asn: 0,
      name: '',
      route: '',
      domain: '',
      type: '',
    },
  };

  beforeEach(async () => {
    // Configuración inicial para las pruebas
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: IpService,
          useValue: {
            getClientIpAddress: jest.fn(),
            getIpAddressData: jest.fn(),
          },
        },
        {
          provide: MapService,
          useValue: {
            createMap: jest.fn(),
            addTileLayer: jest.fn(),
            setView: jest.fn(),
            addMarker: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    ipService = TestBed.inject(IpService);
  });

  it('should create', () => {
    // Verifica si el componente se crea correctamente
    expect(component).toBeTruthy();
  });

  it('should get client IP address on init', () => {
    // Verifica si se obtiene la dirección IP del cliente al iniciar
    const getClientIpAddressSpy = jest
      .spyOn(ipService, 'getClientIpAddress')
      .mockReturnValue(of('192.0.2.0'));
    const getIpAddressDataSpy = jest
      .spyOn(ipService, 'getIpAddressData')
      .mockReturnValue(of(mockIpLocation));

    component.ngOnInit();

    expect(getClientIpAddressSpy).toHaveBeenCalled();
    expect(getIpAddressDataSpy).toHaveBeenCalledWith('192.0.2.0');
  });

  it('should handle error when getting IP address data', () => {
    // Verifica si se maneja correctamente el error al obtener los datos de la dirección IP
    jest
      .spyOn(ipService, 'getClientIpAddress')
      .mockReturnValue(of('192.0.2.0'));
    const getIpAddressDataSpy = jest
      .spyOn(ipService, 'getIpAddressData')
      .mockReturnValue(throwError('Error'));

    component.ngOnInit();

    expect(getIpAddressDataSpy).toHaveBeenCalledWith('192.0.2.0');
    expect(component.errorMessage).toBe(
      'Error occurred while fetching location data. Try again later'
    );
  });

  it('should get location data for valid IP address input', () => {
    // Verifica si se obtienen los datos de ubicación para una entrada de dirección IP válida
    const getIpAddressDataSpy = jest
      .spyOn(ipService, 'getIpAddressData')
      .mockReturnValue(of(mockIpLocation));
    component.inputValue = '192.0.2.0';

    component.getLocation();

    expect(getIpAddressDataSpy).toHaveBeenCalledWith('192.0.2.0');
    expect(component.inputValue).toBe('');
  });

  it('should show error message for invalid IP address input', () => {
    // Verifica si se muestra un mensaje de error para una entrada de dirección IP no válida
    component.inputValue = 'invalid';

    component.getLocation();

    expect(component.errorMessage).toBe('Please, use a valid IPv4 address.');
  });
});
