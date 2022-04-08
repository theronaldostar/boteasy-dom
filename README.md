# [BoteasyDOM](https://boteasy.net/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/theronaldostar/boteasy-dom/blob/main/LICENSE)  [![npm version](https://img.shields.io/npm/v/boteasy-dom.svg?style=flat)](https://www.npmjs.com/package/boteasy-dom)  [![npm version](https://badge.fury.io/js/boteasy-dom.svg)](https://www.npmjs.com/package/boteasy-dom)  [![Downloads](https://img.shields.io/npm/dm/boteasy-dom.svg)](https://www.npmjs.com/package/boteasy-dom)

* This document is inspired by jQuery and React and was developed by Ronaldo exclusively for the Boteasy platform, but can be used on other platforms!
---

# How to use?

```shell
npm i boteasy-dom
```

# Import:

```shell
import BoteasyDOM from "boteasy-dom";
/**
 * @jsx createElement
 * @jsxFrag Fragment
 * @jsxRuntime classic
 * Tells babel to use createElement for JSX.
 * See how to use globally: https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#usage
*/
const {  } = BoteasyDOM;
```

# .version:
* a boteasy-dom version

```shell
version;
```

# .Fragment:
* Fragment for components

```shell
Fragment;
```

# .dom:
* document

```shell
dom;
```

# .link:
* Get information or change your app's URL, easily and accurately!

```shell
/**
 * url: https://www.example.com
 *
 * to: https://www.example.com/help
 * reload: 1000 = 1 second
 * protocol: http: | https:
 * host: example.com
 * route: /help
*/
```

```shell
link.to("help");
```

```shell
link.reload(1000);
```

```shell
link.protocol;
```

```shell
link.host;
```

```shell
link.route;
```

# .storage:
* Manipulates: window.localStorage

```shell
storage.set("boteasy", {first: "boteasy", last: "dom"});
```

```shell
storage.get("boteasy");
```

```shell
storage.remove("boteasy");
```

```shell
storage.clear();
```

# .css():
* This function is for you to add or remove class on one or multiple elements;

```shell
css.add("input", "class");
```

```shell
css.remove("input", "class");
```

# .html(target, value):
* This function serves to add or remove an element in the DOM;

```shell
html("label", "Just a test!");
```

# .prop(target, bolean):
* This function serves to enable/disable elements;

```shell
prop("input", true);
```

```shell
prop("input", false);
```

# .tests(target, value):
* This function serves to perform input tests;

```shell
tests("input#fullname", "your fullname").then(status => {});
```

# wait(target, bolean):
* This function serves to disable the entire site/App so that the user does not make multiple clicks or leave the page during a request;

```shell
wait(true);
```

```shell
wait(false);
```

# .copy(value):
* This function serves to copy a text to a clipboard;

```shell
copy("Just a test!");
```

# .request({}):
* This function serves to perform AJAX requests;

```shell
request({
	url: "https://www.example.com/api/",
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
createElement(Fragment, null,
	createElement("input", {type: "email", className: "boteasy", style: {color: "#fff", "font-weight": "bold"}})
);
```
//TODO: `<input type="email" className="boteasy" style={{color: "#fff", "font-weight": "bold"}} />`


# .createRoot():
* This function serves to create a route to Boteasy-dom,
* Send the second parameter as  true to give permission to hydrate;

```shell
const container = dom.querySelector("#modal");
const modal = createRoot(container, true);
```

* Render the element in the root;

```shell
const element = createElement("h1", null, "Hello, world!");
modal.render(createElement(element));
```
//TODO: `<h1>Hello, world!</h1>`


* hydrate the element in the root;

```shell
const name = "Ronaldo S.";
const element = createElement("h1", null, "Hello, ", name);
modal.hydrate(createElement(element));
```
//TODO: `<h1>Hello, Ronaldo S.</h1>`


* Remove the element in the root;

```shell
modal.unmount();
```

# .useState():
* This function is just for adding some local states.

```shell
const [state, setState] = useState(10);
setState(prev => (prev + 1));
```

# .useEffect():
* ---

```shell
useEffect(() => {
	//effect();
	//TODO: Under development! On moment.
}, [deps]);
```

# .match({}, index):
* This function is a direct alternative to "switch ~ case".

```shell
const index = null;
match({
	first: "boteasy",
	last: "dom",
	default: "latest"
}, index);
```