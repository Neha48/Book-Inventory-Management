import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,state: RouterStateSnapshot):
     Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.isLoggedIn())
        return true;
      this.router.navigate(['/login']);
      return false;
  }
  isLoggedIn(){
    let st=false;
    if(localStorage.getItem("isLoggedIn")=="true")
      st=true;
    else
      st=false;
    return st;
  }
}
