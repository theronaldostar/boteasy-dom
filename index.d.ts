/**
 * @license BoteasyDOM
 * index.d.ts
 * 
 * Copyright (c) since 2020 Boteasy, all rights reserved.
 */

export as namespace BoteasyDOM;

export declare const version: String;

export declare const Fragment: Number;

export declare const dom: Document;

export declare const link: {
	to: (url?: string, historic?: boolean) => void;
	reload: (time?: number) => void;
	protocol: string;
	host: string;
	route: string;
};

export declare const storage: {
	set: (key: string, value?: any) => void;
	get: (key: string) => any;
	remove: (key: string) => void;
	clear: (key: string) => void;
};

export declare const css: {
	add: (target: string, value: string) => void;
	remove: (target: string, value: string) => void;
};

export declare function html(target: string, value: any): void;

export declare function prop(target: any, value: any): void;

export declare function wait(action: boolean): void;

export declare function tests(element: "fullname" | "birthday" | "email" | "password" | "phone" | "PIXRandom" | "CPF" | "CNPJ", value: number|string): Promise<any>;

export declare function request(props: {
	url: string;
	method: string;
	headers?: object;
	data?: object;
	dataType?: string;
	cors?: boolean;
	success?: (data: any) => void;
	error?: (error: any) => void;
}): Promise<any>;

export declare function copy(value: any): void;

export declare function createRoot(container: any, $hydrate?: boolean): {
	render: (children: any) => void;
	hydrate: (children: any) => void;
	unmount: () => void;
};

export declare function createElement(type: any, props: any, ...children: any): any;

export declare function useState(initialState?: any): any[];

export declare function match(object: object, index: any): any;

export declare function useEffect(effect?: () => void, deps?: any): any;