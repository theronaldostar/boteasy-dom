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
export declare const link: Location;

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

export declare const html: (target: string, value: any) => void;
export declare const prop: (target: any, value: any) => void;
export declare const wait: (action: boolean) => void;
export declare const tests: (element: string, value: number|string) => Promise<any>;
export declare const request: (props: object) => Promise<any>;
export declare const copy: (value: any) => void;

export declare const createRoot: (container: object, $hydrate?: boolean) => {
    render: (children: object) => void;
    hydrate: (children: object) => void;
    unmount: () => void;
};

export declare const createElement: (type: any, props: any, ...children: any[]) => any;
export declare const useState: (initialState?: any) => any[];
export declare const match: (object: object, index: any, change?: any) => any;