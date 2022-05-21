Calomentor App 🔥

Pasos para levantar el proyecto en local

1- Clonar el repositorio
2- Ejecutar el comando `yarn` para instalar las dependencias
3- Instalar el cli de vercel `npm i -g vercel@latest` y loguearse en la cuenta con el comando `vercel login`
4- Ejecutar `vercel pull` y `vercel env pull` para asociar y descargas las variables de entorno
5- Cambiar la variable de entorno `NEXTAUTH_URL` por `http://localhost:3000/` en el archivo `.env` en la carpeta root
6- Ejecutar `yarn dev` para iniciar el proyecto

<a href="https://vercel.com/?utm_source=hifrontendcafe&utm_campaign=oss">
  <img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Powered by Vercel" />
</a>
