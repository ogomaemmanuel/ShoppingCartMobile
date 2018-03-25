import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import{Storage} from '@ionic/storage';
import 'rxjs/add/operator/mergeMap';
import { User } from '@firebase/auth-types';

/*
  Generated class for the ShoppingCartHttpInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShoppingCartHttpInterceptorProvider implements HttpInterceptor  {
  constructor(private storage:Storage) {
    console.log('Hello ShoppingCartHttpInterceptorProvider Provider');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
  
  

   return Observable.fromPromise(this.storage.get("loggedInUserDetails")).mergeMap((userDetails:any)=>{
     console.log("User at Interceptor",userDetails);
     if (req.responseType == 'json') {
      req = req.clone({ responseType: 'text',
      setHeaders: {  
        Authorization: "Bearer "+JSON.parse(userDetails).stsTokenManager.accessToken 
       }  
     });

			return next.handle(req).map(response => {
				if (response instanceof HttpResponse) {
					response = response.clone<any>({ body: JSON.parse(response.body) });
				}
				return response;
			});
		}

		return next.handle(req);
    })
   
  }
}
