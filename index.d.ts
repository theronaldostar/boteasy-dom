/**
 * @license BoteasyDOM
 * index.d.ts
 * 
 * @copyright (c) since 2020 Boteasy, all rights reserved.
*/
export = BoteasyDOM;

declare namespace BoteasyDOM {
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
	interface RequestProps {
		url: string;
		method?: string;
		headers?: object;
		data?: object;
		dataType?: string;
		success: (success: any) => any;
		error: (error: any) => any;
		finally: (event: any) => any;
	}
	interface Root {
		render: (children: DOMElement) => void;
		unmount: Void;
	}
	interface CSSOptions {
		add(classList: string): void;
		remove(classList: string): void;
		toggle(classList: string): void;
	}
	/**/
	type Void<V = any> = (value: V) => any;
	type Dispatch<D> = (value: D) => void;
	type StateAction<S> = S | ((prev: S) => S);
	type DOMElement = HTMLElement|Element|DocumentFragment;
	/**
	 * @description This function is a direct alternative to "switch ~ case", and is based on the match function of the php language
	*/
	function match<O, I>(object: O, index: I): any;
	/**
	 * @description ???
	*/
	function useId(start?: number): string;
	/**
	 * @description ???
	*/
	function useRef<R>(initialRef: R|(() => R)): {
		value: R;
		setRef: ({ target }: any) => void;
	};
	/**
	 * @description This function serves to add or remove an element in the DOM
	*/
	function useHtml<H>(selector: string, value: H): void;
	/**
	 * @description ???
	*/
	function useAppend<A>(selector: string, element: A, position?: boolean): void;
	/**
	 * @description This function is for you to disable all elements
	*/
	function useWait(action: boolean|string): void;
	/**
	 * @description This function is used to enable/disable elements or select an input type checkbox, for example
	*/
	function useProp<N = undefined>(selector: string, attribute: string, newValue: N): void;
	/**
	 * @description This function serves to perform AJAX requests;
	*/
	function useRequest(props: RequestProps): Promise<any>;
	/**
	 * @description ???
	*/
	function useVibrate(pattern?: number): void;
	/**
	 * @description This function serves to copy a text to a clipboard;
	*/
	function useClipboard(value: string, effect?: Void): void;
	/**
	 * @description As the name says, this function is for you to compare if two objects or array are equal
	*/
	function useTwins<P, S>(primary?: P, secondary?: S): true|false;
	/**
	 * @description ???
	*/
	function useFloat(value: number|string, fixed?: number): number;
	/**
	 * @description This function is just for adding some local states.
	*/
	function useState<S>(initialState: S|(() => S)): [S, Dispatch<StateAction<S>>];
	/**
	 * @description ???
	*/
	function useEffect(effect: Void, deps?: any[]): void;
	/**
	 * @description Manipulates: window.localStorage.
	*/
	function useStorage(): <V>(key?: string, value?: V) => any;
	/**
	 * @description ???
	*/
	function useNavigate(delay?: number): (to?: string, historic?: boolean) => void;
	/**
	 * @description ???
	*/
	function useScroll(a, b?: object): void;
	/**
	 * @description ???
	*/
	function flushAsync<C, A>(callback: (arg: A) => C, arg?: A): Promise<C>;
	/**
	 * @description This function serves to create elements to be rendered by Boteasy-dom
	*/
	function createElement(type: any, props: null|object, ...children: any[]): object;
	/**
	 * @description This function serves to create a route to Boteasy-dom, Send the second parameter an object containing an intex with hydrate as true
	*/
	function createRoot(container: DOMElement, args?: {
		hydrate?: boolean;
		response?: () => any;
	}): Root;
	/**
	 * @description hydrate the element in the root.
	*/
	function hydrateRoot(container: DOMElement, children: DOMElement): void;
	/**
	 * @description StrictMode is a tool for highlighting potential problems in an application. Like Fragment, StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants
	*/
	function StrictMode<P>(props: P): void;
	/**
	 * @description This function is for you to add or remove multiple class on one or multiple elements
	*/
	function cssClass(selector?: string): CSSOptions;
	/**
	 * @description ???
	*/
	function globalStyle<G>(jssObject: G): void;
	/**
	 * @description ???
	*/
	function cssStyled<O>(jssObject: O): string;
	/**
	 * @description ???
	*/
	function styled<O>(tagName: string, jssObject: O): any;
	/**
	 * @description ???
	*/
	function rgba(hex: string, opacity?: number): string;
}
