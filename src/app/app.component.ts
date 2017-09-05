import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import moment from 'moment/src/moment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public form: FormGroup;
  public startingDate: string = '';
  public endingDate;
  public countryCode: string = ''

  constructor(
    private fb:FormBuilder,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(card?: any) {
    this.form = this.fb.group({
      date: ['', [Validators.required]],
      days: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.startingDate = this.form.controls.date.value;
      this.endingDate = moment(this.startingDate).add(this.form.controls.days.value, 'd').format();
      this.countryCode = this.form.controls.code.value;
    }
    console.log('this.startingDate', this.startingDate);
    console.log('this.endingDate', this.endingDate);
    console.log('this.countryCode', this.countryCode);
  }


}
