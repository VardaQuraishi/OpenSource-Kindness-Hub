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

describe('POST /api/acts-of-kindness', () => {
  test('should create an act of kindness', async () => {
    const newActOfKindness = {
      title: 'Helping Poor',
      category: 'Volunteering',
      description: 'Offering assistance to those in need',
      image: 'https://unsplash.com/photos/dvhWhY337yQ',
      tags: ['kindness', 'volunteer', 'help']
    };

    const response = await request(app)
      .post('/api/acts-of-kindness')
      .send(newActOfKindness);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Act of kindness created successfully');
    // Add more assertions if needed
  });
});

describe('PUT /api/acts-of-kindness/:id', () => {
  test('should update an act of kindness if the ID exists', async () => {
    // Create a new act of kindness
    const newActOfKindness = await ActOfKindness.create({
      title: 'Helping Hand',
      category: 'Volunteering',
      description: 'Offering assistance to those in need',
      image: 'https://unsplash.com/photos/dvhWhY337yQ',
      tags: ['kindness', 'volunteer', 'help']
    });

    // Generate the updated data
    const updatedData = {
      title: 'Updated Title',
      category: 'Updated Category',
      description: 'Updated Description',
      image: 'https://updated-image.com',
      tags: ['updated', 'tags']
    };

    // Make the PUT request with the newActOfKindness ID
    const response = await request(app)
      .put(`/api/acts-of-kindness/${newActOfKindness._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Act of kindness updated successfully');
    // Add more assertions if needed
  });

  test('should return a 404 error if the act of kindness ID does not exist', async () => {
    const nonexistentId = new mongoose.Types.ObjectId();
    const updatedData = {
      title: 'Updated Title',
      category: 'Updated Category',
      description: 'Updated Description',
      image: 'https://updated-image.com',
      tags: ['updated', 'tags']
    };
  
    const response = await request(app)
      .put(`/api/acts-of-kindness/${nonexistentId}`)
      .send(updatedData);
  
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Act of kindness not found' });
  });
  
  
});

