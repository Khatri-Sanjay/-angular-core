import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'template-driven-form';

    isSubmitted: boolean = false;

    firstName: string = '';
    lastName: string = '';
    dob: string = '';
    emailAddress: string = '';
    gender: string = '';
    country: string = '';
    city: string = '';
    region: string = '';
    postal: string = '';
    userName: string = '';
    IsAgreed: boolean = false;

    @ViewChild('registrationForm') form: NgForm;

    genders = [
        {id: 'check-male', value: 'Male', display: 'Male'},
        {id: 'check-female', value: 'Female', display: 'Female'},
        {id: 'check-other', value: 'Others', display: 'Others'}
    ];

    defaultGender: string = 'male';
    defaultCountry: string = 'India';

    onSubmit() {
        this.isSubmitted = true;
        // this.firstName = this.form.value.firstname;
        this.firstName = this.form.controls['firstname'].value;
        this.lastName = this.form.value.lastname;
        this.emailAddress = this.form.value.email;
        this.country = this.form.value.address.country;
        this.city = this.form.value.address.city;
        this.region = this.form.value.address.region;
        this.postal = this.form.value.address.postal;
        this.userName = this.form.value.username;
        this.dob = this.form.value.dob;
        this.IsAgreed = this.form.value;

        this.form.reset();

        this.form.form.patchValue({
            gender: 'male',
            address: {
                country: 'India'
            }
        });

    }

    GenerateUserName() {
        const firstName = this.form.value.firstname.trim();
        const lastName = this.form.value.lastname.trim();
        const dob = new Date(this.form.value.dob);

        // Validate date of birth
        if (isNaN(dob.getTime())) {
            console.error('Invalid date of birth');
            return;
        }

        let userName = this.createUsername(firstName, lastName, dob);

        userName = userName.toLowerCase();

        console.log('username::', userName);

        this.form.controls['username'].setValue(userName);
    }

    private createUsername(firstName: string, lastName: string, dob: Date): string {
        const firstPart = firstName.length >= 3 ? firstName.slice(0, 3) : firstName;
        const lastPart = lastName.length >= 3 ? lastName.slice(0, 3) : lastName;

        const year = dob.getFullYear();

        return `${firstPart}${lastPart}${year}`;
    }

}
