## Proyecto Angular - Gestión de Productos

Este proyecto es una aplicación en Angular para la gestión de productos, diseñada con una **arquitectura** basada en capas y casos de uso (Use Cases) para mantener el código ordenado y escalable a cualquier consumo de api.

## Arquitectura del proyecto

- **domain**: Contiene los modelos, interfaces y casos de uso de negocio (Use Cases). Evita cualquier dependencia externa.
- **application**: Servicios que conectan los casos de uso con la infraestructura. Se encargan de la lógica de la app.
- **infrastructure**: Todo lo relacionado con APIs, repositorios y comunicación con el backend.
- **core**: Servicios generales, herramientas y componentes compartidos (como `ToastService` y `ToastComponent`).
- **shared**: Componentes reutilizables a nivel de UI, como loading spinners,headers o diálogos de confirmación.
- **features**: Funcionalidades concretas, en este caso el manejo de productos (`product-list`, `product-form`).

## Como iniciar el proyecto

1. Clonar el proyecto
2. Instalar dependencias ejecutando `npm install`
3. Levantar el proyecto con `npm start` ó `ng serve` (asegurarse de estar ubicados en la carpeta raiz)
4. El proyecto se levantará en la ruta por defecto **http://localhost:4200/**



## Tests

En este proyecto implementamos **dos tipos de tests**:

### 1. **Tests unitarios con Karma + Jasmine**

Aunque **Jest** era un requisito inicial, por criterios de compatibilidad con Angular standalone components y el setup existente, se decidió usar **Karma + Jasmine**. Esto permitió:

- Ejecutar tests directamente desde `ng test`.
- Obtener reportes de coverage completos.
- Mockear dependencias externas (HttpClient, repositorios, servicios) sin tocar la lógica de negocio.

**Cobertura de componentes y servicios**

- **Componentes**: Se testea la creación, interacción de formularios, validaciones, triggers de eventos y comportamiento visual.
- **Servicios**: Se mockean dependencias externas (como `HttpClient` o repositorios) y se verifican llamadas a métodos, resultados y errores.
- **Utilidades**: Se testean funciones puras como `formatForDateInput` para asegurar que devuelvan el resultado correcto según diferentes inputs.

### Cómo correr los tests

```bash
# Instalar dependencias
npm install

# Ejecutar todos los tests con Karma
ng test
```

Esto abrirá el navegador de Karma y ejecutará todos los specs. Además, generará un reporte de coverage, mostrando qué archivos están cubiertos y qué líneas faltan. si se desea ver el coverage en la consola directamente puede ejecutar `ng test --code-coverage`

### 2. \*\*Tests unitarios con JEST

Cubre tests más globales, integraciones o utilidades independientes. En el caso de este proyecto, la capa de dominio, con los casos de uso.

La carpeta test/ está separada de src/ para mantener los tests de Jest independientes de la app Angular.

Jest genera su propio reporte de coverage, independiente de Karma.


### Cómo correr los test de JEST

```bash

# Ejecutar todos los tests
npm run test:domain
```

## Con esto se asegura que:

Todo componente Angular se prueba con Karma + Jasmine.

Funciones y lógica general se prueban con Jest.

Ambos tipos de tests se pueden correr de manera independiente y cuentan para cobertura.


## Autor
__Xavier Decker__