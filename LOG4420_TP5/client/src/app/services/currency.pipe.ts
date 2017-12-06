import { Pipe, PipeTransform, NgModule } from '@angular/core';
/*
 * Transform number to fr CAD currency type
 * i.e. : 299.99 -> 299,99$
*/
@Pipe({name: 'customCurrencyPipe'})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return value.toFixed(2).replace(/[.]/g , ",") + "$";
  }
}
