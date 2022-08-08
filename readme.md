# Joaquin Marti's assignment for Tinybird interview

## Requirements

* [Node](https://nodejs.org/)

Having installed [NVM](https://github.com/creationix/nvm) is recommended to execute different NPM versions in the development machine. This projects asumes the Node version is `v14.17.6`.

If you have NPM execute this command in the repository folder for every new terminal session:

```
nvm use
```

## Install dependencies

```
npm install
```

## Start dev environment

```
npm run dev
```

## Build production bundle

```
npm run build
```

## Execute tests

```
npm run test
```

## Description

## Production URL

## Technical approach

### Widgets

#### Assumtions

- A widget is a component that can be added to a website as a standalone feature.
- It should not be part of the critical rendering path.
- It should not contain external dependencies to avoid impacting on the site performance.
- It should not need a Javascript framework to load.

#### Technical solution

Web components will be used to develop the widgets for these reasons:

- Web components are web standards, hence, they don't need any external dependency.
- Work on every modern browser without polyfills.
- Some APIs might be polyfilled if old browsers need to be targeted.
- They are compatible with all major Javascript frameworks.
- They provide encapsulation and abstraction.

### Code snippet

#### Assumptions

- A widget can be rendered at any place of the site wherever a code snippet is added.
- A site might have multiple instances of a widget.
- A site could have multiple types of widgets

#### Technical solution


### Bootstrap a widget

### Endpoints access

### Persistence


### Architecture


Presentation layer

### Bundler

### Testing