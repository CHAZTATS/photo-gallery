import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
    providedIn: 'root'
})

export class SnackbarService {
    private readonly config = new MatSnackBarConfig();
    private isOpen = false;

    constructor(private snackBar: MatSnackBar) {
        this.config.duration = 2500;
    }

    public display(text: string) {
        this.snackBar.open(text, '', this.config);
    }

    public displayComponent<T>(component: ComponentType<T>, config?: MatSnackBarConfig) {
        if (!this.isOpen) {
            this.openSnackbar();
            this.snackBar.openFromComponent(component, config);
        }
    }

    private openSnackbar() {
        this.isOpen = true;
    }

    public dismiss() {
        this.isOpen = false;
        this.snackBar.dismiss();
    }

    public afterDismiss() {
        this.isOpen = false;
    }

}
