# Services

<!-- TOC -->
* [Services](#services)
  * [A quoi sert un service ?](#a-quoi-sert-un-service-)
  * [Créer un service](#créer-un-service)
  * [Exemple](#exemple)
  * [Utiliser un service](#utiliser-un-service)
<!-- TOC -->

Nous voulons un code propre, qui soit modulaire et facile à maintenir. Pour cela, nous allons créer des services qui vont gérer les différentes actions de notre application.

Nous avons déjà :

- Des routes qui gèrent les requêtes HTTP
- Des modèles qui gèrent les données de la base de données
- Des contrôleurs qui gèrent les actions des routes

Nous allons créer des services qui vont gérer les actions des contrôleurs.

## A quoi sert un service ?

Un service est une couche d'abstraction entre le contrôleur et le modèle. Il permet de gérer les actions métier de l'application.

## Créer un service

Créez un fichier `services/*` pour chaque modèle de votre application.

- `services/users.js`
- `services/reservations.js`
- `services/spots.js`
- `services/rooms.js`
- `services/memberships.js`

## Exemple

```js

// services/users.js

const { User } = require('../models');

const getAllUsers = async () => {
  return await User.findAll();
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

const createUser = async (data) => {
  return await User.create(data);
};

const updateUser = async (id, data) => {
  return await User.update(data, {
    where: { id },
  });
};

const deleteUser = async (id) => {
  return await User.destroy({
    where: { id },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

```

## Utiliser un service

Dans le contrôleur, importez le service correspondant au modèle.

```js

// controllers/users.js

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../services/users');

