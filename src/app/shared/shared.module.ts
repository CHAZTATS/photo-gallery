import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as comp from './components';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as pipe from './pipes';

@NgModule({
    declarations: [
        comp.SelectionComponent,
        comp.ErrorBoxComponent,

        pipe.CurrencyFormatPipe,
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        comp.SelectionComponent,
        comp.ErrorBoxComponent,
        pipe.CurrencyFormatPipe,
    ],
})
export class SharedModule { }
