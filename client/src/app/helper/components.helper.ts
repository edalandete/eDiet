import { DomSanitizer } from '@angular/platform-browser';
import {Injectable} from "@angular/core";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ComponentsHelper {
   constructor(private domSanitizer: DomSanitizer) { }

   public transform(base : string){
    if(base) return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+base);
    else return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+environment.defaultProfileImgae)
  }

}
