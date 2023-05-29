export const READONLY_ERROR = {
  DEPENDENCY_NOT_READONLY: (property: string) =>
    `Dependency "${property}" is not correctly readonly`,
  MODIFY_READONLY: 'Cannot add or modify properties on a readonly object',
  PROPERTY_DOES_NOT_EXIST: (property: string) =>
    `Property "${property}" does not exist on the object`,
} as const
