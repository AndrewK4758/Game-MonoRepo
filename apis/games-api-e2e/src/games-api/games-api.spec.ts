import axios from 'axios';

describe('GET Games ', () => {
  it("should return an array of games names and id's", async () => {
    const res = await axios.get(`/api/v1/games`);

    expect(res.status).toBe(200);
    expect(res.data[0].name).toEqual('Chutes & Ladders');
    expect(res.data[1].name).toEqual('Tic Tac Toe');
  });
});
describe('GET Game details', () => {
  it('should return the details for selected game', async () => {
    const id = 0;
    const res = await axios.get(`api/v1/games/${id}`);

    expect(res.status).toBe(200);
    expect(res.data.rules.length).toBe(2);
    expect(res.data.name).toBe('Chutes & Ladders');
  });
});
