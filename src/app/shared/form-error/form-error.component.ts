import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {
  @Input('formControlData') formControlData:any
  @Input('CustomClass') CustomClass:any
  @Input('formGroupData') formGroupData:any  
  @Input('patternMsg') patternMsg:string    
  @Input('requiredMsg') requiredMsg:string 
  @Input('emailMsg') emailMsg:string    
  @Input('maxlengthMsg') maxlengthMsg:string                
  @Input('minlengthMsg') minlengthMsg:string     
  constructor() { }

  ngOnInit() {
  }

}

