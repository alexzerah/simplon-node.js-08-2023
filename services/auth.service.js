const bcrypt = require('bcrypt');

// exemple de service assez simple. Ici on crée on service qui permet de hasher un mot de passe.
// Il s'agit surtout d'utiliser les services et classes pour le projet final.

class AuthService {
  constructor() {
    this.saltRounds = 10;
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}

module.exports = AuthService;
