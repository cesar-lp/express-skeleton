import { ErrorFactory, ValidationException, ServiceException, ServiceError } from '../../main/exception/error.model';

const timestamp = '2020-04-22T15:04:35-00:00';

jest.mock('moment', () => () => ({ format: () => timestamp }));

beforeEach(() => jest.clearAllMocks());

describe('Exception', () => {
  describe('ErrorFactory', () => {
    it('should create a path variable error', () => {
      let err = ErrorFactory.pathVariableError('id', 'Must be positive', -1);
      expect(err.pathVariableName).toEqual('id');
      expect(err.error).toEqual('Must be positive');
      expect(err.invalidValue).toEqual(-1);

      err = ErrorFactory.pathVariableError('id', 'Must be defined', undefined);
      expect(err.pathVariableName).toEqual('id');
      expect(err.error).toEqual('Must be defined');
      expect(err.invalidValue).toEqual(null);
    });

    it('should create a query param error', () => {
      let err = ErrorFactory.queryParamError('limit', 'Must be positive', -1);
      expect(err.paramName).toEqual('limit');
      expect(err.error).toEqual('Must be positive');
      expect(err.invalidValue).toEqual(-1);

      err = ErrorFactory.queryParamError('limit', 'Must be defined', undefined);
      expect(err.paramName).toEqual('limit');
      expect(err.error).toEqual('Must be defined');
      expect(err.invalidValue).toEqual(null);
    });

    it('should create a request body field error', () => {
      let err = ErrorFactory.requestBodyError('location', 'Must be positive', -1);
      expect(err.fieldName).toEqual('location');
      expect(err.error).toEqual('Must be positive');
      expect(err.invalidValue).toEqual(-1);

      err = ErrorFactory.requestBodyError('location', 'Must be defined', undefined);
      expect(err.fieldName).toEqual('location');
      expect(err.error).toEqual('Must be defined');
      expect(err.invalidValue).toEqual(null);
    });
  });

  describe('ServiceException', () => {
    it('should create a "Bad Request" service exception', () => {
      const exc = new ServiceException(400, 'Error message', '/people');
      expect(exc.error).toEqual('Bad Request');
      expect(exc.statusCode).toEqual(400);
      expect(exc.message).toEqual('Error message');
      expect(exc.timestamp).toEqual(timestamp);
    });

    it('should create a "Unauthorized" service exception', () => {
      const exc = new ServiceException(401, 'Error message', '/people');
      expect(exc.error).toEqual('Unauthorized');
      expect(exc.statusCode).toEqual(401);
      expect(exc.message).toEqual('Error message');
      expect(exc.timestamp).toEqual(timestamp);
    });

    it('should create a "Resource Not Found" service exception', () => {
      const exc = new ServiceException(404, 'Error message', '/people');
      expect(exc.error).toEqual('Resource Not Found');
      expect(exc.statusCode).toEqual(404);
      expect(exc.message).toEqual('Error message');
      expect(exc.timestamp).toEqual(timestamp);
    });

    it('should create a "Validation Error" service exception', () => {
      const exc = new ServiceException(422, 'Error message', '/people');
      expect(exc.error).toEqual('Validation Error');
      expect(exc.statusCode).toEqual(422);
      expect(exc.message).toEqual('Error message');
      expect(exc.timestamp).toEqual(timestamp);
    });

    it('should create a "Internal Server Error" service exception', () => {
      const exc = new ServiceException(500, 'Error message', '/people');
      expect(exc.error).toEqual('Internal Server Error');
      expect(exc.statusCode).toEqual(500);
      expect(exc.message).toEqual('Error message');
      expect(exc.timestamp).toEqual(timestamp);
    });
  });

  describe('ValidationException', () => {
    const errors = [ErrorFactory.requestBodyError('location', 'Must be positive', -1)];

    it('should create a ValidationException', () => {
      const exc = new ValidationException(errors, '/people');

      expect(exc.error).toEqual('Validation Error');
      expect(exc.statusCode).toEqual(422);
      expect(exc.message).toEqual("Request body isn't complete or contains invalid fields");
      expect(exc.errors).toEqual(errors);
      expect(exc.timestamp).toEqual(timestamp);
    });

    it('should create a ValidationException with a given status code and error message', () => {
      const exc = new ValidationException(errors, '/people', 400, 'Invalid request params');

      expect(exc.error).toEqual('Bad Request');
      expect(exc.statusCode).toEqual(400);
      expect(exc.message).toEqual('Invalid request params');
      expect(exc.errors).toEqual(errors);
      expect(exc.timestamp).toEqual(timestamp);
    });
  });

  describe('ServiceError', () => {
    it('should create a ServiceError', () => {
      const err = new ServiceError(404, 'Error message');
      expect(err.statusCode).toEqual(404);
      expect(err.message).toEqual('Error message');
    });
  });
});
