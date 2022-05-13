/**
 * @license BoteasyDOM
 * index.d.ts
 * 
 * Copyright (c) since 2020 Boteasy, all rights reserved.
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
 * @description document
*/
export declare const dom: Document;

/**
 * @description Get information or change your app's URL, easily and accurately!
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
 * 
 * @add 
*/
export declare const css: {
	add: (target: string, value: string) => void;
	remove: (target: string, value: string) => void;
};

/**
 * @description This function serves to add or remove an element in the DOM;
*/
export declare function html(target: string, value: any): void;

/**
 * @description This function serves to add or remove an element in the DOM;
*/
export declare function prop(target: any, value: any): void;

/**
 * @description This function serves to disable the entire site/App so that the user does not make multiple clicks or leave the page during a request;
*/
export declare function wait(action: boolean): void;

/**
 * @description This function serves to perform input tests;
*/
export declare function tests(element: string, value: number|string): Promise<any>;

/**
 * @description This function serves to perform AJAX requests;
*/
export declare function request(props: {
	url: string;
	method?: string;
	headers?: object;
	data?: object;
	dataType?: string;
	cors?: boolean;
	success?: (data: any) => any;
	error?: (error: any) => any;
}): Promise<any>;

/**
 * @description This function serves to copy a text to a clipboard;
*/
export declare function copy(value: any): void;

/**
 * @description This function serves to create a route to Boteasy-dom,
 * Send the second parameter as  true to give permission to hydrate;
 * 
 * @render Render the element in the root;
 * @hydrate Hydrate the element in the root;
 * @remove Remove the element from the root;
*/
export declare function createRoot(container: any, $hydrate?: boolean): {
	render: (children: any) => void;
	hydrate: (children: any) => void;
	unmount: () => void;
};

/**
 * @description This function serves to create elements to be rendered by Boteasy-dom;
*/
export declare function createElement(type: any, props: any, ...children: any): any;

/**
 * @description This function is just for adding some local states.
*/
export declare function useState(initialState?: any): any[];

/**
 * @description ...
*/
export declare function useEffect(effect: () => void, deps?: any[]): any;

/**
 * @description This function is a direct alternative to "switch ~ case", and is based on the match function of the php language.
*/
export declare function match(object: object, index: any): any;

/**
 * @description This function serves precisely to compare two objects!
*/
export declare function isEqual(first?: any, last?: any): true|false;
