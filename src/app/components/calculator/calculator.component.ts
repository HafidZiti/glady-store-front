import { CalculatorComponentValue } from './../../model/calculatorComponentValue';
import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';
import { take } from 'rxjs';
import { CalculatorService } from '../../calculator.service';
import { Nullable } from '../../helpers/types';
import { CardFormatPipe } from '../../pipes/card-format.pipe';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, CardFormatPipe],
  providers: [
    CalculatorService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CalculatorComponent),
    },
  ],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent implements ControlValueAccessor {
  @Output()
  enteredAmount = new EventEmitter<number>();

  private amountInput: Nullable<number> = null;

  protected higherSuggestion: Nullable<number> = null;
  protected lowerSuggestion: Nullable<number> = null;
  protected cards: Array<number> = [];
  protected isLoading = false;
  protected isDisabled = false;
  protected isValid = false;
  protected isModified = false;

  constructor(
    private readonly calculatorService: CalculatorService,
    private readonly cd: ChangeDetectorRef
  ) {}

  public writeValue(calculatorComponentValue: CalculatorComponentValue): void {
    const { value, cards } = calculatorComponentValue;
    this.amount = value;
    this.cards = cards;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  protected onClick(): void {
    if (!this.amount) return;
    this.isLoading = true;
    this.calculatorService
      .searchCards(this.amount)
      .pipe(take(1))
      .subscribe((combinations) => {
        this.isLoading = false;
        if (combinations.equal) {
          this.cards = combinations.equal.cards;
        } else {
          this.higherSuggestion = combinations.ceil?.value ?? null;
          this.lowerSuggestion = combinations.floor?.value ?? null;
        }
        this.cd.markForCheck();
      });
    this.reset();
    this.enteredAmount.emit(this.amount);
  }

  protected handleValueChanges($event: number): void {
    this.isModified = true;
    this.isValid = $event > 0;
  }

  protected increase() {
    this.isModified = true;
    this.amount = this.higherSuggestion;
  }

  protected decrease() {
    this.isModified = true;
    this.amount = this.lowerSuggestion;
  }

  protected trackByFn(index: number): number {
    return index;
  }

  private onChange(value: CalculatorComponentValue): void {}

  private onTouched(): void {}

  private reset(): void {
    this.cards = [];
    this.lowerSuggestion = null;
    this.higherSuggestion = null;
    this.isModified = false;
  }

  get amount() {
    return this.amountInput;
  }

  set amount(value: Nullable<number>) {
    this.amountInput = value;
  }
}
