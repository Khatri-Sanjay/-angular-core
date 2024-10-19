import {Component, OnInit, inject, OnDestroy} from '@angular/core';
import {TaskService} from "../Service/task.service";
import {Task} from "../Model/task";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    showCreateTaskForm: boolean = false;
    isEditTask: boolean = false;
    selectedTask: Task;
    currentTaskId: string;

    showTaskDetail: boolean = false;
    taskDetails: Task;

    task: any;

    errorMessage: any;
    errorSub: Subscription;

    taskService = inject(TaskService);

    isLoading: boolean = false;

    ngOnInit() {
        this.fetchTasks();
        this.errorSub = this.taskService.errorSubject.subscribe(
            { next: (httpError) => {
                    this.setErrorMessage(httpError);
                }
            }
        )
    }

    ngOnDestroy() {
        this.errorSub.unsubscribe();
    }

    fetchTasks() {
        this.isLoading = true;
        this.taskService.fetchAllTask().subscribe({
            next: (tasks) => {
                console.log('Task Get:', tasks);
                this.task = tasks;
                this.isLoading = false;
            },
            error: (err: any) => {
                console.error('Error occurred:', err);
                this.errorMessage = err.message;
                this.setErrorMessage(err);
                this.isLoading = false;

            }
        });
    }

    private  setErrorMessage(err: HttpErrorResponse) {
        console.log('errmsg', err);
        if (err?.error?.error === 'Permission denied') {
            this.errorMessage = 'You do not have permission to perform this action';
        } else {
            this.errorMessage = err?.message;
        }

        setTimeout(() => {
            this.errorMessage = null;
        }, 3000);
    }


    OpenCreateTaskForm() {
        this.showCreateTaskForm = true;
    }

    CloseCreateTaskForm() {
        this.showCreateTaskForm = false;
    }

    CreateOrUpdateTask(event: Task) {
        if (!this.isEditTask) {
            this.taskService.createTask(event);
        } else {
            this.taskService.updateTask(this.currentTaskId, event);
        }
    }

    deleteTask(id: string) {
        this.taskService.deleteTaskById(id);
    }

    deleteAllTask() {
        this.taskService.deleteAllTask();
    }

    editTask(id: string) {
        this.showCreateTaskForm = true;
        this.isEditTask = true;
        this.currentTaskId = id;

        this.selectedTask = this.task.find((task) => {return task?.id === id});
    }

    showCurrentTaskDetails(id: string) {
        this.showTaskDetail = true;
        this.taskService.getTaskById(id).subscribe({
                next: (task: Task) => {
                    this.taskDetails = task;
                    console.log('get successfully', task);
                },
                error: err => {
                    console.log('unable to get data', err);
                }
            });
    }

    getCloseStatus() {
        this.showTaskDetail = false;
    }
}
