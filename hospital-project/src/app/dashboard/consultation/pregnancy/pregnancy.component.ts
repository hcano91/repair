import { Component, OnInit } from '@angular/core';
import { ConsultationService } from  '../../../services/consultation.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pregnancy',
  templateUrl: './pregnancy.component.html',
  styleUrls: ['./pregnancy.component.css']
})
export class PregnancyComponent implements OnInit {

  constructor(private consultationService: ConsultationService) { }

  ngOnInit() {
  }

}
