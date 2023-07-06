const request = require('supertest');
const { app, server } = require('../index');
const mongoose = require('mongoose');
const ActOfKindness = require('../../models/actOfKindness');

afterAll(async () => {
  // Close the MongoDB connection
  await mongoose.connection.close();

  // Close the Express server
  await server.close(); // Close the server using the updated server object
});

describe('GET /api/acts-of-kindness', () => {
  test('should get all acts of kindness', async () => {
    const response = await request(app).get('/api/acts-of-kindness');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1); // Assuming there is at least one act of kindness in the database
    // Add more assertions if needed
  });
});

describe('GET /api/acts-of-kindness/:id', () => {
    test('should return the specific act of kindness if the ID exists', async () => {
      const actOfKindness = await ActOfKindness.create({
        title: 'Helping Hand',
        category: 'Volunteering',
        description: 'Offering assistance to those in need',
        image: 'https://unsplash.com/photos/dvhWhY337yQ',
        tags: ['kindness', 'volunteer', 'help']
      });
  
      const response = await request(app).get(`/api/acts-of-kindness/${actOfKindness._id}`);
      expect(response.status).toBe(200);
      expect(response.body._id).toBe(actOfKindness._id.toString());
      expect(response.body.title).toBe('Helping Hand');
      expect(response.body.category).toBe('Volunteering');
      expect(response.body.description).toBe('Offering assistance to those in need');
      expect(response.body.image).toBe('https://unsplash.com/photos/dvhWhY337yQ');
      expect(response.body.tags).toEqual(['kindness', 'volunteer', 'help']);
      expect(response.body.createdAt).toBeTruthy();
      expect(response.body.updatedAt).toBeTruthy();
      expect(response.body.__v).toBe(0);
      // Add more assertions if needed
    });
  
    test('should return a 404 error if the act of kindness ID does not exist', async () => {
      const nonexistentId = 'nonexistent-id';
      const response = await request(app).get(`/api/acts-of-kindness/${nonexistentId}`);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Act of kindness not found' });
    });
  });
