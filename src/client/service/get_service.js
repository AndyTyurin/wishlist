const services = {};

/**
 * Get service singleton.
 */
export function getService(Service, state) {
  const {
    config: { baseUri, csrfToken, services: { search: { name } } }
  } = state;

  if (!services[name]) {
    services[name] = new Service(name, {
      baseUri,
      csrfTokenValue: csrfToken
    });
  }
  return services[name];
}

export default getService;
