import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Dietician } from 'src/app/core/models/dietician.model';
import { StoreService } from 'src/app/core/services/store/store.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './../../app.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    user: this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  });

  error: string = '';

  constructor(
    public formBuilder: FormBuilder,
    public storeService: StoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.detectFormChanges();
  }

  login() {
    this.storeService.login().subscribe(
      loggedDietician => this.setAndRedirect(loggedDietician), ()=> this.error = 'User name or Password is Incorrect');
  }

  detectFormChanges(): void {
    this.loginForm.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((formValue)=> this.storeService.dietician$.next(formValue))
    )
    .subscribe();
  }

  setAndRedirect(dietician: Dietician) {
    this.storeService.dietician$.next(dietician);
    localStorage.setItem('dieticianId', dietician.user._id);
    this.router.navigateByUrl(`/dashboard`);
  }

}
