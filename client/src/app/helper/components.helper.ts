import { DomSanitizer } from '@angular/platform-browser';
import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as dayjs from 'dayjs';
import { FormControl } from '@angular/forms';
import { DATE_FORMAT_DDMMYYYY_SLASH } from 'src/assets/constants';

@Injectable({
  providedIn: 'root'
})

export class ComponentsHelper {
   constructor(private domSanitizer: DomSanitizer, public router: Router,
    ) { }

   public transform(base : string){
    if(base) return this.domSanitizer.bypassSecurityTrustResourceUrl(base);
    else return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+environment.defaultProfileImage)
  }

  // TODO: Activate when validate date in forms

  // public DateValidator(format = DATE_FORMAT_DDMMYYYY_SLASH): any {
  //   return (control: FormControl): { [key: string]: any } => {
  //     const val = dayjs(control.value, format, true);

  //     return val.isValid() ? { invalidDate: false } : { invalidDate: true };

  //   };
  // }

  public goToDetail(id: string) {
    this.router.navigateByUrl(`/detail/${id}`);

  }
}
