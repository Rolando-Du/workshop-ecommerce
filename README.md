**Proyecto Ecommerce con integracion de Mercado Pago - Documentación**

¡Bienvenido a la documentación de Prueba Ecommerce! En esta guía, encontrarás información detallada sobre el proyecto de comercio electrónico desarrollado con Vite y React.js, que incluye integración con Mercado Pago. La aplicación está deployada en Vercel para que puedas acceder y probarla en línea.

**Descripción del Proyecto**
Prueba Ecommerce es una aplicación de comercio electrónico diseñada para brindar a los usuarios una experiencia de compra en línea fluida y conveniente. La aplicación está construida utilizando la tecnología de Vite y React.js, lo que garantiza un rendimiento rápido y una interfaz de usuario moderna.

**Características Principales**
Explora una amplia gama de productos disponibles en la tienda.
Agrega productos al carrito de compras y gestiona las cantidades.
Proceso de pago seguro a través de la integración de Mercado Pago.
Navegación fluida entre las diferentes secciones de la tienda.
Utiliza el poder de Firebase para un almacenamiento eficiente de datos.
Formularios de compra optimizados utilizando Formik y Yup para validación.
Diseño responsivo basado en MUI (Material-UI) para una experiencia de usuario atractiva.
Navegación entre páginas mediante React Router.
Acceso en Línea
Puedes acceder y probar la aplicación en línea en el siguiente enlace: 
-Prueba Ecommerce en **Vercel** del frontend

[Vercel Deploy](https://workshop-ecommerce-five.vercel.app/)

-Asi tambien el backend 

[Vercel Deploy](https://backend-worshop.vercel.app/)
# Backend-Workshop

Este proyecto es un pequeño backend que solicita pagos a través de Mercado Pago.

## Instalación

Para instalar el proyecto, puedes usar el siguiente comando:

npm install

Uso
Para usar el proyecto, puedes ejecutar el siguiente comando:

node index.js

El proyecto se ejecutará en el puerto 3000. Para realizar una solicitud de pago, puedes enviar una solicitud POST a la siguiente URL:
/pagos

El cuerpo de la solicitud debe contener los siguientes parámetros:

monto: El monto del pago.
concepto: El concepto del pago.
El proyecto devolverá una respuesta JSON con el estado de la solicitud de pago.

Configuración
Para configurar el proyecto, debes editar el archivo .env. En este archivo, puedes establecer las siguientes variables de entorno:

MERCADO_PAGO_ACCESS_TOKEN: El token de acceso de Mercado Pago.
MERCADO_PAGO_PUBLIC_KEY: La clave pública de Mercado Pago.
Solución de problemas
Si tienes problemas con el proyecto, puedes consultar la documentación de Mercado Pago o ponerte en contacto con los desarrolladores del proyecto.

Información de contacto

**Requisitos Previos**
Node.js (preferiblemente versión 14 o superior) instalado en tu sistema.
**Instalación**
Clona este repositorio en tu máquina local:
bash
Copy code
git clone https://github.com/TuUsuario/prueba-ecommerce.git
Navega al directorio del proyecto:
bash
Copy code
cd prueba-ecommerce
Instala las dependencias utilizando npm o yarn:
bash
Copy code
npm install
# o
yarn install
Configuración
Antes de ejecutar la aplicación, asegúrate de configurar las variables necesarias:

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:
env
Copy code
REACT_APP_MERCADO_PAGO_PUBLIC_KEY=TuClavePublicaDeMercadoPago
REACT_APP_FIREBASE_API_KEY=TuAPIKeyDeFirebase
REACT_APP_FIREBASE_AUTH_DOMAIN=TuDominioDeAuthFirebase
REACT_APP_FIREBASE_PROJECT_ID=TuIDDeProyectoFirebase
Ejecución
Una vez que hayas configurado las variables de entorno, puedes iniciar la aplicación:

bash
Copy code
npm run dev
# o
yarn dev
Esto iniciará la aplicación en modo de desarrollo y podrás acceder a ella desde tu navegador en http://localhost:5173.

Despliegue
Para crear una versión optimizada para producción, puedes ejecutar:

bash
Copy code
npm run build
# o
yarn build
Esto generará una carpeta dist con los archivos optimizados que puedes desplegar en tu servidor web.

Contribuciones
¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes sugerencias para mejorar el proyecto, no dudes en crear un issue o enviar una solicitud de extracción.Información de contacto: Puedes ponerte en contacto con los desarrolladores del proyecto en 
[Linkedin](https://www.linkedin.com/in/rolando-ramon-duarte-93116b17a/)
[GitHub Pages](https://github.com/Rolando-Du/)
[rolandoduarte83@gmail.com].

Licencia
Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.
