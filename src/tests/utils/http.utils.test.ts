import { extractRequestUrl } from '../../main/utils/http.utils';
import { mockRequest } from '../__mocks__/http/http.mocks';

describe('HTTP utils', () => {
  it('should extract request url from request', () => {
    let req = mockRequest({ baseUrl: '/people', path: '/active' });
    let requestUrl = extractRequestUrl(req);
    expect(requestUrl).toEqual('/people/active');

    req = mockRequest({ baseUrl: '/people', path: '/' });
    requestUrl = extractRequestUrl(req);
    expect(requestUrl).toEqual('/people');
  });
});
