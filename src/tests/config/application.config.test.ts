import dotenv from 'dotenv';
import { load } from '../../main/config/application.config';
import configMocks from '../__mocks__/config/application.config.mock';

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

beforeEach(() => jest.resetAllMocks());

describe('Application config', () => {
  it('should use environment values', async () => {
    const expectedConfig = configMocks.mockApplicationConfig();
    const actualConfig = await load();

    expect(dotenv.config).toBeCalledTimes(1);
    expect(actualConfig).toEqual(expectedConfig);
  });

  it('should use default values', async () => {
    delete process.env.APP_PORT;
    delete process.env.APP_ENV;

    const expectedConfig = configMocks.mockDefaultConfig();
    const actualConfig = await load();

    expect(dotenv.config).toBeCalledTimes(1);
    expect(actualConfig).toEqual(expectedConfig);
  });
});
