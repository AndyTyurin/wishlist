export function createCustomProperty(validator) {
  const property = validator();
  property.isRequired = validator(true);

  return property;
}

export default createCustomProperty;
