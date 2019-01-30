# Seed Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.2 and it was tested with _Node_ v9.11.2 
and _NPM_ v6.6.0.

This is a base project that can be used to create, build and test a libraries.

# Table of contents
- [How to start](#how-to-start)
- [Contribution](#contribution)
- [Generate a library](#generate-a-new-library)
- [Release a library](#release)
- [Use a library](#use-the-library-in-others-applications)
- [End-To-End tests](#running-end-to-end-tests)

# How to start

```bash
  npm install   # if this is your first time here
  npm run start.dev # Run in development mode
  npm run start.prod # Run in production mode
```

Alternatively, please have a look at our shared Pycharm run configurations or at package.json for more tasks

# Contribution

- Clone this project on your local machine
- Make your business
- Push it into the remote repository
- Update the dependents projects accordingly (by merging the new changes) 

# Generate a new library

If you want to contribute at this project by adding a new library for example, you can do it following the next steps:

- Create a new repository for your current library (`library-client` for example)
- Clone this project `seed-client` on your local machine
- Set the `library-client` as a second remote repository in your current project.
- Generate your new library using Angular-CLI: `ng generate library LIBRARY-NAME`. This will configure your project 
  automatically to host the new library and create a new directory for your library `/projects/@abolis/LIBRARY-NAME`.
- Create your library business
  - Declare for example a new component in `/projects/@abolis/LIBRARY_NAME/src/lib`
  - Export this new component using the `public_api.ts` file
  - Build the library in watching mode `npm build.lib`
- Import the library in `app` project
  - You must import the component in `app.module.ts`
  - Declare the component selector in `app.component.html`
  - Serve the application `npm start.dev`
- Test your library using Cypress, See [E2E tests](#running-end-to-end-tests)
- Release the library [Release](#release)
- Use your new library in your project [Use](#use-the-library-in-others-applications)
- Don't forget to push your modifications to your new repository `library-client`

## Release a library

- Bump the new release version in `/projects/@abolis/LIBRARY_NAME/package.json`
- Run the script `release_lib.sh`, this will build the library and zip (.tar) the build artifacts directory
- Copy the .tar on the `worker` machine using:
  ```bash
    scp /home/USER/Dev/shared-client/dist/LIBRARY_NAME_V.X.X.X.tar worker:.
  ```
- Log on the `worker` using ssh, and move the .tar to the meme-server directory:
  ```bash
    sudo mv LIBRARY_NAME_V_X.X.X.tar /home/abolis/Prod/meme-server/
  ```
- If the meme-server is stopped, you should run the following commands:
  ```bash
    ( cd /home/abolis/Prod/meme-server/ && nohup python3 -m http.server 8888 & )
  ```

# Use the library in others applications

- Declare the library dependency in `package.json`
    ```bash
      "LIBRARY_NAME": "path_to_the_built_library_tar" # http://worker.abolis.loc:8888/LIBRARY_NAME_V_X.X.X.tar
    ```
- __SPECIFIC CAS__ in Angular Seed, you must declare the umd file in `project.config.ts`
    ```
      {name: 'LIBRARY_NAME', path: 'node_modules/searchzyme-client/bundles/LIBRARY_NAME.umd.js'}
    ```
- Import what you want from the library in your module and/or component and envoy!

## Running end-to-end tests

Run `cypress.live` to execute the end-to-end tests in live mode via [Cypress](http://www.cypress.io/).
You can also uses `cypress.ci` to run the end-to-end tests in console mode.
