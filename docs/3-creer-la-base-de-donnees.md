# Créer la base de données

## Prérequis

Vérifier que vous avez PostgreSQL installé sur votre machine.

- PostgreSQL
- TablePlus
- Sequelize

`brew install postgresql@15`

TODO

## Sequelize

```bash
npm install --save pg pg-hstore
```

```bash
npm install --save sequelize
```

### Tester la connexion

Afin de vous assurer que la connexion à la base de données fonctionne, vous pouvez créer un fichier `db` à la racine du projet.

TODO

```js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("postgres://username:password@localhost:5432/postgres");

try {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  });
  
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
```

```bash
sequelize init
```

Cette commande crée 4 dossiers.

- `config`
- `migrations`
- `models`
- `seeders`

Les paramètres de connexion de notre base se situe dans `config/config.json`
