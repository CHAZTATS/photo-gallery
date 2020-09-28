import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyFormat' })
export class CurrencyFormatPipe implements PipeTransform {
    transform = (number: number) => {
        if (number) {
            const result = new Intl.NumberFormat({ style: 'currency' } as any).format(number);
            return number.toString().includes('.') ? result : result + '.00';
        } return '00.00';
    }
}
