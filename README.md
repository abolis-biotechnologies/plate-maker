# Introduction

![Version](https://img.shields.io/badge/Version-1.4.0-ff69b4.svg?style=for-the-badge)
![Technology-1](https://img.shields.io/badge/Angular-9.0.2-red.svg?style=for-the-badge&logo=angular)
![Technology-2](https://img.shields.io/badge/MDBootstrap-4.10.0-blueviolet.svg?style=for-the-badge)
![Technology-3](https://img.shields.io/badge/Node-10.16.0-brightgreen.svg?style=for-the-badge&logo=node.js)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

[comment]: <> ( todo: add dependencies and devDependencies badges)

![alt text](./projects/app/src/assets/png/plate_maker_dark.png "Plate Maker")

**Plate Maker** is an open source frontend tool developed by [Abolis Biotechnologies](http://abolis.fr) to 
simulate and visualize a [microplate](https://en.wikipedia.org/wiki/Microplate), an assay plate with multiple wells used as small test tubes in biology. **Plate Maker** is 
flexible and easy to use library, that can be quickly implemented in Angular* projects.

This tool was generated with [Angular CLI](https://github.com/angular/angular-cli) v9.0.2 and tested with _Node_ v10.16.0 and 
_NPM_ v6.13.6. **Plate Maker** depends on [ngx-drag-to-select](https://www.npmjs.com/package/ngx-drag-to-select) package: 
lightweight, fast, configurable and reactive Drag-To-Select (DTS) component for Angular 6 and beyond.

> *If you are new to Angular, please visit the [Getting Started Angular Tutorial](https://angular.io/start).

# Table of Contents

- [Main Features and Demonstration](#main-features-and-demonstration)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
    - [Pre-requisites (Install)](#pre-requisites-install)
- [Running End-to-End Tests](#running-end-to-end-tests)
- [Configurations and Dependencies](#configurations-and-dependencies)
- [Adding Plate Maker to Your Application](#adding-plate-maker-to-your-application)
    - [Usage Example](#usage-example)
        - [Simulating an Assay Plate](#simulating-an-assay-plate) 
        - [Visualising an Assay Plate](#visualising-an-assay-plate)
- [API (for Developers)](#api-for-developers)
    - [Customizing Styles](#customizing-styles)
    - [Main Features](#main-features)
- [Private Release](#private-release)
- [Versioning](#versioning)
- [Licence](#licence)

# Main Features and Demonstration

- Create and visualise assay plates with up to 96 wells  
- Select wells on the assay plate simply by dragging (Drag to select)* 
- Fill selected wells with objects from the `Configuration` menu 
- Wells with the same content are grouped by color for easy visualisation 
- Read-only assay plates in the visualization mode

> ***Drag To Select** is the process of clicking on a portion of the screen, holding down the mouse button, and dragging the cursor to another location. 
This action will select everything from the beginning to the end of the drag.
 
 
![](./projects/app/src/assets/gif/plate_maker_demo.gif)
 
# Project Structure

The project workspace hosts three major parts: 

- A library with **Plate Maker** components and modules (`/projects/@abolis/plate-maker`)
- An example of **Plate Maker** usage (`/projects/app`)
- An automatic end-to-end tests (`/cypress`)

```
plate-maker
    ├── cypress                           ─────── End-To-End tests  
    ├── project 
    |   ├── @abolis                       ───┐
    |   |   └── plate-maker                  |
    |   |       ├── src                      | 
    |   |       |   ├── lib                  |
    |   |       |   |   ├── *.html           ├─── Library
    |   |       |   |   ├── *.scss           |
    |   |       |   |   └── *.ts             |
    |   |       |   └── public_api.ts        |
    |   |       └── *.json                ───┘
    |   └── app                           ───┐
    |       └── src                          |  
    |           ├── app                      |
    |           |   ├── create-plate-app     |
    |           |   ├── display-plate-app    ├─── Application
    |           |   └── ...                  |
    |           ├── assets                   |
    |           ├── index.html               |
    |           └── ...                   ───┘
    ├── package.json
    /
    └── ...
```

# Getting Started

## Pre-requisites (Install)

The standard way to install and to run this library is to use _NPM_*.

```bash
  npm install           # if this is your first time here
  npm run build.lib     # Build the main library
  npm run serve.prod    # Run the app in production mode
```

For more build tasks, please see `package.json`.
> *If you are new to NPM, please visit the [Getting Started NPM Tutorial](https://docs.npmjs.com/getting-started).

# Running End-to-End Tests

Run `cypress.live` to execute the End-to-End tests in live mode via [Cypress](https://www.cypress.io/). 
To run the End-to-End tests in console mode please use `cypress.ci`.
For more details, please see `package.json`.

# Configurations and Dependencies

All configurations and dependencies can be found in `angular.json` and `package.json`.

# Adding Plate Maker to Your Application

- Declare **Plate Maker** library dependency in your `package.json`
  
```bash
  "plate-maker": "path_to_the_built_library"
```

- Add **Plate Maker** component in your html template, respecting its inputs and outputs. 

```html
<lib-plate-maker ...></lib-plate-maker>
```

## Usage Example

Once you have served the project, you can visit your [localhost](http://localhost:4200/) to see the running app with a default configuration of _angular CLI_ project. 
The main Navbar contains two links, one of them is for simulating assay plates, and the other one corresponds to plate visualising tool.

### Simulating an Assay Plate

  1. Drag your mouse over wells you want to select ('Drag to Select').
  2. In the `Configuration` menu choose objects in `Main Object` or `Other Object` fields to fill selected wells with it. All wells containing an object will be colored 
     by a random color and then grouped by this random color*.
  3. Repeat steps 1 and 2 to fill in all neccessary wells of the plate with objects.
  4. Use `Save` button of the `Configuration` menu to print an assay plate into the console. You can also send an assay plate to a backend server instead of printing it.
  
  - To delete objects from selected wells use _Backspace_ or _Delete_ keys.
  - To name an assay plate use the `Barcode` field.

> *Note that wells with objects chosen in the `Main Object` field can be grouped by color, while wells with objects from the `Other Object` 
field do not provide this option.  

### Visualising an Assay Plate

  - Select a barcode from the `Barcode(s)` menu to display an assay plate. Note, that the visualised assay plate is read-only.
  - `Barcode(s)` menu provides an option of filtering assay plate by barcodes.
  - The barcode(s) and their plate arrays can be fetched from a backend server.

For more implementation details see the source code (/projects/app).

# API (for Developers)

In this section, you will find more specific information about integration of **Plate maker** library to an Angular project.

## Customizing Styles

- If you use scss in your project then you need to add the following instruction on the top of your styles.scss:

```
// Overriding ngx-drag-to-select sass variables - Should be before importing ngx-drag-to-select scss file
$selected-item-border-size: 2px;
$selected-item-border-color: #000000;

// import ngx-drag-to-select scss file
@import "~ngx-drag-to-select/scss/ngx-drag-to-select";
```

- If you use css in your project then you have to import `ngx-drag-to-select.css` and add the following lines to styles.css:

```
.dts-select-container:not(.dts-custom) .dts-select-item.selected {
  border: 2px solid #000000;
}
```

## Main Features

In the HTML template (`plate-maker.component.html`), you can notice the `dts-select-container` component that wraps all wells you want 
to be selectable in this component. This component is provided by the `ngx-drag-to-select` library, and it is used with following features:

| **Input/Output**  | **Description**                        |
|-------------------|----------------------------------------|
| [(selectedWells)] | binds the selected wells               |
| [disabled]        | changes an editable plate to read-only |
| (selectionEnded)  | triggered when wells are selected      |

On the other hand, our **Plate Maker** component is designed to have one property, one hostListener, three inputs and two outputs:

|**I/O/Prop./Listener**| **Type**     | **Description**                                                                                      |
|----------------------|--------------|------------------------------------------------------------------------------------------------------|
| selectedWells        | property     | 2D array, represents the selected wells when the [(selectedWells)] of the DTS component is fired     |
| keyup                | hostListener | listens to the keyup event (using keyboard _Backspace_ and _Delete_ keys to clear selected wells)    |                                                                                     |
| wells                | input        | 2D array, gets plate wells sent by the app (e.g., an assay plate with empty wells at initialization) |                                                                       |
| disableSelection     | input        | boolean, signals if an assay plate is read-only (in visualization mode)                              |
| truncateLimit        | input        | number, defines the limit of a well content. By default = 9 characters                               |
| selected             | output       | emitted when well(s) is(are) selected for updating (filled)                                          |
| deleted              | output       | emitted when well(s) is(are) selected for deleting objects from it                                   |

Well is represented by `WellInterface` with 4 following properties:

| **Property** | **Type** | **Description**                                                      |
|--------------|----------|----------------------------------------------------------------------|
| row          | number   | row index of a well in a plate array                                 |
| column       | number   | column index of a well in a plate array                              |
| bgColor      | string   | indicates the background color of a well                             |
| content      | array    | array of ContentInterface (see table below), represents well content |

Well content is represented by a `ContentInterface` with 3 following properties:

| **Property**  | **Type** | **Description**                                                 |
|---------------|----------|-----------------------------------------------------------------|
| type          | string   | represents content type                                         |
| value         | string   | indicates the content value                                     |
| mdb_classes   | string   | contains MDBootstrap classes to customize the displayed content |

# Private Release

> Note that this release is only for Abolis usage. In the future, this library will be hosted on Github and released into NPM.

Each gitlab CI pipeline pushes a tar package (only if all its tests passed, obviously) that can be used in other projects. Therefore, in order to declare this lib in another project's `package.json`, just look for the url printed in the `package-upload` job logs of your latest successful pipeline.

## Private Official Release

- Bump up the version `minor`, and possibly `major` (https://semver.org/), in [package.json] of the app and the library
- Git commit with a message exactly matching `Release YYYY.X.Z`
- Git push
- Wait for the `package-upload` CI job to complete \o/

# Versioning

**Plate Maker** will be maintained under the Semantic Versioning guidelines. Releases are numbered with the following format:

```<MAJOR>.<MINOR>.<PATCH>```

**MAJOR** versions indicate incompatible API changes,

**MINOR** versions add functionality in a backwards-compatible manner, and

**PATCH** versions introduce backwards-compatible bug fixes.

For more information on SemVer, please visit [http://semver.org](http://semver.org).

# Licence

MIT &copy; [Abolis Biotechnologies](http://abolis.fr)
