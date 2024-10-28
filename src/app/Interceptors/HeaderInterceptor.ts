import {Injectable} from '@angular/core';
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {



    headers: HttpHeaders =  new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Content-Type': 'application/json'
    });

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const reqWithHeader = req.clone({
      headers: this.headers
    });



    // send cloned request with header to the next handler.
    return next.handle(reqWithHeader);
  }
}
