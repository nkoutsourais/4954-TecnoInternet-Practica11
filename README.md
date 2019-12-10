# 4954-TecnoInternet-Practica11

La practica simula un proceso de tareas costoso con distintos protocolos para las comunicaciones.

Hay dos formas de ejecutar la practica:

## Por Node
1. Ejecutar

```json
node install.js
```

2. Ejecutar

```json
node exec.js
```

### Por pasos separados
1. Compilar con maven InterfaceGrpc dentro de Worker para generar las clases protocol buffers

```java
mvn install Worker/InterfaceGrpc
```

2. Arrancar External Service

```json
node External Service/src/server.js
```

3. Arrancar Worker desde Application.java con springboot

```java
mvn run Worker/Worker
```

4. Arrancar Server

```json
node Server/src/server.js
```

5. Arrancar Client/src/client.js

```js
node Client/src/client.js
```
