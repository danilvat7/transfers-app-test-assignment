# TransfersApp

This project was created using Angular 9 and Material.

The project has three main parts:
Core - contains common components and services;
Shared - define common components and other modules that we need to import inside every other module of our application;
Features - should contain all features modules;

In addition, all application components were covered by unit tests.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running builded version localy

    1. Install http-server for serving the app: npm i -g http-server
    2. cd (change directory) into the the build location (/dist/transfers-app) and run the app with: http-server
    3. Open http-server url appending /index.html to it, should look something like this http://127.0.0.1:8080/index.html
