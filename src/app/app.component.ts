import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import moment from 'moment/src/moment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public form: FormGroup;
  public startingDate: string = '';
  public endingDate;
  public countryCode: string = ''
  public months: Array<any> = [];
  public weekIdx: number = 0;


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

    this.setInitialValues(currentDate);

    while (currentDate <= stopDate) {
      if (currentDate.date() === 1) {
        this.checkEndOfMonth();
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

  setInitialValues(currentDate) {
    this.setMonth(currentDate);
    this.setWeek();
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

  checkEndOfMonth() {
    const lastWeek = this.months[this.months.length - 1].weeks[this.weekIdx];
    const lastWeeksLength = lastWeek.length;
    for (let i = lastWeeksLength; i < 7; i++) {
      this.months[this.months.length - 1].weeks[this.weekIdx][i] = undefined;
    }
  }

}
