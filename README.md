# boteasy-dom
* This document is inspired by jQuery and developed by Ronaldo exclusively for the Boteasy platform, but can be used on other platforms.

# How to use?

```shell
npm i boteasy-dom
```

# Import:

```shell
import $ from "boteasy-dom";
```

# .version:
* a boteasy-dom version

```shell
$.version;
```

# .dom:
* document

```shell
$.dom;
```

# .undef:
* undefined

```shell
$.undef;
```

# .link:
* window.location

```shell
$.link;
```

# .storage:
* window.localStorage

```shell
$.storage;
```

# .css():
* This function is for you to add or remove class on one or multiple elements;

```shell
$.css("input").add("class");
```

```shell
$.css("input").remove("class");
```

# .html(target, value):
* This function serves to add or remove an element in the DOM;

```shell
$.html("label", "Just a test!");
```

# .prop(target, bolean):
* This function serves to enable/disable elements;

```shell
$.prop("input", true);
```

```shell
$.prop("input", false);
```

# .tests(target, value):
* This function serves to perform input tests;

```shell
$.tests("input#fullname", "your fullname").then(status => {});
```

# wait(target, bolean):
* This function serves to disable the entire site/App so that the user does not make multiple clicks or leave the page during a request;

```shell
$.wait(true);
```

```shell
$.wait(false);
```

# .copy(value):
* This function serves to copy a text to a clipboard;

```shell
$.copy("Just a test!");
```

# .request({}):
* This function serves to perform AJAX requests;

```shell
$.request({
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

# .createRoot():
* This function serves to add or remove elements or routes from the document;

```shell
const container = $.dom.querySelector("#modal");
const modal = $.createRoot(container);
```

* Render the element/route in the document;

```shell
modal.render(<>Boteasy</>);
```

* Remove the element/route in the document;

```shell
modal.unmount();
```