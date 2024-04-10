# Classes et POO en JS

En JavaScript les classes sont des fonctions spéciales qui permettent de créer des objets.

La programmation orientée objet (POO) est un paradigme de programmation qui permet de structurer son code en objets.
Les objets sont des entités qui regroupent des données et des fonctions.

exemple en JS

```js
class Rectangle {
  constructor(hauteur, largeur) {
    this.hauteur = hauteur;
    this.largeur = largeur;
  }
}
```

Mot clé `class` pour déclarer une classe.

### Constructeur

Le constructeur est une méthode spéciale pour créer et initialiser un objet créé à partir d'une classe.
L'objet créé aura ces propriétés.
Il ne peut y avoir qu'un seul constructeur dans une classe.
exemple en JS

```js
const rect = new Rectangle(10, 20);
```


### Hoisting

Les classes en JavaScript ne sont pas soumises au hoisting.

```js
const p = new Rectangle(); // ReferenceError

class Rectangle {}
```

La classe doit être créée avant d'être utilisée.

## Méthodes

Les méthodes sont des fonctions qui appartiennent à une classe.

```js
class Rectangle {
  constructor(hauteur, largeur) {
    this.hauteur = hauteur;
    this.largeur = largeur;
  }

  aire() {
    return this.hauteur * this.largeur;
  }
}
```

## Mot clé `static`

Les méthodes statiques sont des méthodes qui appartiennent à la classe et non à l'objet.

```js
class Rectangle {
  constructor(hauteur, largeur) {
    this.hauteur = hauteur;
    this.largeur = largeur;
  }

  static aire(hauteur, largeur) {
    return hauteur * largeur;
  }
}
```

## `this`

Le mot clé `this` fait référence à l'objet courant.

```js

## Héritage

L'héritage permet à une classe d'hériter des propriétés et des méthodes d'une autre classe.

```js
class Carre extends Rectangle {
  constructor(cote) {
    super(cote, cote);
  }
}
```

## Getters et Setters

Les getters et setters permettent de définir et de récupérer des propriétés d'un objet.

```js
class Rectangle {
  constructor(hauteur, largeur) {
    this.hauteur = hauteur;
    this.largeur = largeur;
  }

  get aire() {
    return this.hauteur * this.largeur;
  }

  set aire(value) {
    this.hauteur = Math.sqrt(value);
    this.largeur = Math.sqrt(value);
  }
}
```
