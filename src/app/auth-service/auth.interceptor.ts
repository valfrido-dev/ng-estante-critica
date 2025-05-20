import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let modifiedReq = req;
  console.log('Intecept Request ', req);
  if (sessionStorage.getItem('token') !== undefined &&
                sessionStorage.getItem('token') !== null &&
                        sessionStorage.getItem('token')?.trim() !== '') {
      let authToken: string = sessionStorage.getItem('token')!;
      console.log('Intecept Request token', authToken);
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: authToken
        }
      });
  }
  return next(modifiedReq);
};
