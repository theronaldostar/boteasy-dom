/**
 * @license Boteasy-DOM
 * index.d.ts
 * 
 * @copyright (c) since 2021 Boteasy, all rights reserved.
*/

declare namespace BoteasyDOM {
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
	/**/
	type RequestProps<R> = {
		url: string;
		method?: string;
		headers?: object;
		data?: object;
		dataType?: string;
		success?: Void<R>;
		error?: Void<RequestError<R>>;
		finally?: Void;
	};
	/**/
	type Scroll = {
		behavior?: "auto" | "smooth";
		offset?: {
			top?: number;
			left?: number;
		};
	};
	/**/
	type ScrollProps = {
		value: number;
		start(): void;
		end(): void;
		setScroll(value: number): void;
	};
	/**/
	type Root = {
		render: (children: DOMElement) => void;
		unmount: Void;
	};
	/**/
	type CSSOptions = {
		add: (classList: string) => void;
		remove: (classList: string) => void;
		toggle: (classList: string) => void;
	};
	/**
	 * @description ???
	 */
	let theme: object;
	/**
	 * @description a boteasy-dom version
	 * @example
	 * console.log(version);
	 */
	const version: String;
	/**
	 * @description Allows a component to return multiple elements grouped a list of children without adding extra nodes to the DOM
	 * @example
	 * createElement(Fragment, null, "loading");
	 */
	const Fragment: Symbol;
	/**
	 * @description This function is a direct alternative to "switch ~ case", and is based on the match function of the php language
	 * @example
	 * const index = null;
	 * match({
	 * 	first: "boteasy",
	 * 	last: "dom",
	 * 	default: "test"
	 * }, index); //test
	 */
	const match: <O>(object: O, index: string) => any;
	/**
	 * @description ???
	 * @example
	 * const inputId = useId(2);// :hu3hu3br:
	 * (<><label htmlFor={inputId}><input id={inputId} /></>);
	 * //^<label for=":hu3hu3br:">One Label:</label>
	 * //^<input id=":hu3hu3br:" />
	 */
	const useId: (start?: number, selectable?: boolean) => string;
	/**
	 * @description ???
	 * @example
	 * const email = useRef(() => {
	 * 	let name = "boteasy.dom";
	 * 	return `${name}@example.com`;
	 * });
	 * (<input type="email" ref={email} />);
	 */
	const useRef: <R>(initialRef: R|(() => R)) => {
		value: R;
		setRef: ({ target }: any) => void;
	};
	/**
	 * @description This function serves to add or remove an element in the DOM
	 * @example
	 * useHtml("#root", `<h1>Hello, world!</h1>`);
	 */
	const useHtml: <H>(selector: string, value: H) => void;
	/**
	 * @description ???
	 * @example
	 * useAppend("#root", `<div>Text</div>`);
	 * //^Just inside the element, before its first child.
	 * useAppend("#root", `<div>Text</div>`, true);
	 * //^Just inside the element, after its last child.
	 */
	const useAppend: <A>(selector: string, element: A, position?: boolean) => void;
	/**
	 * @description This function is for you to disable all elements
	 * @example
	 * useWait(true);//Block any interaction
	 * useWait(false);
	 */
	const useWait: (action: boolean|string) => void;
	/**
	 * @description This function is used to enable/disable elements or select an input type checkbox, for example
	 * @example
	 * useProp("input, select", "disabled", true);
	 * //^Disable all input elements and select elements.
	 * useProp("input", "disabled", false);
	 */
	const useProp: <N = undefined>(selector: string, attribute: string, newValue: N) => void;
	/**
	 * @description This function serves to perform AJAX requests;
	 * @example
	 * useRequest({
	 * 	url: "https://www.example.com/api/",
	 * 	method: "GET",
	 * 	headers: {},
	 * 	data: {},
	 * 	dataType: "json",
	 * 	success: () => {},
	 * 	error: () => {},
	 * 	finally: () => {}
	 * });
	 */
	const useRequest: <R>(props: RequestProps<R>) => Promise<any>;
	/**
	 * @description ???
	 * @example
	 * useVibrate(100);
	 * //^Vibrate for 100 milliseconds.
	 * useVibrate([500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]);
	 * //^Vibrate in format starwars.
	 */
	const useVibrate: (pattern?: number) => void;
	/**
	 * @description This function serves to copy a text to a clipboard;
	 * @example
	 * const text = "Just a test!";
	 * useClipboard(text, () => {
	 * 	console.info("Text copied to clipboard.");
	 * });
	 */
	const useClipboard: (value: string, effect?: Void) => void;
	/**
	 * @description ???
	 * @example
	 * const is = isObj({ name: "Boteasy" });
	 */
	const isObj: <O>(data: O) => true|false;
	/**
	 * @description As the name says, this function is for you to compare if two objects or array are equal
	 * @example
	 * const array = ["boteasy", "dom"];
	 * const array2 = ["boteasy", "dom", "version": ["latest"]];
	 * useTwins(array, array2);//false
	 */
	const useTwins: <P, S>(primary?: P, secondary?: S) => true|false;
	/**
	 * @description ???
	 * @example
	 * const total = 100.12345678;
	 * useFloat(total, 2);//100.12
	 */
	const useFloat: <V>(value: V, fixed?: number) => number;
	/**
	 * @description This function is just for adding some local states.
	 * @example
	 * const [state, setState] = useState(9);
	 * setState(prev => (prev + 1));
	 */
	const useState: <S>(initialState: S|(() => S)) => [S, Dispatch<StateAction<S>>];
	/**
	 * @description ???
	 * @example
	 * let name = "boteasy";
	 * const boteasyTest = text => console.info(`Hello, ${text}!`);
	 * useEffect(() => {
	 * 	boteasyTest(name);
	 * 	//TODO: Under Construction
	 * 	//this function is incomplete.
	 * 	return () => console.info("Bye, world!");
	 * }, [name]);
	 */
	const useEffect: (effect: Void, deps?: any[]) => void;
	/**
	 * @description Manipulates: window.localStorage.
	 * @example
	 * const storage = useStorage();
	 * storage("theme", () => {
	 * 	const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
	 * 	return prefers ? "dark" : "light"
	 * });//SET
	 * storage("name");//GET
	 * storage()("name");//DELETE
	 * storage()();//CLEAR
	 */
	const useStorage: () => <V>(key?: string, value?: V) => any;
	/**
	 * @description Send the second parameter as false, to removes the current page from the session history and navigates to the given URL.
	 * @example
	 * const navigate = useNavigate(1000);
	 * //^1000ms
	 * navigate();
	 * //^reload
	 * navigate("https://www.example.com/", false);
	 * //^1000ms later, the browser will navigate to "https://www.example.com/" page
	 */
	const useNavigate: (delay?: number) => (to?: string, historic?: boolean) => void;
	/**
	 * @description ???
	 * @example
	 * const { x, y } = useScroll("#root", {
	 * 	behavior: "smooth",
	 * 	offset = { top: 200, left: 0 }
	 * });
	 */
	const useScroll: (selector: string, options?: Scroll) => {
		x: ScrollProps;
		y: ScrollProps;
	};
	/**
	 * @description ???
	 * @example
	 * flushAsync(data => {
	 * 	console.log(data);
	 * }, "Hello World");
	 */
	const flushAsync: <C, A>(callback: (arg: A) => C, arg?: A) => Promise<C>;
	/**
	 * @description This function serves to create elements to be rendered by Boteasy-dom
	 * @example
	 * createElement("div", {id: "root"}, "loading");//<div id="root">loading</div>
	 */
	const createElement: (type: any, props: object|null, ...children: any[]) => object;
	/**
	 * @description This function serves to create a route to Boteasy-dom. Send the second parameter an object containing an intex with hydrate as true
	 * @example
	 * createRoot(container, {
	 * 	hydrate: true,
	 * 	response: () => console.log("Hello World");
	 * });
	 */
	const createRoot: (container: DOMElement, args?: {
		hydrate?: boolean;
		response?: Void;
	}) => Root;
	/**
	 * @description hydrate the element in the root.
	 * @example
	 * hydrateRoot(container, <Component />);
	 */
	const hydrateRoot: (container: DOMElement, children: DOMElement) => void;
	/**
	 * @description StrictMode is a tool for highlighting potential problems in an application. Like Fragment, StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants
	 * @example
	 * const App = <>Boteasy</>;
	 * (<StrictMode><App /></StrictMode>)
	 * (<StrictMode element={<App />} />)
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
	 * @example
	 * const Global = globalStyle({ color: "#fff", backgroundColor: "#252525" });
	 * (<Global />);
	 */
	const globalStyle: <G>(jssObject: G) => void;
	/**
	 * @description ???
	 * @example
	 * const css = cssStyled({
	 * 	color: "tomato",
	 * 	fontWeight: 600
	 * });
	 * (<h1 class[Name]={css}></h1>);
	 */
	const cssStyled: <C>(jssObject: C) => string;
	/**
	 * @description ???
	 * @example
	 * const Style = styled("boteasy-dom", { color: "#fff", padding: 8, backgroundColor: "tomato" });
	 * (<Style></Style>);//<boteasy-dom></boteasy-dom>
	 */
	const styled: <S>(tagName: string, jssObject: S) => any;
	/**
	 * @description ???
	 * @example
	 * rgba("#fff", 0.4);
	 * rgba("black", 0.2);
	 */
	const rgba: (color: string, opacity?: number) => string;
}

export = BoteasyDOM;
