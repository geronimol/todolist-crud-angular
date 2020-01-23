import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { ToDoListService } from 'src/app/services/to-do-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task = new Task();
  editing: boolean;

  constructor(private toDoListService: ToDoListService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.toDoListService.getTasks()
      .subscribe(res => {
        this.tasks = res as Task[];
      });
  }

  addTask(form: NgForm) {
    this.toDoListService.addTask(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.getTasks();
      });
  }

  updateTask(form: NgForm) {
    this.toDoListService.updateTask(this.selectedTask)
      .subscribe(res => {
        this.getTasks();
        this.editing = false;
        this.resetForm(form);
      });
  }

  editTask(task: Task) {
    this.selectedTask = task;
    this.editing = true;
  }

  cancelEdit(form: NgForm) {
    this.editing = false;
    this.getTasks();
    this.resetForm(form);
  }

  deleteTask(id: string, form: NgForm) {
    this.toDoListService.deleteTask(id)
      .subscribe(res => {
        this.getTasks();
        this.resetForm(form);
        this.editing = false;
      });
  }

  completeTask(task: Task){
    task.completed = !task.completed;
    this.toDoListService.updateTask(task)
      .subscribe(res => {
        console.log(res);
      });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.selectedTask = new Task();
    }
  }

}
