import { Component, OnInit } from '@angular/core';
import { AuthService } from 'projects/common/auth';

@Component({
    selector: 'stm-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

    constructor(
        private auth: AuthService
    ) { }

    ngOnInit() {
        this.auth.handleAuthCallback();
    }

}
