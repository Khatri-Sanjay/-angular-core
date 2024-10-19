import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Subject, tap, throwError} from "rxjs";
import {Task} from "../Model/task";
import {LoggingService} from "./logging.service";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    static API = 'https://task-management-def88-default-rtdb.firebaseio.com/';

    http = inject(HttpClient);
    loggingService = inject(LoggingService);

    errorSubject = new Subject<HttpErrorResponse>();

    constructor() {
    }


    protected getApi(): string {
        return TaskService.API;
    }

    createTask(data: Task) {
        this.http.post<{ name: string }>(
            this.getApi() + '/tasks.json',
            data,
            {headers: {'task-create': 'created'}}
        )
            .pipe(catchError((error) => {
                const errObject =
                    {statusCode: error.status, errorMessage: error.message, dateTime: new Date()};
                this.loggingService.logError(errObject);
                return throwError(() => error);
            }))
            .subscribe({
                next: (res) => {
                    console.log('Task created:', res);
                },
                error: (err: any) => {
                    console.error('Error occurred:', err);
                    this.errorSubject.next(err);
                }
            });
    }


    fetchAllTask() {
        let headers = new HttpHeaders();
        headers = headers.set('content-type', 'application/json');
        headers = headers.set('content-type', 'text/html');
        headers = headers.set('Access-Control-Allow-Origin', '*');

        let queryParams = new HttpParams();
        queryParams = queryParams.set('page', 2);
        queryParams = queryParams.set('items', 20);

        return this.http.get<{ [key: string]: Task }>(
            this.getApi() + '/tasks.json',
            {headers: headers, params: queryParams, observe: 'body'})
            .pipe(
                map((response) => {
                    console.log(response);
                    // Transform data
                    let tasks = [];
                    for (let key in response) {
                        if (response.hasOwnProperty(key)) {
                            tasks.push({...response[key], id: key});
                        }
                    }
                    return tasks;
                }), catchError((error) => {
                    const errObject =
                        {statusCode: error.status, errorMessage: error.message, dateTime: new Date()};
                    this.loggingService.logError(errObject);
                    return throwError(() => error);
                }))
    }

    deleteTaskById(id: string) {
        this.http.delete(this.getApi() + '/tasks/' + id + '.json')
            .pipe(catchError((error) => {
                const errObject =
                    {statusCode: error.status, errorMessage: error.message, dateTime: new Date()};
                this.loggingService.logError(errObject);
                return throwError(() => error);
            }))
            .subscribe({
                next: (res) => {
                    console.log('Delete Successfully:', res);
                },
                error: (err: any) => {
                    this.errorSubject.next(err);
                    console.error('Error occurred:', err);
                }
            });
    }

    deleteAllTask() {
        this.http.delete(this.getApi() + '/tasks.json',{observe: 'events', responseType: 'arraybuffer'})
            .pipe(tap((event) => {
                console.log(event);
                if (event.type === HttpEventType.DownloadProgress) {
                }
            }), catchError((error) => {
                const errObject =
                    {statusCode: error.status, errorMessage: error.message, dateTime: new Date()};
                this.loggingService.logError(errObject);
                return throwError(() => error);
            }))
            .subscribe({
                next: (res) => {
                    console.log('Delete all task Successfully:', res);
                },
                error: (err: any) => {
                    console.error('Error occurred:', err);
                    this.errorSubject.next(err);
                }
            });
    }

    updateTask(id: string, data: Task) {
        this.http.put(this.getApi() + '/tasks/' + id + '.json', data)
            .pipe(catchError((error) => {
                const errObject =
                    {statusCode: error.status, errorMessage: error.message, dateTime: new Date()};
                this.loggingService.logError(errObject);
                return throwError(() => error);
            }))
            .subscribe({
                next: value => {
                    console.log('update successfully', value);
                },
                error: err => {
                    console.log('unable to update data', err);
                    this.errorSubject.next(err);
                }
            });
    }

    getTaskById(id: string) {
        return this.http.get(this.getApi() + '/tasks/' + id + '.json')
            .pipe(map((response) => {
                let task = {};
                task = {...response, id: id};
                return task;
            }));
    }

}
