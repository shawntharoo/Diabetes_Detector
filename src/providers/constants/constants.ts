import { Injectable } from '@angular/core';

/*
  Generated class for the ConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantsProvider {
  public static URL_SERVICE_ENDPOINT:string = 'http://18.136.203.83:3001/api';
  // public static URL_SERVICE_ENDPOINT:string = 'http://localhost:3001/api';

  public static URL_PREDICTION:string = ConstantsProvider.URL_SERVICE_ENDPOINT+'/prediction';
  public static URL_TEXT_DETECT:string = 'http://18.136.203.83:5001/api/readimage';

  public static URL_LIST_SYMPTOMS:string = ConstantsProvider.URL_SERVICE_ENDPOINT+'/getallsymptoms';
  public static URL_GET_COMPLICATION:string = ConstantsProvider.URL_SERVICE_ENDPOINT+'/getcomplication';
  public static URL_GET_MEDICINE:string = ConstantsProvider.URL_SERVICE_ENDPOINT+'/getmedication';
}
