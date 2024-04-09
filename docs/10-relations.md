# Relations

<!-- TOC -->
- [Relations](#relations)
  - [Types d'associations](#types-dassociations)
  - [Sequelize](#sequelize)
  - [One to One](#one-to-one)
    - [Membership](#membership)
      - [Explication du code](#explication-du-code)
        - [Association()](#association)
        - [userId](#userid)
    - [User](#user)
  - [One to Many](#one-to-many)
    - [Room](#room)
    - [Spot](#spot)
  - [Many to Many](#many-to-many)
    - [Spot (déjà défini)](#spot-déjà-défini)
    - [Reservation](#reservation)
  - [`utils/db.js`](#utilsdbjs)
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

## One to One

1 element est associé à plusieurs autres.

```js
User.hasMany(Reservation);
Reservation.belongsTo(User);
```

Ainsi 1 user a plusieurs reservation.

userId colonne dans la table Reservation

### Membership

```js
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Membership extends Model {
        static associate(models) {
            Membership.belongsTo(models.User, { foreignKey: 'userId', unique: true });
        }
    }
    Membership.init({
      name: DataTypes.STRING,
      number_of_reservations: DataTypes.INTEGER,
      expiration_date: DataTypes.DATE,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: sequelize.models.User,
          key: 'id',
        },
      },
    }, {
        sequelize,
        modelName: 'Membership',
    });

    return Membership;
};
```

#### Explication du code

##### Association()

```js
class Membership extends Model {
    static associate(models) {
        Membership.belongsTo(models.User, { foreignKey: 'userId', unique: true });
    }
}
```

Relation `belongsTo` entre Membership et User. Un Membership appartient à un User.

##### userId

```js
userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: sequelize.models.User,
    key: 'id',
  },
},
```

Clé étrangère `userId` dans la table Membership qui fait référence à la colonne `id` de la table User. Nous avons également défini `unique: true` pour nous assurer qu'un User ne peut avoir qu'un seul Membership.

### User

Nous allons faire pareil pour User

```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Membership, { foreignKey: 'userId' });
    }
  }

  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
```

La relation One-to-One entre User et Membership est définie avec `hasOne` et `belongsTo`. Un User a un Membership et un Membership appartient à un User.

## One to Many  

### Room

```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
        Room.hasMany(models.Spot, { foreignKey: 'roomId' });
    }
  }
  Room.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });

  return Room;
};
```

### Spot

```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.Room, {foreignKey: 'roomId'});
      Spot.belongsToMany(models.Reservation, {through: 'ReservationSpots', foreignKey: 'SpotId'});
    }
  }
  Spot.init({
    name: DataTypes.STRING,
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "Rooms", // Nom du modèle référencé
        },
        key: 'id', // Clé dans le modèle référencé
      },
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
```

## Many to Many

### Spot (déjà défini)

```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.Room, {foreignKey: 'roomId'});
      Spot.belongsToMany(models.Reservation, {through: 'ReservationSpots', foreignKey: 'SpotId'});
    }
  }
  Spot.init({
    name: DataTypes.STRING,
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "Rooms", // Nom du modèle référencé
        },
        key: 'id', // Clé dans le modèle référencé
      },
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
```

### Reservation

```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
        Reservation.belongsToMany(models.Spot, { through: 'ReservationSpots', foreignKey: 'ReservationId'});
    }
  }

  Reservation.init({
    number_of_customers: DataTypes.INTEGER,
    date: DataTypes.DATE,
    name: DataTypes.STRING,
    note: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Reservation',
  });

  return Reservation;
};
```

## `utils/db.js`

```js
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const userSeed = require('../seeds/user.seed');
const spotSeed = require("../seeds/spot.seed");
const roomSeed = require("../seeds/room.seed");
const reservationSeed = require("../seeds/reservation.seed");
const membershipSeed = require("../seeds/membership.seed");
// const reservationSpotSeed = require("../seeds/reservationSpot.seed");

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

const user = require("../models/user")(sequelize, Sequelize);
const membership = require("../models/membership")(sequelize, Sequelize);
const room = require("../models/room")(sequelize, Sequelize);
const spot = require("../models/spot")(sequelize, Sequelize);
const reservation = require("../models/reservation")(sequelize, Sequelize);
// const reservationSpot = require("../ReservationSpot")(sequelize, Sequelize);

reservation.belongsToMany(spot, { through: 'ReservationSpots' });
spot.belongsToMany(reservation, { through: 'ReservationSpots' });

sequelize.sync({force: false}).then(
    async () => {
        await userSeed();
        await roomSeed();
        await reservationSeed();
        await spotSeed();
        await membershipSeed();
        // await reservationSpotSeed();
        console.log('Database and tables created!');
    }
).catch(e => {
    console.error('Database and tables creation failed!', e);
});

module.exports = { sequelize, Sequelize };
```


