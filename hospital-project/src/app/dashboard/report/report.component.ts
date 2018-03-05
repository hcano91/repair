import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { ConsultationService } from '../../services/consultation.service';
import * as _ from "lodash";
import * as jsonexport from 'jsonexport/dist';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Output() visibleSectionEvent = new EventEmitter<string>();
  options:any;
  subscription:any;
  constructor(private consultationService: ConsultationService) { 
    this.options = {
      dateMin: '',
      dateMax: ''
    }
  }
  
  onBackButtonClick() {
    this.visibleSectionEvent.emit('patient-list');
  }

  onSubmitReportForm(reportForm:NgForm) {
    console.log(moment(this.options.dateMin, "YYYY-MM-DD").format("x"), moment(this.options.dateMax, "YYYY-MM-DD").format("x"));
    this.subscription = this.consultationService.getConsultationsByMillisecondRange(moment(this.options.dateMin, "YYYY-MM-DD").format("x"), moment(this.options.dateMax, "YYYY-MM-DD").format("x")).snapshotChanges()
      .subscribe(consultations => {
        console.log(consultations);
        var consultationList = [];
        _.slice(consultations, 0).forEach(element => {
          var y  = element.payload.toJSON();
          y["$key"] = element.key;
          consultationList.push(y);
        });
        this.exportJSonDataToCSV(consultationList);
      });
  }

  exportJSonDataToCSV(jsonData){
    jsonexport(jsonData,function(err, csv){
        if(err) return console.log(err);
        console.log(csv);
        var blob = new Blob(["\ufeff"+csv]);
        if (window.navigator.msSaveOrOpenBlob) 
            window.navigator.msSaveBlob(blob, "consultations.csv");
        else
        {
            var a = window.document.createElement("a");
            a.href = window.URL.createObjectURL(blob);
            a.download = "consultations.csv";
            document.body.appendChild(a);
            a.click()
            document.body.removeChild(a);
        }
    });
    console.log(this.options.searchType, this.options.searchValue);
  }

  ngOnInit() {
  }

}
