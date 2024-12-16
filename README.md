# Simplified Dropbox - Frontend

A responsive Angular-based frontend application that allows users to upload, view, and download files. This application works seamlessly with the Simplified Dropbox backend.

## Features
- View a list of uploaded files.
- Upload files (supports `image/png`, `image/jpeg`, `text/plain`, `application/json`).
- View file details and download files.
- Refresh functionality with rotating icon animation.
- Delete Functionality

## Prerequisites
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org) (version 22.12.0 recommended)
- [Angular CLI](https://angular.io/cli)
```bash
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 12.2.17
Node: 22.12.0 (Unsupported)
Package Manager: npm 10.9.0
OS: win32 x64

Angular: 12.2.17
... animations, cli, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1202.17
@angular-devkit/build-angular   12.2.17
@angular-devkit/core            12.2.17
@angular-devkit/schematics      12.2.17
@angular/cdk                    12.2.13
@angular/material               12.2.13
@schematics/angular             12.2.17
rxjs                            6.6.7
typescript                      4.2.4
```
- A running backend service for API integration ([simplified-dropbox-backend](https://github.com/Mallikarjuna-naik/dropbox-backend.git))

## Install Dependencies
1. Clone the repository:
   ```bash
   git clone https://github.com/Mallikarjuna-naik/simplified-dropbox-frontend.git
   cd simplified-dropbox-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Run the Application
1. Start the development server:
   ```bash
   ng serve
   ```

2. The frontend service will be available at [http://localhost:4200](http://localhost:4200).

## API Configuration
Make sure the backend service is running, and update the API URL in the `environment.ts` file:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## Directory Structure
```
simplified-dropbox-frontend
│
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── file-manager
│   │   │   │   ├── file-manager.component.html
│   │   │   │   ├── file-manager.component.ts
│   │   │   │   └── file-managert.component.scss
│   │   ├── services
│   │   │   └── file.service.ts
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   ├── assets
│   │   ├── svg
│   │   │   └── refresh-svgrepo-com.svg
│   │   └── styles
│   │       └── global.css
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   └── index.html
├── angular.json
├── package.json
├── README.md
└── tsconfig.json
```

## Additional Information
- **Styling**: The project uses Bootstrap and Angular Material for responsiveness and styling.
- **Icons**: SVG files are stored in the `assets/svg` directory.
- **Pipes**: The project includes a `SafeUrlPipe` for securely rendering file URLs.
