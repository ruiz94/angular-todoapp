import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'Hola';
  tasks = signal(['uno', 'dos', 'tres']);
  name = signal('Armando Ruiz');
  age = 29;
  disabled = true;
  imgUrl =
    'https://images.unsplash.com/photo-1701635619727-e04f0029d5c5?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  person = {
    name: 'Omar',
    age: 23,
    avatar:
      'https://images.unsplash.com/photo-1695653422676-d9dd88400e21?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  clickHandler = () => {
    console.log('You clicked me!');
  };

  handlerInput(event: Event) {
    console.log(event);
  }

  keydownHandlerInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
  }

  colorControl = new FormControl();
}
