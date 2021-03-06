import { ConstantsProvider } from './../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GetTextFromReportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetTextFromReportProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GetTextFromReportProvider Provider');
  }
  getText(byteArray,searchTerms) {
    const postData = {
      image:byteArray,
      search_terms:searchTerms
    }
    return new Promise((resolve, reject) => {
      this.http.post(ConstantsProvider.URL_TEXT_DETECT, postData)
        .subscribe(response => {
          resolve(response);
        },
          error => {
            reject(error);
          }
        )
    });


  }
}
