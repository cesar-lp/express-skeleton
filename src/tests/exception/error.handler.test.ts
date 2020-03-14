import { ServiceError, ServiceException } from './../../main/exception/error.model';
import { handleError } from '../../main/exception/error.handler';
import exceptionMocks from '../__mocks__/errors/exceptions.mocks';
import { mockRequest, mockResponse } from '../__mocks__/http/http.mocks';
import validationErrorsMocks from '../__mocks__/errors/validation-errors.mocks';

const timestamp = '2020-04-22T15:04:35-00:00';

jest.mock('moment', () => () => ({ format: () => timestamp }));

describe('Error handler', () => {
  it('should handle a ServiceError', () => {
    const req = mockRequest({ baseUrl: '/people', path: '/' });
    const res = mockResponse();
    const exception = new ServiceException(404, 'Error message', '/people');
    const error = new ServiceError(404, 'Error message');

    handleError(error, req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith(exception);
  });

  it('should handle a ValidationException', () => {
    const req = mockRequest();
    const res = mockResponse();
    const exception = exceptionMocks.mockReqBodyValidationException(validationErrorsMocks.mockReqBodyFieldError());

    handleError(exception, req, res);

    expect(res.status).toBeCalledWith(422);
    expect(res.send).toBeCalledWith(exception);
  });

  it('should handle an InternalServerError', () => {
    const req = mockRequest({ baseUrl: '/people', path: '/' });
    const res = mockResponse();
    const error = new Error('Something happened');
    const exc = new ServiceException(500, 'Something happened', '/people');

    handleError(error, req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledWith(exc);
  });
});
