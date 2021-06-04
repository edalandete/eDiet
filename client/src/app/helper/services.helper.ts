import { Observable, of } from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class HelperService {
   constructor() { }

   public log(message: string) {
       console.log(`AppointmentService: ${message}`);
   }
   
   public handleError<T>(operation = 'operation', result?: T) {
       return (error: any): Observable<T> => {
     
         console.error(error); 
     
         this.log(`${operation} failed: ${error.message}`);
     
         return of(result as T);
       };
   }
}
