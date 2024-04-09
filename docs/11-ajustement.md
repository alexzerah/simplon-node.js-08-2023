# Ajustement

## Variable d'environnement

Node v20 permet d'utiliser un fichier `.env` pour stocker des variables d'environnement.

Il faut rajouter `--env-file .env` dans le script `start` du fichier `package.json`.

```json
  "scripts": {
    "start": "node --env-file .env --watch ./bin/www",
    "test": "jest"
  },
```

### `.env`

```env
ADMIN_MODE=true
```

Nous ajouter une variable `ADMIN_MODE` afin de faciliter le développement.

## `App.js`

```js
if (env.ADMIN_MODE === 'true') {
    app.use('/api', indexRouter); // Applique le middleware JWT sur toutes les routes commençant par /api
} else {
    app.use('/api', verifyJWT, indexRouter); // Applique le middleware JWT sur toutes les routes commençant par /api
}
```
Ici nous enlevons le middleware JWT sur toutes les routes.
Il suffit de mettre `ADMIN_MODE=false` dans le fichier `.env` pour activer le middleware JWT (et relancer le serveur).

Attention, il faut bien penser à enlever cette variable en production !
