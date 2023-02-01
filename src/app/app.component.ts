import { Component } from '@angular/core';
import { CalculatorComponent } from './components/calculator/calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalculatorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'glady-store-front';
  constructor() {}

  protected handleCalculatorEvent(amount: number) {
    console.log('The entered amount is:', amount);
  }
}
