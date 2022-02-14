# boteasy-dom
* This document is inspired by jQuery and React and was developed by Ronaldo exclusively for the Boteasy platform, but can be used on other platforms.

# How to use?

```shell
npm i boteasy-dom
```

# How to use JSX?
* If you want to use jsx and want to use our renderer, use this in the file:

```shell
/**
 * @jsx Boteasy.createElement
 * @jsxFrag Boteasy.Fragment
 * @jsxRuntime classic
*/
```

# Import:

```shell
import Boteasy from "boteasy-dom";
/**
 * @jsx Boteasy.createElement
 * @jsxFrag Boteasy.Fragment
 * @jsxRuntime classic
 * Tells babel to use Boteasy.createElement for JSX.
 * See how to use globally: https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#usage
*/
```

# .version:
* a boteasy-dom version

```shell
Boteasy.version;
```

# .Fragment:
* Fragment for components

```shell
Boteasy.Fragment;
```

# .dom:
* document

```shell
Boteasy.dom;
```

# .undef:
* undefined

```shell
Boteasy.undef;
```

# .link:
* window.location

```shell
Boteasy.link;
```

# .storage:
* window.localStorage

```shell
Boteasy.storage;
```

# .css():
* This function is for you to add or remove class on one or multiple elements;

```shell
Boteasy.css.add("input", "class");
```

```shell
Boteasy.css.remove("input", "class");
```

# .html(target, value):
* This function serves to add or remove an element in the DOM;

```shell
Boteasy.html("label", "Just a test!");
```

# .prop(target, bolean):
* This function serves to enable/disable elements;

```shell
Boteasy.prop("input", true);
```

```shell
Boteasy.prop("input", false);
```

# .tests(target, value):
* This function serves to perform input tests;

```shell
Boteasy.tests("input#fullname", "your fullname").then(status => {});
```

# wait(target, bolean):
* This function serves to disable the entire site/App so that the user does not make multiple clicks or leave the page during a request;

```shell
Boteasy.wait(true);
```

```shell
Boteasy.wait(false);
```

# .copy(value):
* This function serves to copy a text to a clipboard;

```shell
Boteasy.copy("Just a test!");
```

# .request({}):
* This function serves to perform AJAX requests;

```shell
Boteasy.request({
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
Boteasy.createElement(Boteasy.Fragment, null,
	Boteasy.createElement("input", {type: "email", className: "boteasy", style: {color: "#fff", "font-weight": "bold"}})
);
```

# .createRoot():
* This function serves to create a route to Boteasy-dom,
* Send the second parameter as  true to give permission to hydrate;

```shell
const container = Boteasy.dom.querySelector("#modal");
const modal = Boteasy.createRoot(container, true);
```

* Render the element in the root;

```shell
const element = Boteasy.createElement("h1", null, "Hello, world!");
modal.render(Boteasy.createElement(element));
```

* hydrate the element in the root;

```shell
const name = "Ronaldo S.";
const element = Boteasy.createElement("h1", null, "Hello, ", name);
modal.hydrate(Boteasy.createElement(element));
```

* Remove the element in the root;

```shell
modal.unmount();
```

# .useState():
* This function is just for adding some local states.

```shell
const [state, setState] = Boteasy.useState(10); //{state: 10}
setState(prev => (prev + 1)); //{state: 11}
```