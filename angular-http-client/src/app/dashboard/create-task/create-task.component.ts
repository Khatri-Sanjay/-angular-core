import {Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Task} from "../../Model/task";
import {TaskService} from "../../Service/task.service";

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

    @Input() isEditTask: boolean = false;

    @Input() selectedTask: Task;

    @Output()
    CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();

    taskForm: FormGroup = new FormGroup<any>({});

    taskService = inject(TaskService);

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.buildForm();
        if (this.isEditTask) {
            this.patchTask();
        }
    }

    buildForm() {
        this.taskForm = this.formBuilder.group({
            title: undefined,
            description: undefined,
            assignedTo: undefined,
            createdAt: undefined,
            priority: undefined,
            status: undefined,
        });
    }

    OnCloseForm() {
        this.CloseForm.emit(false);
    }

    onSubmit() {
        console.log(this.taskForm.value);
        this.EmitTaskData.emit(this.taskForm.value);
        this.OnCloseForm();
    }

    patchTask() {
        this.taskForm.patchValue({
            title: this.selectedTask?.title,
            description: this.selectedTask?.description,
            assignedTo: this.selectedTask?.assignedTo,
            createdAt: this.selectedTask?.createdAt,
            priority: this.selectedTask?.priority,
            status: this.selectedTask?.status,
        })
    }
}
