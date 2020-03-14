const mockApplicationConfig = () => {
  return {
    port: 1234,
    environment: 'test',
  };
};

const mockDefaultConfig = () => {
  return {
    port: 4000,
    environment: 'development',
  };
};

export default { mockApplicationConfig, mockDefaultConfig };
