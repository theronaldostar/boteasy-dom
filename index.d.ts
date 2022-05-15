/**
 * @license BoteasyDOM
 * @file index.d.ts
 * 
 * @copyright (c) since 2020 Boteasy, all rights reserved.
*/

export as namespace BoteasyDOM;

/**
 * @description a boteasy-dom version
*/
export declare const version: String;

/**
 * @description Fragment for components
*/
export declare const Fragment: Number;

/**
 * @description The Document interface represents any web page loaded in the browser and serves as an entry point into the web page's content, which is the DOM tree.
*/
export declare const dom: Document;

/**
 * @description Get information or change your app's URL, easily and accurately!
 * 
 * @to The link.to("url", true) method  replaces the current resource with the one at the provided URL. The difference from the link.to("url") method is that after using link.to("url", true) the current page will not be saved in session History, meaning the user won't be able to use the back button to navigate to it.
 * @reload The reload may be blocked and a SECURITY_ERROR DOMException thrown. This happens if the origin of the script calling link.reload() differs from the origin of the page that owns the Location object.
 * @protocol The protocol property of the URL interface is a USVString representing the protocol scheme of the URL, including the final ':'.
 * @host The host property of the URL interface is a USVString containing the host, that is the hostname, and then, if the port of the URL is nonempty, a ':', followed by the port of the URL.
 * @route The link.route of the link interface is a string containing the path of the URL for the location, which will be the empty string if there is no path.
*/
export declare const link: {
	to: (url?: string, historic?: boolean) => void;
	reload: (time?: number) => void;
	protocol: string;
	host: string;
	route: string;
};

/**
 * @description Manipulates: window.localStorage
*/
export declare const storage: {
	set: (key: string, value?: any) => void;
	get: (key: string) => any;
	remove: (key: string) => void;
	clear: (key: string) => void;
};

/**
 * @description This function is for you to add or remove class on one or multiple elements;
*/
export declare const css: {
	add: (target: string, value: string) => void;
	remove: (target: string, value: string) => void;
};

/**
 * @description This function serves to add or remove an element in the DOM;
*/
export declare const html: (target: string, newvalue: any) => void;

/**
 * @description This function serves to add or remove an element in the DOM;
*/
export declare const prop: (target: string, prop: string, newValue: string|boolean) => void;

/**
 * @description This function serves to disable the entire site/App so that the user does not make multiple clicks or leave the page during a request;
*/
export declare const wait: (action: string|boolean) => void;

/**
 * @description This function serves to perform input tests;
*/
export declare const tests: (element: string, value: number|string) => Promise<any>;

/**
 * @description This function serves to perform AJAX requests;
*/
export declare const request: (props: {
	url: string;
	method?: string;
	headers?: object;
	data?: object;
	dataType?: string;
	cors?: boolean;
	success?: (data: any) => any;
	error?: (error: any) => any;
}) => Promise<any>;

/**
 * @description This function serves to copy a text to a clipboard;
*/
export declare const copy: (value: any) => void;

/**
 * @description This function serves to create a route to Boteasy-dom,
 * Send the second parameter as  true to give permission to hydrate;
 * 
 * @render Render the element in the root;
 * @hydrate Hydrate the element in the root;
 * @unmount Remove the element from the root;
*/
export declare const createRoot: (container: any, $hydrate?: boolean) => {
	render: (children: any) => void;
	hydrate: (children: any) => void;
	unmount: () => void;
};

/**
 * @description This function serves to create elements to be rendered by Boteasy-dom;
*/
export declare const createElement: (type: any, props: any, ...children: any) => any;

/**
 * @description This function is just for adding some local states.
*/
export declare const useState: (initialState?: any) => any[];

/**
 * @description ...
*/
export declare const useEffect: (effect: () => void, deps?: any[]) => any;

/**
 * @description This function is a direct alternative to "switch ~ case", and is based on the match function of the php language.
*/
export declare const match: (object: object, index: any) => any;

/**
 * @description This function serves precisely to compare two objects!
*/
export declare const isTwins: (first?: any, last?: any) => true|false;

/**
 * @description Function parses an argument (converting it to a string or number first if needed) and returns a floating point number.
*/
export declare const toFloat: (amount: number|string, fixed?: number) => number;