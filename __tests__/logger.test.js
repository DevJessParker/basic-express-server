const logger = require('../src/middleware/logger.js');

describe('LOGGER MW:', () => {

  let consoleSpy;

  let req = {};
  let res = {};
  let next = jest.fn();

  
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  })

  afterEach(() => {
    consoleSpy.mockRestore();
  })

  it('should log worked', () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  })
})