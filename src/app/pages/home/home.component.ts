import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal(['go shopping', 'go to the gym', 'walk the dogs']);
  taskValue = signal('');

  handlerChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;

    this.taskValue.set('');
    this.tasks.update(prev => [...prev, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update(prev =>
      prev.filter((task, indexTask) => indexTask !== index),
    );
  }
}
