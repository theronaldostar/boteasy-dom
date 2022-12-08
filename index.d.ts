/**
 * @license BoteasyDOM
 * index.d.ts
 * 
 * @copyright (c) since 2020 Boteasy, all rights reserved.
*/
export = BoteasyDOM;

declare namespace BoteasyDOM {
	/**
	 * @description ???
	 */
	let theme: object;
	/**
	 * @description a boteasy-dom version
	 */
	const version: String;
	/**
	 * @description The Document interface represents any web page loaded in the browser and serves as an entry point into the web page's content, which is the DOM tree
	 */
	const dom: Document;
	/**
	 * @description Allows a component to return multiple elements grouped a list of children without adding extra nodes to the DOM
	 */
	const Fragment: Symbol;
	/**/
	type Void<V = any> = (value: V) => any;
	type Dispatch<D> = (value: D) => void;
	type StateAction<S> = S | ((prev: S) => S);
	type DOMElement = Element|HTMLElement|DocumentFragment;
	/**/
	type RequestError<J = any> = {
		responseText: string;
		responseJSON: J;
		type: string;
		status: string;
		statusText: string;
	};
	type RequestProps<R> = {
		url: string;
		method?: string;
		headers?: object;
		data?: object;
		dataType?: string;
		success?: Void<R>;
		error?: Void<RequestError<R>>;
		finally?: Void;
	}
	type Root = {
		render: (children: DOMElement) => void;
		unmount: Void;
	}
	type CSSOptions = {
		add: (classList: string) => void;
		remove: (classList: string) => void;
		toggle: (classList: string) => void;
	}
	/**
	 * @description This function is a direct alternative to "switch ~ case", and is based on the match function of the php language
	 */
	const match: <O>(object: O, index: string) => any;
	/**
	 * @description ???
	 */
	const useId: (start?: number, selectable?: boolean) => string;
	/**
	 * @description ???
	 */
	const useRef: <R>(initialRef: R|(() => R)) => {
		value: R;
		setRef: ({ target }: any) => void;
	};
	/**
	 * @description This function serves to add or remove an element in the DOM
	 */
	const useHtml: <H>(selector: string, value: H) => void;
	/**
	 * @description ???
	 */
	const useAppend: <A>(selector: string, element: A, position?: boolean) => void;
	/**
	 * @description This function is for you to disable all elements
	 */
	const useWait: (action: boolean|string) => void;
	/**
	 * @description This function is used to enable/disable elements or select an input type checkbox, for example
	 */
	const useProp: <N = undefined>(selector: string, attribute: string, newValue: N) => void;
	/**
	 * @description This function serves to perform AJAX requests;
	 */
	const useRequest: <R>(props: RequestProps<R>) => Promise<any>;
	/**
	 * @description ???
	 */
	const useVibrate: (pattern?: number) => void;
	/**
	 * @description This function serves to copy a text to a clipboard;
	 */
	const useClipboard: (value: string, effect?: Void) => void;
	/**
	 * @description ???
	 */
	const isObj: <O>(data: O) => true|false;
	/**
	 * @description As the name says, this function is for you to compare if two objects or array are equal
	 */
	const useTwins: <P, S>(primary?: P, secondary?: S) => true|false;
	/**
	 * @description ???
	 */
	const useFloat: <V>(value: V, fixed?: number) => number;
	/**
	 * @description This function is just for adding some local states.
	 */
	const useState: <S>(initialState: S|(() => S)) => [S, Dispatch<StateAction<S>>];
	/**
	 * @description ???
	 */
	const useEffect: (effect: Void, deps?: any[]) => void;
	/**
	 * @description Manipulates: window.localStorage.
	 */
	const useStorage: () => <V>(key?: string, value?: V) => any;
	/**
	 * @description ???
	 */
	const useNavigate: (delay?: number) => (to?: string, historic?: boolean) => void;
	/**
	 * @description ???
	 */
	const useScroll: (a: any, b: any) => void;
	/**
	 * @description ???
	 */
	const flushAsync: <C, A>(callback: (arg: A) => C, arg?: A) => Promise<C>;
	/**
	 * @description This function serves to create elements to be rendered by Boteasy-dom
	 */
	const createElement: (type: any, props: object|null, ...children: any[]) => object;
	/**
	 * @description This function serves to create a route to Boteasy-dom. Send the second parameter an object containing an intex with hydrate as true
	 */
	const createRoot: (container: DOMElement, args?: {
		hydrate?: boolean;
		response?: Void;
	}) => Root;
	/**
	 * @description hydrate the element in the root.
	 */
	const hydrateRoot: (container: DOMElement, children: DOMElement) => void;
	/**
	 * @description StrictMode is a tool for highlighting potential problems in an application. Like Fragment, StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants
	 */
	const StrictMode: <S = { element?: DOMElement, children?: DOMElement }>(props: S) => void;
	/**
	 * @description ???
	 */
	const StyleProvider: <P>(props: P) => void;
	/**
	 * @description This function is for you to add or remove multiple class on one or multiple elements
	 */
	const cssClass: (selector?: string) => CSSOptions;
	/**
	 * @description ???
	 */
	const globalStyle: <G>(jssObject: G) => void;
	/**
	 * @description ???
	 */
	const cssStyled: <C>(jssObject: C) => string;
	/**
	 * @description ???
	 */
	const styled: <S>(tagName: string, jssObject: S) => any;
	/**
	 * @description ???
	 */
	const rgba: (hex: string, opacity?: number) => string;
}
