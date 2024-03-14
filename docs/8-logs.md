# Logs

Les logs permettent de stocker les informations de connexion, les erreurs, les requêtes, les réponses, etc.

## Morgan et winston

### Morgan

Par défaut, `express` utilise `morgan` pour les logs.

Nous n'avons donc pas besoin de l'installer.

Nous allons ajouter winston pour enregistrer les logs dans des fichiers.

### [Winston](https://github.com/winstonjs/winston)

```bash
npm install winston
```

## Configuration des logs

- Créer un dossier `/utils`
- Créer un fichier `/utils/logger.js`
- A la racine, ajouter un dossier `/logs`, et à l'intérieur un fichier `.gitkeep`
- `.gitignore`, ajouter `logs/*.log`

```bash

### logger.js

```js
const winston = require('winston');

// Le niveau définira ce qui sera affiché
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// Detemine le niveau debug ou warn
const level = () => {
  const env = process.env.DEBUG || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

// Couleurs choisies pour chaque élément
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
} 

winston.addColors(colors)

// Type de format, vous pouvez le modifier
const format = winston.format.combine(
 winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms'}),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}] ${info.message}`,
  ),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
]

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

module.exports = logger
```

## Middleware morgan

`/middlewares/morgan.middleware.js`

```js
const morgan = require("morgan");
const logger = require("../utils/logger");

const stream = {
// Use the http severity
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

module.exports = morganMiddleware;
```

## app.js

```js
const morganMiddleware = require("./middlewares/morgan.middleware");
const logger = require("./utils/logger");

// ...

app.use(morganMiddleware);
```

### Suppression

Vous pouvez maintenant supprimer les éléments suivants

```js
const logger = require('morgan');

//...

app.use(logger('dev'));

```

## Installation de l'extension ANSI Colors

- Nom : ANSI Colors
- ID : iliazeus.vscode-ansi
- Description : ANSI color styling for text documents
- Serveur de publication : Ilia Pozdnyakov
- Lien : [Marketplace VSCode - ANSI](https://marketplace.visualstudio.com/items?itemName=iliazeus.vscode-ansi)

## Gestion des logs

Désormais :

- Les logs s'affichent dans la console
- Les logs sont enregistrés dans les fichiers `all.log` et `error.log` dans le dossier `/logs`
- Extension VSCode : [ANSI Colors](https://marketplace.visualstudio.com/items?itemName=iliazeus.vscode-ansi) pour colorer les logs.
