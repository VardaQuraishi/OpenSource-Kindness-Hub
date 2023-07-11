const request = require('supertest');
const { app, server } = require('../index');
const mongoose = require('mongoose');
const ActOfKindness = require('../../models/actOfKindness');

// After all tests are done, close the MongoDB connection and the Express server
afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

// Before each test, clean up the test data by removing act of kindness documents with testData flag set to true
afterEach(async () => {
  await ActOfKindness.deleteMany({ testData: true });
});

// Test cases for the API endpoint: GET /api/acts-of-kindness
describe('GET /api/acts-of-kindness', () => {
  test('should get all acts of kindness', async () => {
    const response = await request(app).get('/api/acts-of-kindness');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1); // Assuming there is at least one act of kindness in the database
    // Add more assertions if needed
  });
});

// Test cases for the API endpoint: GET /api/acts-of-kindness/:id
describe('GET /api/acts-of-kindness/:id', () => {
  test('should return the specific act of kindness if the ID exists', async () => {
    // Create a new act of kindness for testing
    const actOfKindness = await ActOfKindness.create({
      title: 'Helping Hand',
      category: 'Volunteering',
      description: 'Offering assistance to those in need',
      image: 'https://unsplash.com/photos/dvhWhY337yQ',
      tags: ['kindness', 'volunteer', 'help'],
      testData: true // Set testData to true for test data
    });

    // Send a GET request to retrieve the act of kindness by its ID
    const response = await request(app).get(`/api/acts-of-kindness/${actOfKindness._id}`);
    expect(response.status).toBe(200);
    // Assert the response data matches the created act of kindness
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
    // Use a nonexistent ID for the GET request
    const nonexistentId = 'nonexistent-id';
    const response = await request(app).get(`/api/acts-of-kindness/${nonexistentId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Act of kindness not found' });
  });
});

// Test case for the API endpoint: POST /api/acts-of-kindness
describe('POST /api/acts-of-kindness', () => {
  test('should create an act of kindness', async () => {
    // Define the data for the new act of kindness
    const newActOfKindness = {
      title: 'Helping Poor',
      category: 'Volunteering',
      description: 'Good deeds payoff',
      image: 'https://unsplash.com/photos/dvhWhY337yQ',
      tags: ['kindness', 'poor', 'help'],
      testData: true // Set testData to true for test data
    };

    // Send a POST request to create the new act of kindness
    const response = await request(app)
      .post('/api/acts-of-kindness')
      .send(newActOfKindness);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Act of kindness created successfully');
    // Add more assertions if needed
  });
});

// Test cases for the API endpoint: PUT /api/acts-of-kindness/:id
describe('PUT /api/acts-of-kindness/:id', () => {
  test('should update an act of kindness if the ID exists', async () => {
    // Create a new act of kindness for testing
    const newActOfKindness = await ActOfKindness.create({
      title: 'Helping Hand',
      category: 'Volunteering',
      description: 'Offering assistance to those in need',
      image: 'https://unsplash.com/photos/dvhWhY337yQ',
      tags: ['kindness', 'volunteer', 'help'],
      testData: true // Set testData to true for test data
    });

    // Define the updated data
    const updatedData = {
      title: 'Updated Title',
      category: 'Updated Category',
      description: 'Updated Description',
      image: 'https://updated-image.com',
      tags: ['updated', 'tags']
    };

    // Send a PUT request to update the act of kindness by its ID
    const response = await request(app)
      .put(`/api/acts-of-kindness/${newActOfKindness._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Act of kindness updated successfully');
    // Add more assertions if needed
  });

  test('should return a 404 error if the act of kindness ID does not exist', async () => {
    // Use a nonexistent ID for the PUT request
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

// Test cases for the API endpoint: DELETE /api/acts-of-kindness/:id
describe('DELETE /api/acts-of-kindness/:id', () => {
  test('should delete an act of kindness if the ID exists', async () => {
    // Create a new act of kindness for testing
    const newActOfKindness = await ActOfKindness.create({
      title: 'Helping Hand',
      category: 'Volunteering',
      description: 'Offering assistance to those in need',
      image: 'https://unsplash.com/photos/dvhWhY337yQ',
      tags: ['kindness', 'volunteer', 'help'],
      testData: true // Set testData to true for test data
    });

    // Send a DELETE request to delete the act of kindness by its ID
    const response = await request(app).delete(`/api/acts-of-kindness/${newActOfKindness._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Act of kindness deleted successfully');
    // Add more assertions if needed
  });

  test('should return a 404 error if the act of kindness ID does not exist', async () => {
    // Use a nonexistent ID for the DELETE request
    const nonexistentId = new mongoose.Types.ObjectId();

    const response = await request(app).delete(`/api/acts-of-kindness/${nonexistentId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Act of kindness not found' });
  });
});
