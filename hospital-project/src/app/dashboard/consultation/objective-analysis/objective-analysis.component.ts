import { Component, OnInit, Input } from '@angular/core';
import { ConsultationService } from  '../../../services/consultation.service';
import { NgForm } from '@angular/forms';
import { ProvideConsultationFormDirective } from '../../../directives/provide-consultation-form.directive';

@Component({
  selector: 'app-objective-analysis',
  templateUrl: './objective-analysis.component.html',
  styleUrls: ['./objective-analysis.component.css']
})
export class ObjectiveAnalysisComponent implements OnInit {
  @Input() consultationType: string;
  constructor(public consultationService: ConsultationService) { }

  calculateIMC(weight, size) {
    this.consultationService.selectedConsultation.data.objectiveIMC = weight / Math.pow(size,2);
  }

  calculateBodySurface(weight, size) {
    this.consultationService.selectedConsultation.data.objectiveBodySurface = 0.007184 * Math.pow(weight, 0.425) * Math.pow((size*100), 0.725);
  }

  calculateData(weight, size) {
    this.calculateIMC(weight, size);
    this.calculateBodySurface(weight, size);
  }

  printedIMC(imc){
    if(!(isNaN(imc) || typeof imc === "undefined")) {
      return parseFloat("" + imc).toFixed(2);
    } else {
      return "Falta llenar Peso y/o Talla."
    }
  }

  printedBodySurface(bodySurface){
    if(!(isNaN(bodySurface) || typeof bodySurface === "undefined")) {
      return parseFloat("" + bodySurface).toFixed(2);
    } else {
      return "Falta llenar Peso y/o Talla."
    }
  }

  ngOnInit() {
  }

}
