import { CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginActivate implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        Observable<boolean>|Promise<boolean>|boolean {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    return true;
  }

}
