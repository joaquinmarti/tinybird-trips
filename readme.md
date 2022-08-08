# Joaquin Marti's TB widget test

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

## Build production version

```
npm run build
```

## Execute tests

```
npm run test
```

## Description

This repository contains a single page as a Dashboard with a widget consuming a Tinybird endpoint. The widget shows the endpoint data in an SVG chart and has deeplinked filters to show different metrics.

The architecture is composed by these layers:

- A presentational layer as a web component.
- An initiator with specific code to start a single instance of a widget.
- A mechanism to request API endpoints and cache their result.
- A persistence layer to handle the state in the URL.

## Production URL

The project is deployed in this URL:

[https://rad-kringle-6bf302.netlify.app/](https://rad-kringle-6bf302.netlify.app/)

## Technical approach

A widget is by default a standalone element that can be added to any website. A site could contain several widgets, including more than one instance of the same one.

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

### Extra ball

This repository also contains a mechanism to load widgets out of a small snippet of code. The snippet loads the Javascript files, the web component and the initiator, to bootstrap an instance of a widget.

````
<script>
  (function (w, d, s, ce, ceid) {
    var f = d.currentScript, l = d.createElement(s), w = d.createElement(s), wdi = d.createElement(ce); wdi.setAttribute("id", ceid);
    w.src = "/chart-8f3aed33e0510dc4122f.js";
    l.src = "/init-a76254050987ffbb8447.js";
    l.defer = true; f.parentNode.insertBefore(wdi, f); f.parentNode.insertBefore(w, f); f.parentNode.insertBefore(l, f);
  })(window, document, "script", "tbw-chart", "chart");
</script>
```

The snippet allows external sites to load widgets, despite the framework used in the site, as the widgets are based on web standards (javascript, web components, svg) and they don't need any external dependency. The script tag loading the widget does not get loaded in the critical path to avoid afecting the site core web vitals metric.

En example can be found here:

[https://rad-kringle-6bf302.netlify.app/snippet.html](https://rad-kringle-6bf302.netlify.app/snippet.html)