import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CalculatorService } from '../../calculator.service';
import { Nullable } from '../../helpers/types';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  providers: [CalculatorService],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
  @Output()
  enteredAmount = new EventEmitter<number>();

  protected readonly shopForm = new FormGroup({
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  protected cards: Array<number> = [];
  protected higherSuggestion: Nullable<number> = null;
  protected lowerSuggestion: Nullable<number> = null;
  protected isLoading = false;

  get amount() {
    return this.shopForm.get('amount')?.value;
  }

  constructor(
    private readonly calculatorService: CalculatorService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.shopForm.get('amount')?.valueChanges.subscribe((x) => console.log(x));
  }

  protected onSubmit(): void {
    if (this.shopForm.invalid || !this.amount) return;
    this.isLoading = true;
    this.calculatorService
      .searchCards(this.amount)
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

  protected increase() {
    this.shopForm.get('amount')?.patchValue(this.higherSuggestion);
  }

  protected decrease() {
    this.shopForm.get('amount')?.patchValue(this.lowerSuggestion);
  }

  protected trackByFn(index: number): number {
    return index;
  }

  private reset(): void {
    this.cards = [];
    this.lowerSuggestion = null;
    this.higherSuggestion = null;
  }
}
