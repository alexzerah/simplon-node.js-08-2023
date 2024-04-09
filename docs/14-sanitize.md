# Sanitize

Nous voulons appliquer une sécurité sur les données que nous recevons.
Il peut s'agir d'un choix UX (tout mettre en minuscule par exemple) ou de sécurité (éviter les injections SQL).

## Choix bibliothèque

Nous pourrions réaliser cette tache en natif, mais il est préférable d'utiliser une bibliothèque qui a déjà fait ses preuves, pour des gains de temps et de performance.

Nous avons le choix entre plusieurs bibliothèques pour nettoyer les données, dont :

- joi : https://joi.dev/
- express-validator : https://express-validator.github.io/docs/

Nous utiliserons `express-validator` pour ce tutoriel, car nous l'avons déjà implémenté.
Notez que `joi` est une bibliothèque très populaire et très puissante.

## Exemple

```js
body('email').not().isEmpty().isEmail().withMessage("L'email n'est pas au bon format").normalizeEmail({gmail_remove_dots: true}),
//...
body('firstName').not().isEmpty().withMessage("Le prénom est obligatoire").blacklist("<>", ).escape().trim(),
body('lastName').not().isEmpty().withMessage("Le nom est obligatoire").blacklist("<>").escape().trim()
```

- `normalizeEmail` : permet de normaliser l'email, par exemple en enlevant les points dans un email gmail.
- `blacklist` : permet de supprimer des caractères spécifiques.
- `escape` : permet d'échapper les caractères spéciaux. Par exemple, `<script>` deviendra `&lt;script&gt;`.
- `trim` : permet de supprimer les espaces en début et fin de chaîne. Par exemple, `" test "` deviendra `"test"`.

La liste des méthodes [est disponible ici](https://express-validator.github.io/docs/api/validation-chain#standard-sanitizers).