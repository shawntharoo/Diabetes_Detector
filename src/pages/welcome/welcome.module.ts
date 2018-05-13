import { NgModule } from '@angular/core';
import { WelcomePage } from './welcome';

@NgModule({
  declarations: [
    WelcomePage,
  ],
 
  exports: [
    WelcomePage
  ]
})
export class WelcomeModule {}
