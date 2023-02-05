import { CalculatorComponentValue } from './model/calculatorComponentValue';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './components/calculator/calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalculatorComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'glady-store-front';

  private readonly initialValue: CalculatorComponentValue = {
    value: 42,
    cards: [20, 22],
  };

  protected readonly calculatorForm = new FormGroup({
    calculator: new FormControl<CalculatorComponentValue>(this.initialValue),
  });

  constructor() {}

  protected handleCalculatorEvent(amount: number) {
    console.log('The entered amount is:', amount);
  }
}
