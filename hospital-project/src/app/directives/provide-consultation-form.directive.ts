import { Directive } from '@angular/core';
import {NgForm, ControlContainer} from '@angular/forms';

@Directive({
  selector: '[appProvideConsultationForm]',
  providers: [
    {
      provide: ControlContainer,
      useFactory: function(form: NgForm) {
          return form;
      },
      deps: [NgForm]
    }
  ]
})
export class ProvideConsultationFormDirective {}
