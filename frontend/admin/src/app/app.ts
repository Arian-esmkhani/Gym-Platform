import { Component, signal } from '@angular/core';
import { ExerciseForm } from './component/exercise-form.component';



@Component({
  selector: 'app-root',
  imports: [ExerciseForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Admin');
}
