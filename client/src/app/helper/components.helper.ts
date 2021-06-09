import { DomSanitizer } from '@angular/platform-browser';
import {Injectable} from "@angular/core";
import { environment } from 'src/environments/environment';
import * as dayjs from 'dayjs';
import { FormControl } from '@angular/forms';
import { DATE_FORMAT_DDMMYYYY_SLASH } from 'src/assets/constants';


@Injectable({
  providedIn: 'root'
})

export class ComponentsHelper {
   constructor(private domSanitizer: DomSanitizer) { }

   public transform(base : string){
    if(base) return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+base);
    else return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+environment.defaultProfileImage)
  }

  public DateValidator(format = DATE_FORMAT_DDMMYYYY_SLASH): any {
    return (control: FormControl): { [key: string]: any } => {
      const val = dayjs(control.value, format, true);

      return val.isValid() ? { invalidDate: false } : { invalidDate: true };

    };
  }


}
