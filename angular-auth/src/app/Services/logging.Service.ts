import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

    static API = environment.baseUrl;

    protected getApi() {
        return LoggingService.API;
    }

    http: HttpClient = inject(HttpClient);

    logError(data: { statusCode: number, errorMessage: string, datetime: Date }) {
        this.http.post(this.getApi() + '/log.json', data)
            .subscribe();
    }

    fetchErrors() {
        this.http.get(this.getApi() + '/log.json')
            .subscribe((data) => {
                console.log(data);
            })
    }
}
