# boteasy-dom
* This document is inspired by jQuery and developed by Ronaldo exclusively for the Boteasy platform, but can be used on other platforms.

# How to use?

```shell
npm i boteasy-dom
```

# Import:

```shell
import Boteasy from "boteasy-dom";
```

# .css(true|false, target, value):
* This function is for you to add or remove class on one or multiple elements;

```shell
Boteasy.css(true, "input", "active"); /* add */
```

```shell
Boteasy.css(false, "input", "active"); /* remove */
```

# .html(target, value):
* This function serves to add or remove an element in the DOM;

```shell
Boteasy.html("div", "Just a test!");
```

# .prop(target, true|false):
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
Boteasy.tests("input#CPF", "000.000.000-00").then((status) => {
	/**
	 * 
	*/
});
```

# wait(target, true|false):
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
	data: {},
	dataType: "json",
	cors: false, /* true|false */
	success: () => {},
	error: () => {}
});
```