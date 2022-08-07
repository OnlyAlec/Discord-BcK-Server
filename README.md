<!-- Logo -->
<div align='center'>
  <a href="htthttps://github.com/OnlyAlec/Discord-BcK-Server">
    <img src="https://i.imgur.com/nsisaAg.png" alt="Logo">
  </a>
  <!-- Titulo -->
  <h1> ❰ 𝘿𝙞𝙨𝙘𝙤𝙧𝙙  - 𝘽𝙘𝙆 𝘽𝙤𝙩 ❱ </h1>
  <!-- Buddy -->
  <a href="https://github.com/OnlyAlec/Discord-BcK/actions/">
	<img src="https://github.com/OnlyAlec/Discord-BcK-Server/actions/workflows/ESLint-Bot.yml/badge.svg?branch=main">
  </a>
  <img alt="GitHub last commit (branch)" src="https://img.shields.io/github/last-commit/OnlyAlec/Discord-BcK-Server/main?color=informational&logo=Github&style=flat">
  <img alt="GitHub tag (latest SemVer)" src="https://img.shields.io/github/v/tag/OnlyAlec/Discord-BcK-Server?color=slateblue&label=Version&logo=Github&sort=semver">
  <img alt="Status Code" src="https://img.shields.io/lgtm/grade/javascript/github/OnlyAlec/Discord-BcK-Server.svg?logo=lgtm&logoWidth=18">
  <!-- Links -->
<br><br>
🤖 ¡Primer bot en desarrollo del servidor BeckS! <br>
<a href= "https://github.com/OnlyAlec/Discord-BcK-Server/main">
	🔍 Explora la codificacion! »
</a> <br>
<a href= "https://github.com/OnlyAlec/Discord-BcK-Server/issues/new/choose">
	💡 Aporta una idea! »
</a> <br>
<a href="https://github.com/OnlyAlec/Discord-BcK-Server/issues">
	🐛 Reporta un Bug! »
</a><br>
<a href="https://discord.com/invite/fTV2wpbTQY">
	🔮 Servidor BeckS! »
</div>

<!-- TABLE OF CONTENTS -->

## Tabla de contenidos

