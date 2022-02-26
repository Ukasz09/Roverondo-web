# Roverondo [![License](https://img.shields.io/badge/licence-MIT-blue)](https://choosealicense.com/licenses/mit/) [![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](https://github.com/Ukasz09/Roverondo-web)

### About application

Roverondo - web application for cyclists, which is designed to work properly on both mobile and desktop devices.
Application covers such features as displaying charts and statistics, drawing planned and recorded tracks on the map ,
as well as social functions like adding reactions and comments to the posts, attending to organized events or tracking
the other app users’ progress.

### Demo

![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/login-page-1.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/wall-1.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/wall-details-1.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/wall-2.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/comments.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/events.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/find-friends.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/followers.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/leaderboard.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/profile.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/wall-details-2.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/aside-menu.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/wall-2.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/wall-3.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/login-page-2.png)
![](https://raw.githubusercontent.com/Ukasz09/Roverondo-web/master/readme/profile-2.png)

### Running application (development server)

Make sure you have installed:

- [NodeJs](https://nodejs.org/en/download/)
- AngularCLI: `npm install -g @angular/cli`
- Local packages (from project root directory): `npm install`
- [Docker](https://www.docker.com/get-started)

#### Backend - docker

For proper working, you need to set up and run backend application:

- Go to folder `deployment/roverondo-backend`
- Create container and run it: `docker-compose up --build --force-recreate`

#### Frontend - dev server

`npm start`

or with proxy:

`npm start:proxy`

This will start a dev server. After that navigate to page `http://localhost:4200/`

#### Frontend - docker

You can use one of available run configurations:

a) Local production build from sources:

From project root folder run command:

`npm run docker:up:prod-local`

This will create container and start application. After that navigate to page `http://localhost:4200/`

b) Production build with image from [DockerHub](https://hub.docker.com/r/ukasz09/roverondo-web-prod-prebuilt/tags)

From project root folder run command:

`npm run docker:up:prod-prebuilt`

This will create container and start application. After that navigate to page `http://localhost:4200/`

c) Local development build from sources (with live reload):

From project root folder run command:

`npm run docker:up:dev-local`

This will create container and start application. After that navigate to page `http://localhost:4200/`

### Tech stack and features

- Angular, 
- TypeScript
- HTML + Sass
- Angular Material, 
- Material Icons
- NgxCharts
- TestCafe
- Auth0
- Leaflet + OpenStreetMaps
- RWD


### 📫 Contact

| Created by                                                                                                                                       | gajerski.lukasz@gmail.com        |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| <a href="https://github.com/Ukasz09" target="_blank"><img src="https://avatars0.githubusercontent.com/u/44710226?s=460&v=4"  width="100px;"></a> | Feel free to contact me! :punch: |
