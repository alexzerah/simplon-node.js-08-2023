const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
  describe('Membership Tests', () => {
    it('GET /membership/:id - Récupérer les informations d\'une adhésion spécifique', async () => {
      const response = await request(app).get('/membership/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });

    it('POST /membership - Créer une nouvelle adhésion', async () => {
      const newMembership = { name: 'Premium', duration: '1 year' };
      const response = await request(app).post('/membership').send(newMembership);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('PUT /membership/:id - Mettre à jour les informations d\'une adhésion existante', async () => {
      const updatedMembership = { name: 'Gold', duration: '6 months' };
      const response = await request(app).put('/membership/1').send(updatedMembership);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'Gold');
    });

    it('DELETE /membership/:id - Supprimer une adhésion existante', async () => {
      const response = await request(app).delete('/membership/1');
      expect(response.status).toBe(204);
    });

    it('GET /membership - Récupérer la liste de toutes les adhésions', async () => {
      const response = await request(app).get('/membership');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('User Tests', () => {
    it('GET /user/:id - Récupérer les informations d\'un utilisateur spécifique', async () => {
      const response = await request(app).get('/user/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });

    it('POST /user - Créer un nouvel utilisateur', async () => {
      const newUser = { name: 'John Doe', email: 'john@example.com' };
      const response = await request(app).post('/user').send(newUser);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('PUT /user/:id - Mettre à jour les informations d\'un utilisateur existant', async () => {
      const updatedUser = { name: 'John Smith', email: 'john.smith@example.com' };
      const response = await request(app).put('/user/1').send(updatedUser);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'John Smith');
    });

    it('DELETE /user/:id - Supprimer un utilisateur existant', async () => {
      const response = await request(app).delete('/user/1');
      expect(response.status).toBe(204);
    });

    it('GET /user - Récupérer la liste de tous les utilisateurs', async () => {
      const response = await request(app).get('/user');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('Room Tests', () => {
    it('GET /room/:id - Récupérer les informations d\'une salle spécifique', async () => {
      const response = await request(app).get('/room/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });

    it('POST /room - Créer une nouvelle salle', async () => {
      const newRoom = { name: 'Conference Room', capacity: 20 };
      const response = await request(app).post('/room').send(newRoom);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('PUT /room/:id - Mettre à jour les informations d\'une salle existante', async () => {
      const updatedRoom = { name: 'Meeting Room', capacity: 15 };
      const response = await request(app).put('/room/1').send(updatedRoom);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'Meeting Room');
    });

    it('DELETE /room/:id - Supprimer une salle existante', async () => {
      const response = await request(app).delete('/room/1');
      expect(response.status).toBe(204);
    });

    it('GET /room - Récupérer la liste de toutes les salles', async () => {
      const response = await request(app).get('/room');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('Spot Tests', () => {
    it('GET /spot/:id - Récupérer les informations d\'un spot spécifique', async () => {
      const response = await request(app).get('/spot/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });

    it('POST /spot - Créer un nouveau spot', async () => {
      const newSpot = { location: 'Beach', description: 'A beautiful beach spot' };
      const response = await request(app).post('/spot').send(newSpot);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('PUT /spot/:id - Mettre à jour les informations d\'un spot existant', async () => {
      const updatedSpot = { location: 'Mountain', description: 'A scenic mountain spot' };
      const response = await request(app).put('/spot/1').send(updatedSpot);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('location', 'Mountain');
    });

    it('DELETE /spot/:id - Supprimer un spot existant', async () => {
      const response = await request(app).delete('/spot/1');
      expect(response.status).toBe(204);
    });

    it('GET /spot - Récupérer la liste de tous les spots', async () => {
      const response = await request(app).get('/spot');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('Reservation Tests', () => {
    it('GET /reservation/:id - Récupérer les informations d\'une réservation spécifique', async () => {
      const response = await request(app).get('/reservation/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });

    it('POST /reservation - Créer une nouvelle réservation', async () => {
      const newReservation = { userId: 1, roomId: 1, date: '2024-06-12' };
      const response = await request(app).post('/reservation').send(newReservation);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('PUT /reservation/:id - Mettre à jour les informations d\'une réservation existante', async () => {
      const updatedReservation = { userId: 1, roomId: 2, date: '2024-06-13' };
      const response = await request(app).put('/reservation/1').send(updatedReservation);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('roomId', 2);
    });

    it('DELETE /reservation/:id - Supprimer une réservation existante', async () => {
      const response = await request(app).delete('/reservation/1');
      expect(response.status).toBe(204);
    });

    it('GET /reservation - Récupérer la liste de toutes les réservations', async () => {
      const response = await request(app).get('/reservation');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
