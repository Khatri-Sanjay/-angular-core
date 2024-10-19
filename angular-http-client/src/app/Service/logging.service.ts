import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

    static API = 'https://task-management-def88-default-rtdb.firebaseio.com/';

    private http = inject(HttpClient);

    protected getApi(): string {
        return LoggingService.API;
    }

    logError(data: {statusCode: number, errorMessage: string, dateTime: Date}) {
        this.http.post(this.getApi() + '/log.json', data).subscribe();
    }

    fetchErrors() {
        this.http.get(this.getApi()).subscribe((data) => {
            console.log('Error Occur, ', data);
        });
    }
}
