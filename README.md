# [BoteasyDOM](https://boteasy.net/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/theronaldostar/boteasy-dom/blob/main/LICENSE)  [![npm version](https://img.shields.io/npm/v/boteasy-dom.svg?style=flat)](https://www.npmjs.com/package/boteasy-dom)  [![npm version](https://badge.fury.io/js/boteasy-dom.svg)](https://www.npmjs.com/package/boteasy-dom)  [![Downloads](https://img.shields.io/npm/dm/boteasy-dom.svg)](https://www.npmjs.com/package/boteasy-dom)

* This document is inspired by React, React-router, jQuery and styled-components, the aim is to have a merge of everything good in one documentation.
---
# How to use?

```shell
npm i boteasy-dom
```

```shell
yarn add boteasy-dom
```

# Quick use:

```jsx
import { dom, useState, createRoot } from "boteasy-dom";

const App = () => {
	const [count, setCount] = useState(0);
	return (
		<>
			<h1>{count}</h1>
			<button onClick={() => setCount(prev => (prev + 1))}>Increment</button>
		</>
	);
};

const container = dom.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
```

# Import:

```shell
import BoteasyDOM from "boteasy-dom";
/**
 * @jsx createElement
 * @jsxFrag Fragment
 * @jsxRuntime classic
*/
const {  } = BoteasyDOM;
```

# .version:
* A boteasy-dom version

```shell
const ver = version;
```

# .dom:
* The Document interface represents any web page loaded in the browser and serves as an entry point into the web page's content, which is the DOM tree

```shell
const root = dom.querySelector("#root");
```

# .Fragment:
* Allows a component to return multiple elements grouped a list of children without adding extra nodes to the DOM

```shell
<></>
```

# .match(object, index):
* This function is a direct alternative to "switch ~ case", and is based on the match function of the php language.

```shell
const index = null;
match({
	first: "boteasy",
	last: "dom",
	default: "test"
}, index);
```

# .useId(number|undefined):
* ???

```shell
const inputId = useId(2);
```

`<input type="text" id={inputId} />`

# .useRef(value|VoidFunction):
* ???

```shell
const email = useRef(() => {
	let name = "boteasy.dom";
	return `${name}@example.com`;
});
```

`<input type="email" ref={email} />`

# .useHtml(selector, newValue):
* This function serves to add or remove an element in the DOM;

```shell
useHtml("#root", `<h1>Hello, world!</h1>`);
```

# .useWait(bolean|string):
* This function is for you to disable all elements;

```shell
useWait(true);
```

```shell
useWait(false);
```

# .useProp(selectors, attribute, any):
* This function is used to enable/disable elements or select an input type checkbox, for example;

```shell
useProp("input, select", "disabled", true);
```

```shell
useProp("input", "disabled", false);
```

# .useRequest({}):
* This function serves to perform AJAX requests;

```shell
useRequest({
	url: "https://www.example.com/api/",
	method: "GET",
	headers: {},
	data: {},
	dataType: "json",
	success: () => {},
	error: () => {},
	finally: () => {}
});
```

# .useVibrate(number|number[]|undefined):
* ???

```shell
useVibrate([500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]);
```

# .useClipboard(string, VoidFunction|undefined):
* This function serves to copy a text to a clipboard;

```shell
useClipboard("Just a test!", () => {
	console.info("Text copied to clipboard.");
});
```

# .useTwins(string|{}|[], string|{}|[]):
* As the name says, this function is for you to compare if two objects or array are equal.

```shell
const array = ["boteasy", "dom"];
const array2 = [
	"boteasy",
	"dom",
	"version": ["latest"]
];
useTwins(array, array2);
```

# .useFloat(number|string, number):
* ???

```shell
const total = 100.123;
useFloat(total, 2);
```

# .useState(value|VoidFunction):
* This function is just for adding some local states.

```shell
const [state, setState] = useState(9);
setState(prev => (prev + 1));
```

# .useEffect(function, []|undefined):
* ???

```shell
let name = "boteasy";
const boteasyTest = () => console.info(`Hello, ${name}!`);
useEffect(() => {
	boteasyTest();
	/**
	 * TODO: Under Construction
	 * this function is incomplete.
	*/
	return () => console.info("Bye, world!");
}, [name]);
```

# .useStorage() => (string, any):
* Manipulates: window.localStorage.

`---`

```shell
const storage = useStorage();
```

`set`

```shell
storage("theme", () => {
	const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
	return prefers ? "dark" : "light"
});
```

`get`

```shell
storage("theme");
```

`remove`

```shell
storage()("theme");
```

# .useNavigate(number|undefined) => (string, boolean|undefined):
* ???

```shell
const navigate = useNavigate(1000);
```

`1000ms delay`

```shell
navigate("/");
```

```shell
navigate("login", false);
```

# .useScroll(..., object|undefined):
* ???

```shell
/**
 * TODO: Under Construction
 * this function is incomplete.
*/
let { x, y } useScroll(".container", { behavior: "smooth" });
```

# .flushAsync(VoidFunction, any):
* ???

```shell
flushAsync(name => {
	console.info(`Hello, ${name}!`);
}, "BoteasyDOM");
```

# .createRoot(container, object|bolean|undefined):
* This function serves to create a route to Boteasy-dom, send the second parameter an object containing an intex with hydrate as true.

```shell
const container = dom.querySelector("#root");
const root = createRoot(container, { hydrate: true });
```

* Render the element in the root;

```shell
const element = <h1>Hello, world!</h1>;
root.render(element);
```

`<h1>Hello, world!</h1>`

* Remove the element in the root;

```shell
root.unmount();
```

# .hydrateRoot(container, component):
* hydrate the element in the root;

```shell
const name = "Boteasy.";
const container = dom.querySelector("#root");
hydrateRoot(container, <h1>Hello, {name}</h1>);
```

`<h1>Hello, Ronaldo S.</h1>`

# .StrictMode():
* ???

```shell
const App = (
	<StrictMode>
		<h1>Hello, world!</h1>
	</StrictMode>
);
```

# .createElement(any, null|object, any[]|undefined);
* This function serves to create elements to be rendered by Boteasy-dom;

```shell
createElement(StrictMode, null,
	createElement(Fragment, null,
		createElement("input", {type: "email", className: "boteasy", style: {color: "#000", fontWeight: "bold"}
		})
	)
);

```

`<input type="email" className="boteasy" style="color: #000;font-weight: bold" />`

# .cssClass():
* This function is for you to add or remove multiple class on one or multiple elements;

```shell
cssClass.add("input, select", "boteasy, dom");
```

```shell
cssClass.remove("input", "dom");
```

# .globalStyle(object):
* ???

```shell
const GlobalStyle = globalStyle({
	color: "#000",
	fontWeight: "bold"
	backgroundColor: "#fff8"
});
```

`<GlobalStyle />`

# .cssStyled(object):
* ???

```shell
const css = cssStyled({
	color: "#ff6347",
	fontWeight: 600
});
```

`<h1 className={css} />`

# .styled(string, object):
* ???

```shell
const Style = cssStyled("boteasy", {
	color: "#ff6347",
	fontWeight: 600
});
```

`<Style><h1>Hello, world!</h1></Style>`

# .rgba(string, number|undefined):
* This function is for you to convert a hex color to rgba!

```shell
rgba("#fff", 0.4); 
```

`rgba(255,255,255,0.4)`