jest.mock('../../events/errorOccurred', () => () => {});

describe('Middleware: Error Handler', () => {
  let reqStub;
  let resStub;
  let errorHandlerMiddleware;
  beforeEach(() => {
    jest.mock('../../util', () => ({
      gracefulShutdown: jest.fn().mockResolvedValue(null),
      env: { isProd: false },
    }));
    reqStub = {
      logger: {
        warn: jest.fn(),
        error: jest.fn(),
      },
      method: 'POST',
      body: {
        someBodyProp: Math.random(),
      },
      params: {
        someParamProp: Math.random(),
      },
      url: 'https://vighnesh153.com',
      app: {},
    };
    resStub = {
      sendStatus: jest.fn(),
    };
    /* eslint-disable global-require */
    errorHandlerMiddleware = require('./errorHandler');
    /* eslint-enable global-require */
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Trusted Errors', () => {
    let errStub;
    beforeEach(() => {
      errStub = {
        isTrusted: true,
        message: 'Doll',
        statusCode: 153,
        stack: 'bla-bla-bla',
      };
    });

    it('should call logger.warn once', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(reqStub.logger.warn).toBeCalledTimes(1);
    });

    it('should call logger.warn with message and stackTrace', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(reqStub.logger.warn).toBeCalledWith({
        message: errStub.message,
        stackTrace: errStub.stack,
      });
    });

    it('should call res.sendStatus once', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(resStub.sendStatus).toBeCalledTimes(1);
    });

    it('should call res.sendStatus with err.statusCode', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(resStub.sendStatus).toBeCalledWith(errStub.statusCode);
    });
  });

  describe('Bad CSRF Token Error', () => {
    let errStub;
    beforeEach(() => {
      errStub = {
        code: 'EBADCSRFTOKEN',
        statusCode: 153,
      };
    });

    it('should call logger.warn once', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(reqStub.logger.warn).toBeCalledTimes(1);
    });

    it('should call logger.warn with message', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(reqStub.logger.warn).toBeCalledWith({
        message: 'Error Bad CSRF Token',
      });
    });

    it('should call res.sendStatus once', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(resStub.sendStatus).toBeCalledTimes(1);
    });

    it('should call res.sendStatus with 400', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(resStub.sendStatus).toBeCalledWith(400);
    });
  });

  describe('Request Body too large', () => {
    let errStub;
    beforeEach(() => {
      errStub = {
        message: 'request entity too large',
      };
    });

    it('should call logger.error once', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(reqStub.logger.error).toBeCalledTimes(1);
    });

    it('should call logger.error with message', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(reqStub.logger.error).toBeCalledWith({
        message: errStub.message,
      });
    });

    it('should call res.sendStatus with 400', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(resStub.sendStatus).toBeCalledWith(400);
    });

    it('should call res.sendStatus once', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(resStub.sendStatus).toBeCalledTimes(1);
    });
  });

  describe('Not-Trusted Errors', () => {
    let errStub;
    beforeEach(() => {
      errStub = {
        message: 'Doll',
        stack: 'Stack Trace',
      };
    });

    it('should call logger.error once', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(reqStub.logger.error).toBeCalledTimes(1);
    });

    it('should call logger.error with message and stackTrace', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(reqStub.logger.error).toBeCalledWith({
        message: errStub.message,
        stackTrace: errStub.stack,
      });
    });

    it('should call res.sendStatus once', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(resStub.sendStatus).toBeCalledTimes(1);
    });

    it('should call res.sendStatus with 500', async () => {
      await errorHandlerMiddleware(errStub, reqStub, resStub, jest.fn());
      expect(resStub.sendStatus).toBeCalledWith(500);
    });
  });
});
