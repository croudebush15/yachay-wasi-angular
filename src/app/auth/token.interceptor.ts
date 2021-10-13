import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    if (req.headers.has('Authorization')) {
        return next.handle(req);
    }

    const authHeader = sessionStorage.getItem("token");
    if (authHeader) {
        // Clone the request to add the new header.
        const authReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }
    return next.handle(req);
 }
}
