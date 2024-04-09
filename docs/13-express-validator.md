# Express validator

<!-- TOC -->
* [Express validator](#express-validator)
  * [Installation](#installation)
  * [Utilisation](#utilisation)
  * [Middleware](#middleware)
    * [Explication du code](#explication-du-code)
  * [Les routes](#les-routes)
<!-- TOC -->


## Installation

```bash
npm install express-validator
```

## Utilisation

Nous allons implémenter `express-validator` :
- dans les routes
- dans les middlewares

## Middleware

Nous allons créer un middleware pour valider les données d'un utilisateur.

Créer un fichier `AuthValidationRules.js` dans le dossier `middlewares` et ajouter le code suivant :

```js
const { body} = require('express-validator');

const signUpValidationRules = () => {
    return [
        body('email').not().isEmpty().isEmail().withMessage("L'email n'est pas au bon format"),
        body('password').isStrongPassword({
            minLength: 10,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0, // Ajoutez ceci si vous souhaitez spécifier le nombre minimum de symboles
        }).withMessage("Le mot de passe doit contenir au moins 10 caractères, dont au moins 1 majuscule, 1 minuscule, et 1 chiffre"),
        body('firstName').not().isEmpty().withMessage("Le prénom est obligatoire"),
        body('lastName').not().isEmpty().withMessage("Le nom est obligatoire"),
    ];
};

const signInValidationRules = () => {
    return [
        body('email').isEmail().withMessage('Le format de l\'email est incorrect'),
        body('password').isLength({ min: 5 }).withMessage('Le mot de passe doit contenir au moins 5 caractères')
    ];
}

module.exports = {signInValidationRules, signUpValidationRules};
```

### Explication du code

```js
const { body} = require('express-validator');
```

`body` permet de valider les données d'une requête. Ici il s'agit du body que j'envoie dans une requête POST.
`body` est une fonction native d'`express-validator`.
Il est possible également de valider les paramètres de la requête, les cookies, les headers, etc.

```js
const signUpValidationRules = () => {/*...*/}
const signInValidationRules = () => {/*...*/}
```

Ce sont les fonctions utilisées pour valider les données d'un utilisateur lors de l'inscription et de la connexion.
Ces fonction seront importées dans les routes.

```js
return [/*...*/]
```

`signUpValidationRules` et `signInValidationRules` retournent un tableau de règles de validation.
C'est un fonctionnement standard d'`express-validator`.


```js
body('email').not().isEmpty().isEmail().withMessage("L'email n'est pas au bon format"),
    body('password').isStrongPassword({
        minLength: 10,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0, // Ajoutez ceci si vous souhaitez spécifier le nombre minimum de symboles
    }).withMessage("Le mot de passe doit contenir au moins 10 caractères, dont au moins 1 majuscule, 1 minuscule, et 1 chiffre"),
    body('firstName').not().isEmpty().withMessage("Le prénom est obligatoire"),
    body('lastName').not().isEmpty().withMessage("Le nom est obligatoire")
```

J'applique ebsuite les règles de validation sur les champs `email`, `password`, `firstName` et `lastName`.

`body()` prend en paramètre le nom du champ à valider.
Les méthodes `not().isEmpty()`, `isEmail()`, `isStrongPassword()`, etc. sont des méthodes natives d'`express-validator`.
`withMessage()` permet de personnaliser le message d'erreur.

La liste des méthodes [est disponible ici](https://express-validator.github.io/docs/api/validation-chain).

Il y a par exemple : 

- `isEmail()`
- `isStrongPassword()`
- `isObject()`
- `isString()`
- `notEmpty()`
- `isArray()`
- `equals()`
- `isIBAN()`
- `isIP()`
- ...

## Les routes

Dans la route `authRoutes.js`, nous allons ajouter les middlewares de validation.

```js
const {signUpValidationRules, signInValidationRules} = require('../middlewares/authValidationRules');
const { validationResult } = require('express-validator');
```

Ici nous importons les fonctions `signUpValidationRules` et `signInValidationRules` du fichier `authValidationRules.js` et la méthode `validationResult` d'`express-validator`.

```js
router.post('/signup', signUpValidationRules(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    authController.signUp(req, res);
});
```

Je vérifie mes donneées puis je les envoie à la méthode `signUp` du contrôleur `authController`.
Les eventuelles erreurs sont assignées à la variable `errors`.
Si j'ai au moins une erreur, je renvoie un code 422 avec un message d'erreur.

Il serait interessant de créer un service pour gérer l'afficage des erreurs.