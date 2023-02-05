import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponentValue } from './model/calculatorComponentValue';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { calculatorValidator } from './validators/calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CalculatorComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'glady-store-front';

  private readonly initialValue: CalculatorComponentValue = {
    value: 42,
    cards: [22, 20],
  };

  protected readonly shopsList = [1, 2, 3, 4, 5];
  protected readonly availableShop = 5;

  protected isDisabled = false;

  protected readonly calculatorForm;

  constructor(private readonly cd: ChangeDetectorRef) {
    this.calculatorForm = new FormGroup({
      shopSelect: new FormControl<number>(5, Validators.required),
      calculator: new FormControl<CalculatorComponentValue>(this.initialValue, [
        Validators.required,
        calculatorValidator(),
      ]),
    });
  }

  protected handleCalculatorEvent(amount: number) {
    console.log('The entered amount is:', amount);
  }

  protected changeShop() {
    if (this.selectedShop === this.availableShop) {
      this.calculatorForm.get('calculator')?.enable();
      this.isDisabled = false;
    } else {
      this.calculatorForm.get('calculator')?.disable();
      this.isDisabled = true;
    }
    this.cd.markForCheck();
  }

  protected onSubmit() {
    console.log('Congrats! your purchase has been saved!');
  }

  get selectedShop(): number {
    return this.calculatorForm.get('shopSelect')?.value as number;
  }
}
