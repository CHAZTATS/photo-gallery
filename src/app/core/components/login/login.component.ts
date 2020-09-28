import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService, getAuthError, Login } from 'projects/common/auth';
import { State } from 'src/app/state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'stm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  tenant = this.capitalize(environment.auth.connection);
  error: string;

  constructor(private auth: AuthService, private store: Store<State>) { }

  ngOnInit() {
    this.store.pipe(select(getAuthError)).subscribe(
      error => {
        this.error = error;
      }
    );
  }

  login() {
    this.store.dispatch(new Login());
  }

  capitalize(value: string) {
    return !!value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
  }
}
