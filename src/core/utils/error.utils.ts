import { ValidationError } from '../types/validation-error.ts';

export const createErrorMessages = (
  errors: ValidationError[],
): { errorMessages: ValidationError[] } => {
  return { errorMessages: errors };
};
