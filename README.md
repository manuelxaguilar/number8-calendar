# Number8Calendar

## Live test

https://manuelaguilar.tech/number8-calendar

## Final observations and questions:

a) A list of any requirements you could not implement.

I didn’t have time to display the 2008 holidays on the actual calendar, though I did fetch the data from the API.

b) Bugs you’ve identified but didn’t have time to fix.

The error message doesn’t go away if you search again with a correct parameter.
The user can type anything that he wants on the inputs and this should be limited and better validated
The only validation currently implemented is that all three inputs must have a value, however there is no alert for the user to know that this is the case if he is missing something and tries to submit the form

c) Things you would do if you had more time to complete the task.

Create a calendar component instead of working on the app component that ng-cli generates
Separate the form into a different component than the rendered calendar 
Make use of services and/or directives 
Better typing for variables
Validate the user’s input on the form to make sure he only enters what’s required
Format the date input so that it’s user friendly and bulletproof
Change a few aspects on my approach mainly for even better performance purposes (in general check the code and look for refactoring opportunities)
Consider if creating a service for the API calls would be a better approach 
Get the holidays working on the calendar
I would DEFINITELY not add the API keys like I did, but since this is a test I included them in the code like so
As far as git goes, I would have used develop and feature branches instead of just working on master (for time sake) 
Properly check for more bugs, usability and cross-browser
Make the CSS “pixel-perfect”  so that it looks exactly like the example
Better error handling both for http request  and for when there’s an error with the user’s input
Nicer styles for the form




This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
