import axios from 'axios';

describe('GET /', () => {
  test('should return a message', async () => {
    const res = await axios.get(`/api/v1/games`);

    expect(res.data[0].name).toEqual('Chutes & Ladders');
    expect(res.data[1].name).toEqual('Tic Tac Toe');
  });
});
