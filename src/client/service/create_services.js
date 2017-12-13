import zipObject from 'lodash/zipObject';

export function createServices(services = {}, baseUri, csrfTokenValue) {
  const serviceNames = Object.keys(services);
  return zipObject(
    serviceNames,
    serviceNames.map((serviceName) => {
      const Service = services[serviceName];
      return new Service(serviceName, { baseUri, csrfTokenValue });
    })
  );
}

export default createServices;