- [🤖 | Acerca del Bot](#acerca-del-bot)
  - [👋🏻 | Presentacion](#presentacion)
  - [🧠 | Lenguajes ocuapados](#lenguajes-ocuapados)
- [📂 | Comandos](#comandos)
  - [👤 | Comandos para Usuarios](#comandos-para-usuarios)
  - [🎨 | Embeds con interaccion para Usuarios](#embeds-con-interaccion-para-usuarios)
  - [🔂 | Comandos automaticos en el Server](#comandos-automaticos-en-el-server)
  - [💭 | Comando Pensados](#comandos-pensados)
- [🤝🏻 | Contribuciones](#contribuciones)
- [👤 | Contacto](#contacto)
- [🧰 | Dependencias](#dependencias)
- [:balance_scale: | Licencia](#acerca-del-bot)

<!-- START CONTENT -->

# Acerca del Bot

### Presentacion!

¿Como comenzar? Cuando comenze a desarrollar este bot para _mi servidor de Discord_ fue por pura curiosidad y aprendizaje, actualmente mi idea es diferente siendo que el objetivo principal de _**BcK Bot**_: es el poder unificar todo tipo de comandos y herramientas unicas que ayuden a los usuarios a tener una mejor interaccion con el servidor y con las mismas personas del server, evitando que tu server este infestado de muchos bots. En pocas palabras... **Un bot todo en uno!**

Apesar que sigue en _**dearrollo**_ de manera general, algunos comandos ya estan de manera funcional para aquellos que los ocupen (Mas adelante se detallaran) en el servidor [_**BeckS**_](https://discord.com/invite/fTV2wpbTQY).

Entonces... ¿Porque este bot?:

- Me gustaria enfocarme en los comandos unicos que pueden dar una mejor experiencia al usuario!
- A lo largo del tiempo integraremos nuevas teconologias y/o tecnicas que aumentara el mejor manejo del bot!
- No se quedara de manera obsoleta, siempre lo estaremos actualizando para ustedes!
- Y... porque no? Es bueno intentar nuevos bots. :3

### Lenguajes ocuapados

Como la mayoria de bots estamos ocupando _Node JS_, estando toda la codificacion en **JavaScript**. Se tiene pensado añadir nuevas cosas que no solo funcionen con **JS** es posible que intente implemetar otros frameworks o combinacion de lenguajes (Si es que se puede), sin embargo, no hay una fecha especifica de cuando va a pasar.

- [Node JS](https://nodejs.org)
- [Discord JS](https://discord.js.org)

---

# Comandos

Estos comandos estan disponibles para todos! Si te gustaria probarlos puedes unirte a [_**BeckS**_](https://discord.com/invite/fTV2wpbTQY).
Existen 2 maneras para poder usar estos comandos:

- ~~Puedes escribir su _sintaxis_ en cualquier canal de texto. Siguiendo correctamente sus parametros y ortografia~~ (Actualmente solamente funciona con slash commands[/], proximamente se volvera con los comandos en el chat de texto)
- Puedes usar (/) en cualquier canal de texto. Los campos necesarios son autocompletados para que tu nada mas metas los parametros.

### Comandos para Usuarios

|          Comando          |          Sintaxis           |                                                                ¿Que hace?                                                                |
| :-----------------------: | :-------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: |
|    ¿Que esta juegando?    |    **#gamepls** @usuario    | Muestra el titulo del juego que el usuario mencionado esta jugando y una imagen relacionada a este mismo (Logotipo / Banner / Gameplay)! |
| Estadisticas del servidor |         **#stats**          |                                    Muestra una breves estadisticas del servidor y sus descripciones!                                     |
|      Tiempo en linea      |         **#timeup**         |                                 Da el tiempo que el bot a estado despierto y atendiendo tus peticiones!                                  |
|  Estado Server Minecraft  | **#mc_server** Dirrecion IP |                              Te muestra si un servidor de Minecraft esta activo y su informacion principal!                              |

### Embeds con interaccion para Usuarios

|      Embeds      |       Canal        |                                                          ¿Que hace?                                                          |
| :--------------: | :----------------: | :--------------------------------------------------------------------------------------------------------------------------: |
|  embeds-Colors   | _**Roles-Server**_ |                                          Cambia el color de tu nombre en el server!                                          |
| embeds-Playlists |  _**Playlists**_   | Entra el bot de musica [****BcK Music****](https://github.com/OnlyAlec/Discord-BcK-Music) con la playlist que seleccionaste! |

### Comandos automaticos en el Server

Asi como dice el encabezado, estos son comandos que funcionan de manera autonoma sin ninguna interaccion del usuario!
| Comando | ¿Que hace? |
| :----------------: | :----------: |
| Auto-DetectGame | Recupera que juego tienes en tu estado de Discord y lo pone en uno de los canales del servidor [_**BeckS**_](https://discord.com/invite/fTV2wpbTQY), siempre y cuando estes contectado en el chat de voz de **Random** |
| Auto-Stats | Modificar los nombres de los canales del estado del servidor con datos basicos (Personas en Linea, Miembros, Bots)! |
| Auto-Tetrio | Si juegas _Tetr.io_ una vez acabes una partida en competitivo se mandara un mensaje al server donde muestre las estadisticas del partido que jugaste! |
| Playlist | Funcionalidad para el embed de _**Playlists**_, comprueba si estas en un canal de voz y entra el bot de musica con la playlist que seleccionaste! |

### Comandos Pensados

Por el momento estos comandos no existen **aun**, pero si estan pensados para desarrollarlos.
Si quieres aportar una idea... [haz click aqui](https://github.com/OnlyAlec/Discord-BcK-Server/issues/new/choose) !

- [ ] "Ayuda" : Si no recuerdas los comandos o si necesitas ver su sintaxis, te la mostrara !
- [ ] "Calendario" : Como tal es un calendario, principalmente para los cumpleaños y los entrenamientos !
- [ ] "Cancion del Dia" : Cada dia se recomendara una cancion nueva con ayuda de Spotify (Se variara gracias a algunos factores del server y del mismo dia) !
- [ ] "Catalogo Cine" : En caso de que haya un evento de ver peliculas en el canal de cine, que se cree una cartelera dependiendo del genero de pelicula !
- [ ] "Auto-Valorant" : Una vez termines de jugar valorant mostrar las estadisitcas de las partidas que tuviste !
- [ ] Incorporacion de varios API ( GPT, Spotify, Valorant )
- [ ] Incorporacion de [_**BcK Music**_](https://github.com/OnlyAlec/Discord-BcK-Music) !
- [ ] Implementar una base de datos para algunos comandos (Calendario, Playlists, Cine) !

---

# Contribuciones

Ah! Que hermoso es el _Open Source_, hace que puedas aprender cosas nuevas, te puedes inspirar de otros trabajos e incluso puede crear el tuyo propio. Es por eso que es tan magnifico!, asi que este proyecto esta abierto a contribuciones en la mejora del codigo (Al estar en desarrollo todavia le falta algunas optimizaciones).

Para poder contribuir necesitas:

1. Hacer una bifurcacion del proyecto (`Git Fork`)
2. Crea una nueva rama del _Branch_ (`git checkout -b main/MegaUltraAsombrosaRama`)
3. Encomienda tus cambios al repositorio (`git commit -m 'Agrega un brve comentario aqui'`)
4. Realiza un _Push_ a la rama _Branch_ (`git push origin main/MegaUltraAsombrosaFuncion`)
5. Abre un nuevo _Pull Request_

Si llegaste hasta este punto con exito... Te agradezco mucho que ayudes a mejorar este proyecto! <3

# Licencia

Este proyecto esta distribuido bajo la licencia "GNU LICENSE". Checa `LICENSE` para mas informacion.

# Contacto

Nos pueden encontrar en el servidor de Discord [_**"BeckS"**_](https://discord.com/invite/fTV2wpbTQY) !
O me puedes mandar un correo directamente a mi [OnlyAlec](mailto:a.ct@lasaliistas.org.mx) !
Repositorio : [Discord-BcK-Server](https://github.com/OnlyAlec/Discord-BcK-Server)

# Dependencias

- [Discord JS](https://www.npmjs.com/package/discord.js)
- [@Discord/rest](https://www.npmjs.com/package/@discordjs/rest)
- [@Discord/builders](https://www.npmjs.com/package/@discordjs/builders)
- [Dot Env](https://www.npmjs.com/package/dotenv)
