# Comment créer un serveur Node.js avec Exoress ?

[Qu'est-ce que Node.js ?](./theory/01-node.md)

> ⚠️ Désormais il est recommandé d'utiliser Fastify en remplacement d'Express, car ce dernier n'est plus mis à jour.

## Installer Express

```
npx express-generator --no-view bookingApp 
```

- `npx` : Permet d'executer des commandes
- `express-generator` : Générateur d'applications Express
- `--no-view` : paramètre pour ne pas installer de vue

> ⚙️ Remplacer **bookingApp** par votre nom de dossier.

Cette commnade va installer express et les fichiers nécessaires pour créer un serveur.

Avant de continuer, vous pouvez faire la commande suivantes pour installer les dépendances.

```bash
cd bookingApp
npm i # équivalent a npm install
npm run start #pour lancer le serveur
```

## Architecture

```bash
├── bin/
│   └── www
├── node_modules/
├── public/
│   ├── javascripts/
│   ├── images/
│   ├── stylesheets/
│   │   └── style.css
│   └── index.html
├── routes/
│   ├── index.js
│   └── users.js
├── app.js
├── package.json
└── package-lock.json 
```

Voici a quoi corrrespondent ces fichiers et dossiers :

- `bin` : contient le fichier relatifs au serveur, www. Cela permet de lancer le serveur (host, port, erreurs…)
- `node modules` : Fichiers des modules externes. C’est ici qu’est le code d’Express.
- `public` : fichiers statiques qui ne seront pas exécuter par le serveur. Par exemple les images, css, html… Nous allons tout supprimer a l’intérieur.
- `routes` : Contients les routes (c’est a dires chemins de nôtres applications et leur actions.
- `app.js` : Fichier principal, relatif a la gestion de notre serveur.
- `package-lock.json` : Fichiers automatiquement généré. Ne pas toucher mais il faut le versionner. Permet de s’assurer des bonnes versions de des dépendances l’application.
- `package.json` : Fichier de configuration, contient les dépendances et d’autres elements.

## Supprimer la partie vue

### Les routes

#### index.js

Remplacer 

```js
// index.js
  res.render(‘index’, { title: ‘Express’ });
```

Par

```js
// index.js
  res.json({hello: ‘World’ });
```

#### users.js

```js
// users.js
  res.send(‘respond with a resource’);
```

```js
// users.js
  res.json({file: user});
```

## Vérifier le serveur

Relancer votre serveur puis aller sur localhost:3000`.

Vous devriez voir :

`{“title”:”Express”}`

## Bonus

Si vous avez nodes 18+, vous pouvez ajouter ceci

Dans package.json, modifier

```json
“scripts”: {
  “start”: “node ./bin/www”
},
```

Par

```json
“scripts”: {
  “start”: “node —-watch ./bin/www”
},
``` 

Cela permet de relancer votre serveur a chaque modification (lorsque vous enregistré).

Sinon, vous pouvez installer nodemon.