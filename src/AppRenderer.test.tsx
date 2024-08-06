import renderer from './AppRenderer';
import { LoginService } from '@ey/mfe-ui-core';

describe('AppRenderer', () => {
  let container: HTMLDivElement;
  let loginServiceInstance: LoginService;
  let generateMSALInstanceSpy: jest.SpyInstance;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);

    loginServiceInstance = new LoginService();
    generateMSALInstanceSpy = jest.spyOn(loginServiceInstance, 'generateMSALInstance');
    generateMSALInstanceSpy.mockReturnValue({
      initialize: jest.fn().mockResolvedValue({})
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should be defined', () => {
    expect(renderer).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof renderer).toBe('function');
  });

  it('should instantiate LoginService', () => {
    renderer();
    expect(generateMSALInstanceSpy).toHaveBeenCalled();
  });
});