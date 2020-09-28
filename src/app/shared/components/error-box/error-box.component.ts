import { Component, Input } from '@angular/core';

@Component({
    selector: 'stm-error-box',
    templateUrl: './error-box.component.html',
    styleUrls: ['./error-box.component.scss']
})
export class ErrorBoxComponent {
    @Input() title = 'An error has occurred.';
    @Input() message = `There was a problem loading this page.`;
    @Input() code = 100;
}
