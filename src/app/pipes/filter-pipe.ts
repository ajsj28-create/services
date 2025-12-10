import { Pipe, PipeTransform } from "@angular/core";
import { Itodo } from "../models/todos.type";

@Pipe({
    name: 'filterTodo'
})
export class FilterPipe implements PipeTransform {

    transform(arr: Array<Itodo>, value: string): Array<Itodo> {
        if(value){
            return arr.filter(ele => ele.priority === value);
        }else{
            return arr
        }
    }

}