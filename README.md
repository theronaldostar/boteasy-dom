# boteasy-dom
- Esta documentação é inspirada no jQuery e desenvolvido exclusivamente para a plataforma Boteasy, mas está liberado o uso para quais quer outras aplicações.

# Como usar?

```shell
npm install boteasy-dom
```

# Importação:

```shell
import Boteasy from "boteasy-dom";
```

# css(target, value):
- Essa função serve para você adicionar ou remover class sobre um ou múltiplos elementos;

```shell
Boteasy.css.add("input, body", "active");
```

```shell
Boteasy.css.remove("input, body", "active");
```

# html(target, value):
- Essa função serve para adicionar um elemento na DOM ou efetuar a remoção;

```shell
Boteasy.html("div", "Apenas um teste!");
```
# prop(target, true|false):
- Essa função serve para habilitar/desabilitar elementos;

```shell
Boteasy.prop("input", true|false);
```
# tests(target, value):
- Essa função serve para efetuar testes de inputs;

```shell
Boteasy.tests("input", "Exemplo CPF(somente os numeros): 000.000.000-00").then((status) => {
	//
});
```

# wait(target, value):
- Essa função serve para desabilitar todo o site/App para que o usuário não efetue múltiplos clique ou sair da pagina durante uma requisição;

```shell
Boteasy.wait(true|false);
```

# copy(value):
- Essa função serve para copiar um texto para a área de transferência;

```shell
Boteasy.copy("Apenas um teste!");
```
# request({}):
- Essa função serve para efetuar requisições AJAX;

```shell
Boteasy.request({
	url: "",
	method: "GET",
	data: {},
	dataType: "json",
	cors: true|false,
	success: () => {},
	error: () => {}
});
```