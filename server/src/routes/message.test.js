//

const request = require('supertest');
const { app } = require('../index.js');
const knex = require('knex')(require('../../knexfile.js')['development']);

describe('Messages Routes', () => {
  let selectedUserId;
  let selectedChatId;

  beforeAll(async () => {
    const user = await knex('users').select('id').first();
    if (!user) {
      throw new Error('No users found in the database');
    }
    selectedUserId = user.id;

    const chatMember = await knex('chat_members')
      .select('chat_id')
      .where('user_id', selectedUserId)
      .first();
    if (!chatMember) {
      const [newChatId] = await knex('chats').insert({
        name: 'Test Chat',
        is_group: true
      }).returning('id');
      selectedChatId = newChatId;

      await knex('chat_members').insert({
        user_id: selectedUserId,
        chat_id: selectedChatId
      });
    } else {
      selectedChatId = chatMember.chat_id;
    }

    const existingMessage = await knex('messages')
      .select('id')
      .where({ chat_id: selectedChatId, user_id: selectedUserId })
      .first();
    if (!existingMessage) {
      await knex('messages').insert({
        content: 'Initial test message',
        sent_at: new Date().toISOString(),
        user_id: selectedUserId,
        chat_id: selectedChatId
      });
    }
  });

  afterAll(async () => {
    await knex('messages')
      .where({
        content: 'Initial test message',
        user_id: selectedUserId,
        chat_id: selectedChatId
      })
      .del();

    const chat = await knex('chats').where({ id: selectedChatId, name: 'Test Chat' }).first();
    if (chat) {
      await knex('chat_members').where({ chat_id: selectedChatId }).del();
      await knex('chats').where({ id: selectedChatId }).del();
    }
    await knex.destroy();
  });

  describe('GET /messages/:user_id', () => {
    it('should return chats with messages for a user', async () => {
      const response = await request(app)
        .get(`/messages/${selectedUserId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      const chatData = response.body.find(chat => chat.id === selectedChatId);
      expect(chatData).toBeDefined();
      expect(chatData).toHaveProperty('id', selectedChatId);
      expect(chatData).toHaveProperty('name');
      expect(chatData).toHaveProperty('is_group');
      expect(chatData.messages).toBeInstanceOf(Array);
    });
  });

  describe('POST /messages', () => {
    it('should add a new message', async () => {
      const newMessage = {
        content: 'New test message',
        sent_at: new Date().toISOString(),
        user_id: selectedUserId,
        chat_id: selectedChatId
      };

      const response = await request(app)
        .post('/messages')
        .send(newMessage)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toEqual({ message: 'Message added' });

      const savedMessage = await knex('messages')
        .where({ content: newMessage.content, chat_id: selectedChatId })
        .first();
      expect(savedMessage).toBeDefined();
    });
  });
});