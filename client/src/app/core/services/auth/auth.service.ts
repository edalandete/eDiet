import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HelperService } from 'src/app/helper/services.helper';
import { environment } from 'src/environments/environment';
import { Dietician } from '../../models/dietician.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = environment.loginUrl
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private route: Router) { }

  login(dietician: Dietician): Observable<Dietician>{
    return this.http.post<Dietician>(`${this.loginUrl}`, { email: dietician.user.email, password: dietician.user.password }, this.httpOptions);
  }

  canActivate():boolean {
    if(localStorage.getItem('dieticianId')) {
      return true;
    }
    this.route.navigate(['/']);
    return false;
  }
}
