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
  firstMonth: boolean = true;
  months: Array<any> = [];
  weekIdx: number = 0;


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

    this.getDates(this.startingDate, this.endingDate);
  }

  getDates(startDate, stopDate) {
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    let i = 0;

    while (currentDate <= stopDate) {
      if (this.firstMonth) {
        this.setMonth(currentDate);
        this.setWeek();
        this.setWeek();
        this.firstMonth = false;
      }

      if (currentDate.date() === 1) {
        this.setMonth(currentDate);
        this.setWeek();
        this.weekIdx = 0;
      }

      if (!currentDate.day() && currentDate.date() !== 1) {
        this.weekIdx++;
        this.setWeek();
      }

      this.months[this.months.length - 1].weeks[this.weekIdx][currentDate.day()] = currentDate.date();
      currentDate = currentDate.add(1, 'days');
      i++;
    }
    console.log('months', this.months);
  }

  setMonth(currentDate) {
    this.months.push({
      month: moment(currentDate).format('MMMM'),
      weeks: [],
      year: currentDate.year()
    });
  }

  setWeek() {
    this.months[this.months.length - 1].weeks.push([]);
  }

}
