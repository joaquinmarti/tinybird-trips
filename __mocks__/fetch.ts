global.fetch = (url, options) => {
  return new Promise((resolve) => {
    resolve({
      json: () => {
        return { mocked: true };
      },
      text: () => {
        return {};
      },
    } as unknown as Response);
  });
}