const request = require('supertest');
const { app } = require('../index.js');
const knex = require('knex')(require('../../knexfile.js')['development']);
const argon2 = require('argon2');

const testUser = {
  first_name: 'Kevin',
  last_name: 'Halls',
  rank: 'Sgt',
  email: 'kevin.halls@example.com',
  password: 'badpassword123',
  phone: '1234567890',
  organization: 'Delta 55',
  crew: 'Echo',
  position: 'Supervisor',
  permissions: 'user'
};

const testEvents = [
    {
        start_date: '2025-04-10T09:00:00Z',
        end_date: '2025-04-15T19:00:00Z',
        title: 'Supra Coders',
        description: 'Random test',
        color: '#FF0000'
    },
    {
        start_date: '2025-04-11T09:00:00Z',
        end_date: '2025-04-11T17:00:00Z',
        title: 'Free Pizza',
        description: 'Jk no free pizza it is 5.99',
        color: '#00FF00'
    }
];

describe('Events Routes', () => {
    let createdUserId;

    beforeAll(async () => {
        await knex('users').where({ email: testUser.email }).del();

        const hashedPassword = await argon2.hash(testUser.password);
        await knex('users').insert({
            ...testUser,
            password: hashedPassword
        });

        const user = await knex('users').where({ email: testUser.email }).first();
        createdUserId = user.id;
        await knex('events').insert(
            testEvents.map(event => ({
                ...event,
                user_id: createdUserId
            }))
        );
    });

    afterAll(async () => {
        await knex('events').where({ user_id: createdUserId }).del();
        await knex('users').where({ email: testUser.email }).del();
        await knex.destroy();
    }, 10000);

    describe('GET /events/', () => {
        it('should return all users with their events', async () => {
            const response = await request(app)
                .get('/events')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);

            const testUserData = response.body.find(user => user.id === createdUserId);
            expect(testUserData).toBeDefined();
            expect(testUserData.label).toEqual({
                title: `${testUser.rank} ${testUser.first_name} ${testUser.last_name}`,
                subtitle: `${testUser.crew} ${testUser.position}`
            });
            expect(testUserData.data).toHaveLength(2);

            expect(testUserData.data[0]).toMatchObject({
                startDate: testEvents[0].start_date,
                endDate: testEvents[0].end_date,
                title: testEvents[0].title,
                description: testEvents[0].description,
                bgColor: testEvents[0].color
            });

            expect(testUserData.data[1]).toMatchObject({
                startDate: testEvents[1].start_date,
                endDate: testEvents[1].end_date,
                title: testEvents[1].title,
                description: testEvents[1].description,
                bgColor: testEvents[1].color
            });
        });

        it('should handle errors', async () => {
            jest.spyOn(knex, 'select').mockImplementationOnce(() => {
                throw new Error('Database error');
            });

            const response = await request(app)
                .get('/events')
                .expect('Content-Type', /json/)
                .expect(500);

            expect(response.body).toHaveProperty('error', 'Database error');
            jest.restoreAllMocks();
        });
    });

    describe('GET /events/:id', () => {
        it('should return events for a specific user', async () => {
            const response = await request(app)
                .get(`/events/${createdUserId}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toMatchObject({
                id: createdUserId,
                label: {
                    title: `${testUser.rank} ${testUser.first_name} ${testUser.last_name}`
                }
            });

            expect(response.body.data).toHaveLength(2);
            expect(response.body.data[0]).toMatchObject({
                startDate: testEvents[0].start_date,
                endDate: testEvents[0].end_date,
                title: testEvents[0].title,
                description: testEvents[0].description,
                bgColor: testEvents[0].color
            });

            expect(response.body.data[1]).toMatchObject({
                startDate: testEvents[1].start_date,
                endDate: testEvents[1].end_date,
                title: testEvents[1].title,
                description: testEvents[1].description,
                bgColor: testEvents[1].color
            });
        });

        it('should return 500 if user is not found', async () => {
            await knex('users').where({ id: createdUserId }).del();

            const response = await request(app)
                .get(`/events/${createdUserId}`)
                .expect('Content-Type', /json/)
                .expect(500);

            expect(response.body).toHaveProperty('error');
            const hashedPassword = await argon2.hash(testUser.password);
            await knex('users').insert({
                ...testUser,
                password: hashedPassword
            });
        });
    });
});