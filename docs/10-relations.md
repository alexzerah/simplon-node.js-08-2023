# Relations

<!-- TOC -->
* [Relations](#relations)
  * [Types d'associations](#types-dassociations)
  * [Sequelize](#sequelize)
  * [Exemple](#exemple)
    * [One To Many](#one-to-many)
  * [Sequelize](#sequelize-)
  * [AVANTAGE SYNC](#avantage-sync)
<!-- TOC -->

Avec les bases de données relationnelles, comme PostgreSQL, on peut créer des associations entre les tables. Cela permet de lier des données entre elles et de les récupérer plus facilement.

## Types d'associations

Il existe plusieurs types de relations entre les tables :

- **One-to-One (1:1)** : une ligne d'une table est liée à une seule ligne d'une autre table
- **One-to-Many (1:N)** : une ligne d'une table est liée à plusieurs lignes d'une autre table
- **Many-to-Many (N:M)** : plusieurs lignes d'une table sont liées à plusieurs lignes d'une autre table

## Sequelize

Sequelize fournit quatre types d'associations :

- **BelongsTo** : une relation 1:1 où la clé étrangère est définie sur le modèle source
- **HasOne** : une relation 1:1 où la clé étrangère est définie sur le modèle cible
- **HasMany** : une relation 1:N où la clé étrangère est définie sur le modèle cible
- **BelongsToMany** : une relation N:M avec une table de jointure

## Exemple

### One To Many

1 element est associé à plusieurs autres.

```js
User.hasMany(Reservation);
Reservation.belongsTo(User);
```

Ainsi 1 user a plusieurs reservation.

userId colonne dans la table Reservation