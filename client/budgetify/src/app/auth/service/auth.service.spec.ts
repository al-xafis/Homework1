import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call method setSession upon login success', (done: DoneFn) => {
    spyOn(service as any, 'setSession');
    const expectedResult = {
      token: 'Bearer token',
      expiresIn: 3600000,
    };
    service.login('alhafiz@mail.ru', 'test').subscribe(() => {
      expect((service as any).setSession).toHaveBeenCalledOnceWith(
        expectedResult
      );
      done();
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: 'http://localhost:3000/login',
    });
    req.flush(expectedResult);
  });

  it('should return true if user is logged in', () => {
    spyOn(window.localStorage['__proto__'], 'getItem');
    let expire = Date.now() + 3600000000;
    localStorage.setItem('expiresIn', String(expire));
    expect(service.isLoggedIn()).toBeTruthy;
    expect(localStorage.getItem).toHaveBeenCalledWith('expiresIn');
  });

  it('should return false if user is not logged in', () => {
    spyOn(window.localStorage['__proto__'], 'getItem');
    expect(service.isLoggedIn()).toBeFalsy;
    expect(localStorage.getItem).toHaveBeenCalledWith('expiresIn');
  });

  it('should clear localstorage upon logout', () => {
    spyOn(window.localStorage['__proto__'], 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('expiresIn');
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    expect(localStorage.removeItem).toHaveBeenCalledWith('idToken');
  });

  it('should fill local storage upon setSession', () => {
    spyOn(window.localStorage['__proto__'], 'setItem');
    const expectedResult = {
      token: 'Bearer token',
      expiresIn: 3600000,
    };
    (service as any).setSession(expectedResult);
    expect(localStorage.getItem('expiresIn')).toBeGreaterThan(
      Number(Date.now() + expectedResult.expiresIn)
    );
    expect(localStorage.getItem('idToken')).toEqual(expectedResult.token);
  });
});
