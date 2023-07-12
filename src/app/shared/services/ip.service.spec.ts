import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IpService } from './ip.service';
import { environment } from '../../../environments/environment';

describe('IpService', () => {
  let service: IpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IpService],
    });

    service = TestBed.inject(IpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes HTTP pendientes
  });

  it('should be created', () => {
    // Verifica que el servicio se haya creado correctamente
    expect(service).toBeTruthy();
  });

  it('should fetch the client IP address', () => {
    // Verifica que se pueda obtener la dirección IP del cliente
    const mockIp = { ip: '123.123.123.123' };

    service.getClientIpAddress().subscribe((ip) => {
      expect(ip).toBe(mockIp.ip);
    });

    const req = httpMock.expectOne('https://api.ipify.org?format=json');
    expect(req.request.method).toBe('GET');
    req.flush(mockIp);
  });

  it('should fetch IP address data', () => {
    // Verifica que se puedan obtener los datos de la dirección IP
    const mockIpData = {
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

    service.getIpAddressData(mockIpData.ip).subscribe((data) => {
      expect(data).toEqual(mockIpData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${mockIpData.ip}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockIpData);
  });
});
