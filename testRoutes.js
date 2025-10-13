// testRoutes.js
require('dotenv').config();
const request = require('supertest');
const app = require('./app'); // ton app Express
const sequelize = require('./config/database');

describe('🔹 Tests des routes API', () => {

  beforeAll(async () => {
    await sequelize.authenticate();
    console.log('✅ Connecté à PostgreSQL pour tests');
  });

  afterAll(async () => {
    await sequelize.close();
    console.log('🔒 Connexion fermée après tests');
  });

  // --------------------- USERS ---------------------
  describe('Users', () => {
    let userId;

    it('POST /api/users - créer un utilisateur', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          nom: 'Test',
          prenom: 'Utilisateur',
          email: 'user.test@example.com',
          mot_de_passe: '12345678',
          categorie: 'PME',
          adresse: 'Libreville'
        });
      expect(res.statusCode).toBe(201);
      userId = res.body.id;
      console.log('👤 User créé :', res.body);
    });

    it('GET /api/users - récupérer tous les utilisateurs', async () => {
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      console.log('📦 Users :', res.body.map(u => u.nom));
    });

    it('PUT /api/users/:id - mettre à jour un utilisateur', async () => {
      const res = await request(app)
        .put(`/api/users/${userId}`)
        .send({ adresse: 'Libreville Centre' });
      expect(res.statusCode).toBe(200);
      console.log('✏️ User mis à jour :', res.body);
    });

    it('DELETE /api/users/:id - supprimer un utilisateur', async () => {
      const res = await request(app).delete(`/api/users/${userId}`);
      expect(res.statusCode).toBe(200);
      console.log('🗑️ User supprimé :', res.body);
    });
  });

  // --------------------- CLIENTS ---------------------
  describe('Clients', () => {
    let clientId, userId;

    beforeAll(async () => {
      // Créer un utilisateur pour lier le client
      const user = await request(app)
        .post('/api/users')
        .send({
          nom: 'ClientUser',
          prenom: 'Test',
          email: 'client.user@example.com',
          mot_de_passe: '12345678',
          categorie: 'PME',
          adresse: 'Libreville'
        });
      userId = user.body.id;
    });

    it('POST /api/clients - créer un client', async () => {
      const res = await request(app)
        .post('/api/clients')
        .send({
          nom: 'Dupont',
          prenom: 'Jean',
          email: 'jean.dupont@example.com',
          telephone: '0654321098',
          adresse: '123 Rue Exemple, Libreville',
          nif: '123456789A',
          rccm: 'GA-LBV-2025-B-0001',
          tva: 'GA1234567',
          user_id: userId
        });
      expect(res.statusCode).toBe(201);
      clientId = res.body.id;
      console.log('👤 Client créé :', res.body);
    });

    it('GET /api/clients - récupérer tous les clients', async () => {
      const res = await request(app).get('/api/clients');
      expect(res.statusCode).toBe(200);
      console.log('📦 Clients :', res.body.map(c => c.nom));
    });

    it('PUT /api/clients/:id - mettre à jour un client', async () => {
      const res = await request(app)
        .put(`/api/clients/${clientId}`)
        .send({ adresse: 'Nouvelle adresse' });
      expect(res.statusCode).toBe(200);
      console.log('✏️ Client mis à jour :', res.body);
    });

    it('DELETE /api/clients/:id - supprimer un client', async () => {
      const res = await request(app).delete(`/api/clients/${clientId}`);
      expect(res.statusCode).toBe(200);
      console.log('🗑️ Client supprimé :', res.body);
    });
  });

  // --------------------- STRUCTURES ---------------------
  describe('Structures', () => {
    let structureId, userId;

    beforeAll(async () => {
      // Créer un utilisateur pour lier la structure
      const user = await request(app)
        .post('/api/users')
        .send({
          nom: 'StructUser',
          prenom: 'Test',
          email: 'struct.user@example.com',
          mot_de_passe: '12345678',
          categorie: 'PME',
          adresse: 'Libreville'
        });
      userId = user.body.id;
    });

    it('POST /api/structures - créer une structure', async () => {
      const res = await request(app)
        .post('/api/structures')
        .send({
          nom_structure: 'Gaz Energie',
          adresse: 'Libreville',
          telephone: '0654123456',
          user_id: userId
        });
      expect(res.statusCode).toBe(201);
      structureId = res.body.id;
      console.log('🏢 Structure créée :', res.body);
    });

    it('GET /api/structures - récupérer toutes les structures', async () => {
      const res = await request(app).get('/api/structures');
      expect(res.statusCode).toBe(200);
      console.log('📦 Structures :', res.body.map(s => s.nom_structure));
    });

    it('PUT /api/structures/:id - mettre à jour une structure', async () => {
      const res = await request(app)
        .put(`/api/structures/${structureId}`)
        .send({ adresse: 'Libreville Centre' });
      expect(res.statusCode).toBe(200);
      console.log('✏️ Structure mise à jour :', res.body);
    });

    it('DELETE /api/structures/:id - supprimer une structure', async () => {
      const res = await request(app).delete(`/api/structures/${structureId}`);
      expect(res.statusCode).toBe(200);
      console.log('🗑️ Structure supprimée :', res.body);
    });
  });

  // --------------------- FACTURES ---------------------
  describe('Factures', () => {
    let factureId, clientId, userId;

    beforeAll(async () => {
      // Créer utilisateur et client
      const user = await request(app)
        .post('/api/users')
        .send({
          nom: 'FactUser',
          prenom: 'Test',
          email: 'fact.user@example.com',
          mot_de_passe: '12345678',
          categorie: 'PME',
          adresse: 'Libreville'
        });
      userId = user.body.id;

      const client = await request(app)
        .post('/api/clients')
        .send({
          nom: 'Leroy',
          prenom: 'Paul',
          email: 'paul.leroy@example.com',
          telephone: '0654123456',
          adresse: 'Rue Exemple',
          nif: '987654321A',
          rccm: 'GA-LBV-2025-B-0003',
          tva: 'GA9876543',
          user_id: userId
        });
      clientId = client.body.id;
    });

    it('POST /api/factures - créer une facture', async () => {
      const res = await request(app)
        .post('/api/factures')
        .send({
          numero: 'FAC-001',
          date: '2025-10-10',
          montant: 100000,
          client_id: clientId,
          user_id: userId
        });
      expect(res.statusCode).toBe(201);
      factureId = res.body.id;
      console.log('📄 Facture créée :', res.body);
    });

    it('GET /api/factures - récupérer toutes les factures', async () => {
      const res = await request(app).get('/api/factures');
      expect(res.statusCode).toBe(200);
      console.log('📦 Factures :', res.body.map(f => f.numero));
    });

    it('PUT /api/factures/:id - mettre à jour une facture', async () => {
      const res = await request(app)
        .put(`/api/factures/${factureId}`)
        .send({ montant: 120000 });
      expect(res.statusCode).toBe(200);
      console.log('✏️ Facture mise à jour :', res.body);
    });

    it('DELETE /api/factures/:id - supprimer une facture', async () => {
      const res = await request(app).delete(`/api/factures/${factureId}`);
      expect(res.statusCode).toBe(200);
      console.log('🗑️ Facture supprimée :', res.body);
    });
  });

  // --------------------- PAIEMENTS ---------------------
  describe('Paiements', () => {
    let paiementId, factureId, clientId, userId;

    beforeAll(async () => {
      // Créer utilisateur, client et facture
      const user = await request(app)
        .post('/api/users')
        .send({
          nom: 'PayUser',
          prenom: 'Test',
          email: 'pay.user@example.com',
          mot_de_passe: '12345678',
          categorie: 'PME',
          adresse: 'Libreville'
        });
      userId = user.body.id;

      const client = await request(app)
        .post('/api/clients')
        .send({
          nom: 'Durand',
          prenom: 'Luc',
          email: 'luc.durand@example.com',
          telephone: '0654987654',
          adresse: 'Rue Test',
          nif: '456789123A',
          rccm: 'GA-LBV-2025-B-0004',
          tva: 'GA4567891',
          user_id: userId
        });
      clientId = client.body.id;

      const facture = await request(app)
        .post('/api/factures')
        .send({
          numero: 'FAC-002',
          date: '2025-10-10',
          montant: 50000,
          client_id: clientId,
          user_id: userId
        });
      factureId = facture.body.id;
    });

    it('POST /api/payements - créer un paiement', async () => {
      const res = await request(app)
        .post('/api/payements')
        .send({
          montant: 50000,
          date: '2025-10-10',
          facture_id: factureId,
          user_id: userId
        });
      expect(res.statusCode).toBe(201);
      paiementId = res.body.id;
      console.log('💰 Paiement créé :', res.body);
    });

    it('GET /api/payements - récupérer tous les paiements', async () => {
      const res = await request(app).get('/api/payements');
      expect(res.statusCode).toBe(200);
      console.log('📦 Paiements :', res.body.map(p => p.id));
    });

    it('PUT /api/payements/:id - mettre à jour un paiement', async () => {
      const res = await request(app)
        .put(`/api/payements/${paiementId}`)
        .send({ montant: 55000 });
      expect(res.statusCode).toBe(200);
      console.log('✏️ Paiement mis à jour :', res.body);
    });

    it('DELETE /api/payements/:id - supprimer un paiement', async () => {
      const res = await request(app).delete(`/api/payements/${paiementId}`);
      expect(res.statusCode).toBe(200);
      console.log('🗑️ Paiement supprimé :', res.body);
    });
  });

});
