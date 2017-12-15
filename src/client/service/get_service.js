const services = {};

/**
 * Get service singleton.
 */
export function getService(Service, { baseUri, csrfToken, name }) {
  if (!services[name]) {
    services[name] = new Service(name, {
      baseUri,
      csrfTokenValue: csrfToken
    });
  }
  return services[name];
}

export default getService;
