const request = require('supertest');
const app = require('../app');

describe('Auth API Tests', () => {
  describe('Sign Up', () => {
    it('Sign Up - Succès', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ email: 'newuser@example.com', password: 'StrongP@ssw0rd' });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('Sign Up - Email déjà utilisé', async () => {
      await request(app)
        .post('/signup')
        .send({ email: 'existinguser@example.com', password: 'StrongP@ssw0rd' });
      
      const response = await request(app)
        .post('/signup')
        .send({ email: 'existinguser@example.com', password: 'AnotherP@ssw0rd' });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email already in use');
    });

    it('Sign Up - Données invalides', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ email: 'notanemail', password: '123' });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('Sign Up - Mot de passe faible', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ email: 'weakpassword@example.com', password: '123' });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Password is too weak');
    });

    it('Sign Up - Email invalide', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ email: 'invalid-email', password: 'StrongP@ssw0rd' });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid email format');
    });

    it('Sign Up - Champ manquant', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ email: 'missingfield@example.com' });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Password is required');
    });
  });

  describe('Sign In', () => {
    it('Sign In - Succès', async () => {
      await request(app)
        .post('/signup')
        .send({ email: 'loginuser@example.com', password: 'StrongP@ssw0rd' });

      const response = await request(app)
        .post('/signin')
        .send({ email: 'loginuser@example.com', password: 'StrongP@ssw0rd' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('Sign In - Mot de passe incorrect', async () => {
      await request(app)
        .post('/signup')
        .send({ email: 'wrongpassword@example.com', password: 'StrongP@ssw0rd' });

      const response = await request(app)
        .post('/signin')
        .send({ email: 'wrongpassword@example.com', password: 'WrongP@ssw0rd' });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid password');
    });

    it('Sign In - Utilisateur non trouvé', async () => {
      const response = await request(app)
        .post('/signin')
        .send({ email: 'nonexistentuser@example.com', password: 'StrongP@ssw0rd' });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });

    it('Sign In - Données invalides', async () => {
      const response = await request(app)
        .post('/signin')
        .send({ email: 'invalidemail', password: '' });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
});
