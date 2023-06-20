import { HttpException, HttpStatus, ValidationError } from "@nestjs/common";

export function ConvertToFieldErrors(validationErrors: Array<ValidationError>) {
  const fieldErrors = new Map<string, Set<string>>();

  for (const validationError of validationErrors) {
    const fieldName = validationError.property;
    const messages = new Set<string>();

    for (const [, v] of Object.entries(validationError.constraints)) {
      messages.add(v);
    }

    fieldErrors.set(fieldName, messages);
  }

  return fieldErrors;
}

export function ConvertFieldErrorsToHttpException(fieldErrors: ReturnType<typeof ConvertToFieldErrors>): HttpException {
  const serializableFieldErrors = Array.from(fieldErrors).map(([k, v]) => ({
    field: k,
    messages: Array.from(v)
  }));

  return new HttpException(
    {
      fieldErrors: serializableFieldErrors
    },
    HttpStatus.BAD_REQUEST
  );
}