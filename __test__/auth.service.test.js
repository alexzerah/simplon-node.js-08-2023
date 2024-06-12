const bcrypt = require('bcrypt');
const AuthService = require('../services/authService');

describe('AuthService', () => {
  let authService;

  beforeAll(() => {
    authService = new AuthService();
  });

  it('should hash a password successfully', async () => {
    const password = 'monMotDePasse';
    const hashedPassword = await authService.hashPassword(password);

    expect(hashedPassword).toMatch(/^\$2[aby]\$.{56}$/); // Vérifie le format bcrypt
    const isMatch = await bcrypt.compare(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it('should throw an error if password is empty', async () => {
    await expect(authService.hashPassword('')).rejects.toThrow();
  });

  it('should throw an error if password is null', async () => {
    await expect(authService.hashPassword(null)).rejects.toThrow();
  });

  it('should handle bcrypt errors gracefully', async () => {
    // Simuler une erreur dans bcrypt
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      throw new Error('bcrypt error');
    });

    await expect(authService.hashPassword('monMotDePasse')).rejects.toThrow('bcrypt error');

    // Restaurer la méthode originale
    bcrypt.hash.mockRestore();
  });
});
