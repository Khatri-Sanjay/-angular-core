import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../Model/task";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {

  @Output()
  closeDetailView: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() task: Task;

  onCloseDetailView() {
    this.closeDetailView.emit(true);
  }

}
