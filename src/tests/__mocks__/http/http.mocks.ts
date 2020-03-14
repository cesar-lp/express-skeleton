const mockRequest = (opts?: any) => {
  const req: any = {};

  if (opts && Object.keys(opts).length > 0 && opts.constructor === Object) {
    Object.keys(opts).forEach(key => (req[key] = opts[key]));
  }

  return req;
};

const mockResponse = () => {
  const res: any = {};
  const properties = ['send', 'status', 'json'];
  properties.forEach(prop => (res[prop] = jest.fn().mockReturnValue(res)));
  return res;
};

const mockNextFunction = () => {
  return jest.fn(() => {
    return;
  });
};

export { mockRequest, mockResponse, mockNextFunction };
