# BoteasyDOM &middot; [![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/boteasy-dom.svg?style=flat-square
[npm]: https://www.npmjs.org/package/boteasy-dom

* This document is inspired by jQuery and React and was developed by Ronaldo exclusively for the Boteasy platform, but can be used on other platforms!

# How to use?

```shell
npm i boteasy-dom
```

# Import:

```shell
import BoteasyDOM from "boteasy-dom";
/**
 * @jsx BoteasyDOM.createElement
 * @jsxFrag BoteasyDOM.Fragment
 * @jsxRuntime classic
 * Tells babel to use BoteasyDOM.createElement for JSX.
 * See how to use globally: https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#usage
*/
```

# .version:
* a boteasy-dom version

```shell
BoteasyDOM.version;
```

# .Fragment:
* Fragment for components

```shell
BoteasyDOM.Fragment;
```

# .dom:
* document

```shell
BoteasyDOM.dom;
```

# .link:
* window.location

```shell
BoteasyDOM.link;
```

# .storage:
* Manipulates: window.localStorage

```shell
BoteasyDOM.storage.set("boteasy", {first: "boteasy", last: "dom"});
```

```shell
BoteasyDOM.storage.get("boteasy");
```

```shell
BoteasyDOM.storage.remove("boteasy");
```

```shell
BoteasyDOM.storage.clear();
```

# .css():
* This function is for you to add or remove class on one or multiple elements;

```shell
BoteasyDOM.css.add("input", "class");
```

```shell
BoteasyDOM.css.remove("input", "class");
```

# .html(target, value):
* This function serves to add or remove an element in the DOM;

```shell
BoteasyDOM.html("label", "Just a test!");
```

# .prop(target, bolean):
* This function serves to enable/disable elements;

```shell
BoteasyDOM.prop("input", true);
```

```shell
BoteasyDOM.prop("input", false);
```

# .match({}, index):
* This function serves to get an index of an object;

```shell
BoteasyDOM.match({first: "boteasy", last: "dom"}, "last");
```

# .tests(target, value):
* This function serves to perform input tests;

```shell
BoteasyDOM.tests("input#fullname", "your fullname").then(status => {});
```

# wait(target, bolean):
* This function serves to disable the entire site/App so that the user does not make multiple clicks or leave the page during a request;

```shell
BoteasyDOM.wait(true);
```

```shell
BoteasyDOM.wait(false);
```

# .copy(value):
* This function serves to copy a text to a clipboard;

```shell
BoteasyDOM.copy("Just a test!");
```

# .request({}):
* This function serves to perform AJAX requests;

```shell
BoteasyDOM.request({
	url: "",
	method: "GET",
	headers: {},
	data: {},
	dataType: "json",
	cors: false,
	success: () => {},
	error: () => {}
});
```

# .createElement();
* This function serves to create elements to be rendered by Boteasy-dom;

```shell
BoteasyDOM.createElement(BoteasyDOM.Fragment, null,
	BoteasyDOM.createElement("input", {type: "email", className: "boteasy", style: {color: "#fff", "font-weight": "bold"}})
);
```

# .createRoot():
* This function serves to create a route to Boteasy-dom,
* Send the second parameter as  true to give permission to hydrate;

```shell
const container = BoteasyDOM.dom.querySelector("#modal");
const modal = BoteasyDOM.createRoot(container, true);
```

* Render the element in the root;

```shell
const element = BoteasyDOM.createElement("h1", null, "Hello, world!");
modal.render(BoteasyDOM.createElement(element));
```

* hydrate the element in the root;

```shell
const name = "Ronaldo S.";
const element = BoteasyDOM.createElement("h1", null, "Hello, ", name);
modal.hydrate(BoteasyDOM.createElement(element));
```

* Remove the element in the root;

```shell
modal.unmount();
```

# .useState():
* This function is just for adding some local states.

```shell
const [state, setState] = BoteasyDOM.useState(10);
setState(prev => (prev + 1));
```