## Docker

### Develop

- Init development running:

        #!bash
        $ docker-compose -f docker-compose.dev.yml up -d

- Shell

        #!bash
        $ docker-compose -f docker-compose.dev.yml exec angular-dev sh

- Logs

        #!bash
        $ docker-compose -f docker-compose.dev.yml logs -f angular-dev

### Deploy

- Build Angular and Run Nginx:

        #!bash
        $ docker-compose -f docker-compose.prod.yml up --build -d

- Shell

        #!bash
        $ docker-compose -f docker-compose.prod.yml exec nginx-angular-app sh

- Logs

        #!bash
        $ docker-compose -f docker-compose.prod.yml logs -f nginx-angular-app


## Angular2DevelopmentCLI

This project was created with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

## Code scaffolding

Run `ng g component component-name` to generate a new component. You can also use `ng g directive/pipe/service/class/module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
