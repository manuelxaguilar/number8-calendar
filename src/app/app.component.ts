import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';

import moment from 'moment/src/moment'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
  public calendar: Array<any> = [];
  public weekIdx: number = 0;
  private HOLIDAYS_YEAR = 2008;
  private API_URL = 'https://holidayapi.com/v1/holidays';
  private API_KEY = '42b54d8f-2832-453e-baf4-c4b2b530bca5';
  public holidays = [];
  public error = false;

  constructor(
    private fb:FormBuilder,
    private http: Http
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
      this.wipeCalendar();
      this.startingDate = this.form.controls.date.value;
      this.endingDate = moment(this.startingDate).add(this.form.controls.days.value, 'd').format();
      this.countryCode = this.form.controls.code.value;
    }

    this.setCalendar(this.startingDate, this.endingDate);

    // Didn't really get around to working on this
    // though i am logging the results if successful
    // or showing an ugly error message on the html if
    // it fails
    this.http.get(`${this.API_URL}?key=${this.API_KEY}&country=${this.countryCode}&year=${this.HOLIDAYS_YEAR}`)
    .map(res => res.json())
    .subscribe(
      ({ holidays }) => {
        console.log('holdidays:', holidays);
        this.holidays = holidays
      },
      error => this.error = true
    );
  }

  wipeCalendar() {
    this.calendar = [];
    this.weekIdx = 0;
  }

  setCalendar(startDate, stopDate) {
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);

    if (currentDate.date() !== 1) {
      this.setInitialValues(currentDate);
    }

    this.loopOverRequestedPeriod({ currentDate, stopDate });
    this.checkEndOfLastMonth();
  }

  setInitialValues(currentDate) {
    this.setMonth(currentDate);
    this.setWeek();
  }

  loopOverRequestedPeriod({ currentDate, stopDate }) {
    while (currentDate <= stopDate) {
      if (currentDate.date() === 1) {
        if (this.calendar.length) {
          this.checkEndOfLastMonth();
        }
        this.setMonth(currentDate);
        this.setWeek();
        this.weekIdx = 0;
      }

      if (!currentDate.day() && currentDate.date() !== 1) {
        this.setWeek();
        this.weekIdx++;
      }
      this.calendar[this.calendar.length - 1].weeks[this.weekIdx][currentDate.day()] = currentDate.date();
      currentDate = currentDate.add(1, 'days');
    }
  }

  setMonth(currentDate) {
    this.calendar.push({
      month: moment(currentDate).format('MMMM'),
      weeks: [],
      year: currentDate.year()
    });
  }

  setWeek() {
    this.calendar[this.calendar.length - 1].weeks.push([]);
  }

  checkEndOfLastMonth() {
    const lastWeek = this.calendar[this.calendar.length - 1].weeks[this.weekIdx];
    const lastWeeksLength = lastWeek.length;
    for (let i = lastWeeksLength; i < 7; i++) {
      this.calendar[this.calendar.length - 1].weeks[this.weekIdx][i] = undefined;
    }
  }

}
