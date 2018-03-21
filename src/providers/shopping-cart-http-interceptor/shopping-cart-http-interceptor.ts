import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ShoppingCartHttpInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShoppingCartHttpInterceptorProvider implements HttpInterceptor  {
  constructor() {
    console.log('Hello ShoppingCartHttpInterceptorProvider Provider');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
   if (req.responseType == 'json') {
			req = req.clone({ responseType: 'text' });

			return next.handle(req).map(response => {
				if (response instanceof HttpResponse) {
					response = response.clone<any>({ body: JSON.parse(response.body) });
				}

				return response;
			});
		}

		return next.handle(req);
  }
}
