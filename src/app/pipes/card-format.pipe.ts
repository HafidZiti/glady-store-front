import { Pipe, PipeTransform } from '@angular/core';

/*
 * Displays the value with unit
 * Takes an unit argument that defaults to $.
 * Usage:
 *   value | CardFormat:unit
 * Example:
 *   {{ 50 | cardFormat:'€' }}
 *   formats to: 50 €
 */
@Pipe({ name: 'cardFormat', standalone: true })
export class CardFormatPipe implements PipeTransform {
  transform(value: number, unit = '$'): string {
    return `${value} ${unit}`;
  }
}
