import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'genderFilter'
})
export class GenderFilterPipe implements PipeTransform {

    Gender = {
        MALE: 'male',
        FEMALE: 'female',
        ALL: 'all'
    }

    transform(list: any, filterBy: string) {
        console.log(list, filterBy);
        if (filterBy.toLowerCase() === this.Gender.ALL || filterBy.toLowerCase() === '' || list.length === 0) {
            return list;
        } else {
            return list.filter((value: any) => {
                return value.gender.toLowerCase() === filterBy.toLowerCase();
            })
        }
    }

}
