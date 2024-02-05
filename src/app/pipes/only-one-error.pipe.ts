import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'onlyOneError',
    pure:true,
    //inpute pipe triggner on every angular change

})
export class OnlyOneErrorPipe implements PipeTransform{
    transform(allErrors: any, errorsPriority: string[]) {
        if(!allErrors) return null;
        
        const onlyOneError:any={};
        
        for(let error of errorsPriority){
            if (allErrors[error]){
                onlyOneError[error]=allErrors[error];
                break;
            }
        }
        // for cycle above finds only one error and displays it imediatly and dissmiss the other errors 




        return onlyOneError;

        
    }
}