# [BoteasyDOM](https://boteasy.net/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/theronaldostar/boteasy-dom/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/boteasy-dom.svg?style=flat)](https://www.npmjs.com/package/boteasy-dom) [![npm version](https://badge.fury.io/js/boteasy-dom.svg)](https://www.npmjs.com/package/boteasy-dom) [![Downloads](https://img.shields.io/npm/dm/boteasy-dom.svg)](https://www.npmjs.com/package/boteasy-dom)

-   This document is inspired by React, React-router, jQuery and styled-components, the aim is to have a merge of everything good in one documentation.

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
import { useState, createRoot } from "boteasy-dom";

const App = () => {
	const [count, setCount] = useState(0);
	return (
		<>
			<h1>{count}</h1>
			<button onClick={() => setCount(prev => prev + 1)}>Increment</button>
		</>
	);
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
```

# Import:

```shell
import BoteasyDOM from "boteasy-dom";
/**
 * @jsx jsxDEV
 * @jsxFrag Fragment
 * @jsxRuntime classic
*/
const {  } = BoteasyDOM;
```

# .theme:

-   ???

```shell
const scheme = theme;
```

# .version:

-   A boteasy-dom version

```shell
const ver = version;
```

# .Fragment:

-   Allows a component to return multiple elements grouped a list of children without adding extra nodes to the DOM

```shell
<>{/*@__DATA__*/}</>
```

# .match(object, string|null):

-   This function is a direct alternative to "switch ~ case", and is based on the match function of the php language

```shell
const index = null;
match({
	first: "boteasy",
	last: "dom",
	default: "test"
}, index);
```

# .useId(number|undefined, boolean|undefined):

-   ???

```shell
const inputId = useId(2);
```

`returns: :string:`

```shell
const inputId = useId(2, true);
```

`returns: string`

`<input type="text" id={inputId} />`

`jsxDEV("input", {type: "text", id: inputId})`

# .useRef(any|function):

-   ???

```shell
const email = useRef(() => {
	let name = "boteasy.dom";
	return `${name}@example.com`;
});
```

`<input type="email" ref={email} />`

`jsxDEV("input", {type: "email", ref: email})`

`let yourEmail = email.value;`

# .useHtml(selector, value):

-   This function serves to add or remove an element in the DOM

```shell
useHtml("#root", `<h1>Hello, world!</h1>`);
```

# .useAppend(selector, string, boolean|undefined):

-   ???

```shell
useAppend("#root", `<div>Text</div>`);
```

`Just inside the element, before its first child.`

```shell
useAppend("#root", `<div>Text</div>`, true);
```

`Just inside the element, after its last child.`

# .useWait(bolean|string):

-   This function is for you to disable all elements;

```shell
useWait(true);
```

```shell
useWait(false);
```

# .useProp(selectors, attribute, any):

-   This function is used to enable/disable elements or select an input type checkbox, for example;

```shell
useProp("input, select", "disabled", true);
```

```shell
useProp("input", "disabled", false);
```

# .useRequest({}):

-   This function serves to perform AJAX requests;

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

-   ???

```shell
useVibrate(100);
```

`100ms`

```shell
useVibrate([500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]);
```

`starwars`

```shell
useVibrate([150, 150, 150, 150, 75, 75, 150, 150, 150, 150, 450]);
```

`powerrangers`

# .useClipboard(string, function|undefined):

-   This function serves to copy a text to a clipboard;

```shell
const text = "Just a test!";
useClipboard(text, () => {
	console.info("Text copied to clipboard.");
});
```

# .isObj(any):

-   ???

```shell
const is = isObj({ name: "Boteasy" });
```

# .useTwins(string|{}|[], string|{}|[]):

-   As the name says, this function is for you to compare if two objects or array are equal.

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

-   ???

```shell
const total = 100.123;
useFloat(total, 2);
```

# .useState(any|function):

-   This function is just for adding some local states.

```shell
const [state, setState] = useState(9);
setState(prev => (prev + 1));
```

# .useEffect(function, []|undefined):

-   ???

```shell
let name = "boteasy";
const boteasyTest = text => console.info(`Hello, ${text}!`);
useEffect(() => {
	boteasyTest(name);
	/**
	 * TODO: Under Construction
	 * this function is incomplete.
	*/
	return () => console.info("Bye, world!");
}, [name]);
```

# .useStorage():

-   Manipulates: window.localStorage.

```shell
const storage = useStorage();
```

# (string, any|function):

```shell
storage("theme", () => {
	const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
	return prefers ? "dark" : "light"
});
```

`set`

```shell
storage("theme");
```

`get`

```shell
storage()("theme");
```

`remove`

```shell
storage()();
```

`clear`

# .useNavigate(number|undefined):

-   ???

```shell
const navigate = useNavigate(1000);
```

`1000ms delay`

# (string, boolean|undefined):

`Send the second parameter as false, to removes the current page from the session history and navigates to the given URL.`

```shell
navigate();
```

`reload`

```shell
navigate("login");
```

```shell
navigate("https://www.example.com/", false);
```

# .useScroll(string, object|undefined):

-   ???

```shell
const { width, height, x, y } = useScroll("#root", { behavior: "smooth", offset = { top: 200, left: 0 } });
```

`methods`

```shell
height; //number
```

```shell
y.value; //number
```

```shell
y.setScroll(100);
```

```shell
y.start();
```

```shell
y.end();
```

# .flushAsync(function, any):

-   ???

```shell
flushAsync(event => {
	console.info(`Hello, ${event.name}!`);
}, { name: "Boteasy" });
```

# .createRoot(container, object|bolean|undefined):

-   This function serves to create a route to Boteasy-dom, send the second parameter an object containing an intex with hydrate as true.

```shell
const container = document.querySelector("#root");
const root = createRoot(container, {
	hydrate: true,
	response: () => {
		console.info("rendered");
	}
});
```

-   Render the element in the root;

```shell
const element = <h1>Hello, world!</h1>;
root.render(element);
```

`<h1>Hello, world!</h1>`

-   Remove the element in the root;

```shell
root.unmount();
```

# .hydrateRoot(container, component):

-   hydrate the element in the root;

```shell
const name = "Boteasy";
const container = document.querySelector("#root");
hydrateRoot(container, <h1>Hello, {name}.</h1>);
```

`<h1>Hello, Ronaldo S.</h1>`

# .StrictMode():

-   ???

```shell
const App = (
	<StrictMode element={<h1>Hello, world!</h1>} />
);
```

```shell
const App = (
	<StrictMode>
		<h1>Hello, world!</h1>
	</StrictMode>
);
```

# .StyleProvider({ theme: object }|undefined):

-   ???

```shell
const provider = {color: "#000", fontWeight: "bold"};
```

```shell
const App = (
	<StyleProvider theme={provider}>
		<>{/*@__DATA__*/}</>
	</StyleProvider>
);
```

```shell
const App = (
	<StyleProvider theme={provider} element={<>{/*@__DATA__*/}</>} />
);
```

# .createElement(any, null|object, any[]|undefined):

# .jsxDEV(any, null|object, any[]|undefined):

-   This function serves to create elements to be rendered by Boteasy-dom;

```shell
createElement(StrictMode, null,
	createElement(Fragment, null,
		createElement("input", {type: "email", className: "boteasy", style: {color: "#000", fontWeight: "bold"}
		})
	)
);
```

```shell
jsxDEV(StrictMode, null,
	jsxDEV(Fragment, null,
		jsxDEV("input", {type: "email", className: "boteasy", style: {color: "#000", fontWeight: "bold"}
		})
	)
);
```

`Both methods are the same.`

`<input type="email" class="boteasy" style="color: #000;font-weight: bold">`

# .cssClass(string|undefined):

-   This function is for you to add or remove multiple class on one or multiple elements;

```shell
cssClass("input, select").toggle("boteasy, dom");
```

```shell
const css = cssClass("input, select");
```

```shell
css.add("boteasy, dom");
```

```shell
css.remove("dom");
```

```shell
css.toggle("dom");
```

# .useMarginClass(string | string[]):

-   ???

```shell
const baseClass = useMarginClass("boteasy");
```

`"boteasy"`

```shell
const baseClass = useMarginClass("boteasy", "dom");
```

` "boteasy dom"`

```shell
<div className={baseClass}>...</div>
```

`"<div class="boteasy dom">...</div>"`

# .globalStyle(object):

-   ???

```shell
const GlobalStyle = globalStyle({
	color: "#000",
	fontWeight: "bold"
	backgroundColor: "#fff8"
});
```

`<GlobalStyle />`

`GlobalStyle()`

# .cssStyled(object):

-   ???

```shell
const css = cssStyled({
	color: "#ff6347",
	fontWeight: 600
});
```

`<h1 class={css} />`

`jsxDEV("h1", {className: css});`

# .styled(string, object):

-   ???

```shell
const Style = cssStyled("boteasy-dom", {
	color: "#ff6347",
	fontWeight: 600
});
```

```
<Style>
	<h1>Hello, world!</h1>
</Style>
```

`jsxDEV(Style, null, jsxDEV("h1", null, "Hello, world!"));`

`final:`

```
<boteasy-dom class="jss-...">
	<h1>Hello, world!</h1>
</boteasy-dom>
```

# .rgba(string, number|undefined):

-   This function is for you to convert a hex color to rgba!

```shell
rgba("#fff", 0.4);
```

`rgba(255,255,255, 0.4)`

```shell
rgba("black", .2);
```

`rgba(0,0,0, 0.2)`
