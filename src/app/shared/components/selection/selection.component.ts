import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SelectionItem } from '../../interfaces/selection-item';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'stm-selection',
    templateUrl: './selection.component.html',
    styleUrls: ['./selection.component.scss']
})
export class SelectionComponent {
    @Input() items = new Array<SelectionItem>();
    @Output() selection = new EventEmitter<SelectionItem>();
    constructor(private nav: NavController) { }
    selectionClick = (item: SelectionItem) => {
        this.selection.emit(item);
        this.nav.back();
    }
}
