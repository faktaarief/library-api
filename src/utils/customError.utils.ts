import { MySQL2Error } from '../types/error.types';

const isMySQL2Error = (catchError: unknown): catchError is MySQL2Error => (
  typeof catchError === 'object'
  && catchError !== null
  && 'sqlMessage' in catchError
  && 'code' in catchError
);

const isGeneralError = (catchError: unknown): catchError is Error => (
  typeof catchError === 'object'
  && catchError !== null
  && 'message' in catchError
);

export const repositoryError = (catchError: unknown): Error => {
  let message = 'An unknown error occurred';

  if (isMySQL2Error(catchError)) {
    message = `Database error occurred: ${catchError.sqlMessage}`;
  } else if (isGeneralError(catchError)) {
    message = catchError.message;
  }

  const error = new Error(message);
  error.name = 'RepositoryError';

  return error;
};

export const serviceError = (catchError: unknown): Error => {
  let message = 'An unknown error occurred';

  if (isGeneralError(catchError)) {
    message = catchError.message;
  }

  const error = new Error(message);
  error.name = 'ServiceError';

  return error;
};

export const controllerError = (catchError: unknown) => {
  let message = 'An unknown error occurred';
  let code = 400;

  if (isGeneralError(catchError)) {
    message = catchError.message;
  }

  if (message.includes('Database')) {
    code = 500;
  } else if (message.includes('not found')) {
    code = 404;
  }

  const result = {
    message,
    code,
  };

  return result;
};
