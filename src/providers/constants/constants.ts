import { Injectable } from '@angular/core';

/*
  Generated class for the ConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantsProvider {
  public static URL_SERVICE_ENDPOINT:string = 'http://18.136.203.83:3001/api';

  public static URL_PREDICTION:string = ConstantsProvider.URL_SERVICE_ENDPOINT+'/prediction';
  public static URL_TEXT_DETECT:string = ConstantsProvider.URL_SERVICE_ENDPOINT+'/textdetect';
  

}
