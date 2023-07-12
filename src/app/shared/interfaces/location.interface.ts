export interface IpLocation {
  ip: string; // La dirección IP
  location: { // La ubicación geográfica asociada a la IP
    country: string; // El país
    region: string; // La región
    city: string; // La ciudad
    lat: number; // La latitud
    lng: number; // La longitud
    postalCode: string; // El código postal
    timezone: string; // La zona horaria
    geonameId: number; // El identificador de Geoname
  };
  domains: string[]; // Los dominios asociados a la IP
  as: { // La información del Sistema Autónomo (AS)
    asn: number; // El número del Sistema Autónomo (AS)
    name: string; // El nombre del Sistema Autónomo (AS)
    route: string; // La ruta del Sistema Autónomo (AS)
    domain: string; // El dominio del Sistema Autónomo (AS)
    type: string; // El tipo del Sistema Autónomo (AS)
  };
  isp: string; // El proveedor de servicios de Internet (ISP)
}
