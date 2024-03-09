import request from 'supertest';
import app from '../server.js'

// describe('GET /', () => {
//     test('should render the index template', async () => {
//     const response = await request(app).get('/');
//     expect(response.status).toBe(200);
//     expect(response.text).toContain('<h2 class="welcome-header">Hello User</h2>');
//     expect(response.text).toContain('<p class="welcome-msg">You can create, search, upload, retrieve your uploaded files and download them</p>');
    
//     });
// });

describe('GET /', () => {
    test('should render the index template', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<h2 Hello world</h2>');
    // You can add more specific assertions here depending on your template content
});
});


describe('GET /delete-file/:filename', () => {
    test('should delete the specified file', async () => {
    const filename = 'elevator.txt'; 
    const response = await request(app).get(`/delete-file/${filename}`);
    expect(response.text).toEqual(`was successfully deleted`);
    
    });
});