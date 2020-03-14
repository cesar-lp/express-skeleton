import expressValidator, { ValidationError } from 'express-validator';
import validateReq from '../../main/middlewares/validator.middleware';
import { mockNextFunction, mockResponse, mockRequest } from '../__mocks__/http/http.mocks';
import {
  mockPathVariableError,
  mockQueryParamError,
  mockReqBodyFieldError,
} from '../__mocks__/errors/validation-errors.mocks';
import {
  mockPathVariableValidationException,
  mockQueryParamValidationException,
  mockReqBodyValidationException,
} from '../__mocks__/errors/exceptions.mocks';

const validationResult = {
  isEmpty: jest.fn(),
  array: jest.fn(),
};

jest.mock('express-validator', () => ({
  validationResult: jest.fn(_req => validationResult),
}));

beforeEach(() => jest.resetAllMocks());

describe('Validation middleware', () => {
  const nextFunction = mockNextFunction();

  it('should call the next function when no errors are found', async done => {
    const req = mockRequest();
    req.baseUrl = '/people';
    req.path = '/';

    ((expressValidator.validationResult as any) as jest.Mock).mockImplementation(_req => validationResult);
    validationResult.isEmpty.mockImplementation(() => true);

    await validateReq(req, mockResponse(), () => {
      return done();
    });

    expect(expressValidator.validationResult).toBeCalledTimes(1);
    expect(expressValidator.validationResult).toBeCalledWith(req);
    expect(expressValidator.validationResult).toReturnWith(validationResult);

    expect(validationResult.isEmpty).toBeCalledTimes(1);
    expect(validationResult.isEmpty).toReturnWith(true);

    expect(nextFunction).toBeCalledTimes(1);
  });

  it('should validate request path variables', () => {
    const req = mockRequest();
    req.baseUrl = '/people';
    req.path = '/';

    const expectedErrors: ValidationError[] = [mockPathVariableError()];
    const expectedException = mockPathVariableValidationException(expectedErrors[0]);

    ((expressValidator.validationResult as any) as jest.Mock).mockImplementation(_req => validationResult);
    validationResult.isEmpty.mockImplementation(() => false);
    validationResult.array.mockImplementation(() => expectedErrors);

    try {
      validateReq(req, mockResponse(), nextFunction);
    } catch (err) {
      expect(err).toEqual(expectedException);
    }

    expect(expressValidator.validationResult).toBeCalledTimes(1);
    expect(expressValidator.validationResult).toBeCalledWith(req);
    expect(expressValidator.validationResult).toReturnWith(validationResult);

    expect(validationResult.isEmpty).toBeCalledTimes(1);
    expect(validationResult.isEmpty).toReturnWith(false);
    expect(validationResult.array).toBeCalledTimes(1);
    expect(validationResult.array).toReturnWith(expectedErrors);

    expect(nextFunction).not.toBeCalled();
  });

  it('should validate request params', () => {
    const req = mockRequest();
    req.baseUrl = '/people';
    req.path = '/';

    const expectedErrors: ValidationError[] = [mockQueryParamError()];
    const expectedException = mockQueryParamValidationException(expectedErrors[0]);

    ((expressValidator.validationResult as any) as jest.Mock).mockImplementation(_req => validationResult);
    validationResult.isEmpty.mockImplementation(() => false);
    validationResult.array.mockImplementation(() => expectedErrors);

    try {
      validateReq(req, mockResponse(), nextFunction);
    } catch (err) {
      expect(err).toEqual(expectedException);
    }

    expect(expressValidator.validationResult).toBeCalledTimes(1);
    expect(expressValidator.validationResult).toBeCalledWith(req);
    expect(expressValidator.validationResult).toReturnWith(validationResult);

    expect(validationResult.isEmpty).toBeCalledTimes(1);
    expect(validationResult.isEmpty).toReturnWith(false);
    expect(validationResult.array).toBeCalledTimes(1);
    expect(validationResult.array).toReturnWith(expectedErrors);

    expect(nextFunction).not.toBeCalled();
  });

  it('should validate request body', () => {
    const req = mockRequest();
    req.baseUrl = '/people';
    req.path = '/';

    const expectedErrors: ValidationError[] = [mockReqBodyFieldError()];
    const expectedException = mockReqBodyValidationException(expectedErrors[0]);

    ((expressValidator.validationResult as any) as jest.Mock).mockImplementation(_req => validationResult);
    validationResult.isEmpty.mockImplementation(() => false);
    validationResult.array.mockImplementation(() => expectedErrors);

    try {
      validateReq(req, mockResponse(), nextFunction);
    } catch (err) {
      expect(err).toEqual(expectedException);
    }

    expect(expressValidator.validationResult).toBeCalledTimes(1);
    expect(expressValidator.validationResult).toBeCalledWith(req);
    expect(expressValidator.validationResult).toReturnWith(validationResult);

    expect(validationResult.isEmpty).toBeCalledTimes(1);
    expect(validationResult.isEmpty).toReturnWith(false);
    expect(validationResult.array).toBeCalledTimes(1);
    expect(validationResult.array).toReturnWith(expectedErrors);

    expect(nextFunction).not.toBeCalled();
  });
});
