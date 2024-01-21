import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  private publicRoutes: string[] = ['/offer/pagination/All', '/proj/pagination/All','/offres-et-projets','/offer/All','/proj/All','/rechercher-offres','/rechercher-projets','/offer/{id}'];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isPublicRoute(req.url)) {
      // Skip attaching the authorization header for public routes
      return next.handle(req);
    }

    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && refreshToken) {
          return this.authService.refreshAccessToken().pipe(
            switchMap((response: any) => {
              const newAccessToken = response.access_token;
              const newRefreshToken = response.refresh_token;

              localStorage.setItem('access_token', newAccessToken);
              localStorage.setItem('refresh_token', newRefreshToken);

              const updatedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`
                }
              });
              return next.handle(updatedReq);
            }),
            catchError(() => {
              this.authService.logout();
              return throwError(error);
            })
          );
        }

        return throwError(error);
      })
    );
  }
  private isPublicRoute(url: string): boolean {
    return this.publicRoutes.some(route => url.endsWith(route));
  }
}