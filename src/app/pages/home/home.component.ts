import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Task, Filter } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {
  taskValue = signal('');
  tasks = signal<Task[]>([]);

  filter = signal<Filter>('all');
  tasksByFilter = computed( () => {
    const filter = this.filter();
    const tasks = this.tasks();

    if(filter === 'pending'){
      return tasks.filter( task => !task.completed);
    }
    if(filter === 'completed'){
      return tasks.filter( task => task.completed);
    }
    return tasks;
  })

  constructor(){
    effect( () => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    })
  }

  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks)
    }
  }

  taskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  handlerChange() {
    if(this.taskControl.valid && this.taskControl.value.trim() !== ''){
      const value = this.taskControl.value;
      this.addTask(value);
      this.taskControl.setValue('');
    }
  }

  addTask(title: string){
    const task: Task = {
      id: uuidv4(),
      title,
      completed: false
    }

    this.taskValue.set('');
    this.tasks.update(prev => [...prev, task]);
  }

  deleteTask(uuid: string) {
    this.tasks.update(prev =>
      prev.filter((task) => task.id !== uuid),
    );
  }

  onCompleted(uuid: string){
    this.tasks.update(prev =>
      prev.map((task) => {
        if(task.id !== uuid) return task;
        return {...task, completed: !task.completed}
      }),
    );
  }

  updateEditingMode(uuid: string){
    this.tasks.update(prev =>
      prev.map((task) => {
        if(task.id !== uuid || task.completed) return {...task, editing: false};
        return {...task, editing: !task?.editing}
      }),
    );
  }

  updateTask(uuid: string, event: Event){
    const { value } = event.target as HTMLInputElement
    this.tasks.update(prev =>
      prev.map((task) => {
        if(task.id !== uuid) return task;
        return {...task, editing: false, title: value}
      }),
    );
  }

  onChangeFilter(state: Filter){
    this.filter.set(state);
  }
}
