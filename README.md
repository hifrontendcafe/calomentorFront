Calomentor App 🔥

Pasos para levantar el proyecto en local

- Clonar el repositorio
- Ejecutar el comando `yarn` para instalar las dependencias
- Instalar el cli de vercel `npm i -g vercel@latest` y loguearse en la cuenta con el comando `vercel login`
- Ejecutar `vercel pull` y `vercel env pull` para asociar y descargas las variables de entorno
- Cambiar la variable de entorno `NEXTAUTH_URL` por `http://localhost:3000/` en el archivo `.env` en la carpeta root
- Ejecutar `yarn dev` para iniciar el proyecto

<a href="https://vercel.com/?utm_source=hifrontendcafe&utm_campaign=oss">
  <img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Powered by Vercel" />
</a>
