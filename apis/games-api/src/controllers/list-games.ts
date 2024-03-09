import { Request, Response } from 'express';
import { GameBuilder, IGame } from '@aklapper/model';

const gb = new GameBuilder();

export const games: IGame[] = [
  gb
    .seId('0')
    .setName('Chutes-&-Ladders')
    .setDescription('First Game')
    .setImageURL(
      'https://i5.walmartimages.com/seo/Chutes-and-Ladders-Classic-Family-Board-Game-Games-for-Kids-Ages-3-and-up_e83d9bc1-a04d-4723-ad1b-4daeb60e771d.488d547f15eb7306b725e33010714f96.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF'
    )
    .setRule(
      1,
      'INSTRUCTIONS',
      `For 2 to 4 Players/AGES 3+
    This delightful game is simple and easy to play, even
    for children who can’t read. Fun pictures help kids
    understand the rewards of doing good deeds as
    they climb up the ladders and the consequences of
    naughty ones as they slide down the chutes.`
    )
    .setRule(
      2,
      'SETUP',
      `Everyone
      chooses a pawn to play. Any extra pawns are out of
      play. Chosen pawns start off the board near square
      #1. Now get ready for the fun! `
    )
    .build(),

  gb
    .seId('1')
    .setName('Tic-Tac-Toe')
    .setDescription('Second Game Placeholder')
    .setImageURL(
      'https://i5.walmartimages.com/seo/Tic-Tac-Toe-Game-Board-Classic-Board-Game-for-Giant-Connect-4-game-Indoor-Family-Toys-Set-for-Children-Adults-Coffee-Table-Home-Decor-5-9-X-5-9_23cdb90e-3ee1-47dd-87d5-f78e1705dd62.0d3cb2b5ad725ac5992e2dbc33c07dbe.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF'
    )
    .setRule(1, 'SETUP', `The game is played on a 3x3 grid`)
    .setRule(
      2,
      'TURNS',
      `Players take turns marking an empty square with their symbol (X or O)`
    )
    .setRule(
      3,
      'WIN',
      `The first player to get three of their marks in a row (up, down, across, or diagonally) wins`
    )
    .build(),
];

export const sendGameList = (req: Request, resp: Response) => {
  const gamesNameAndIdArr = games.map(
    (game) =>
      new Object({ name: game.name, id: game.id, imageURL: game.imageURL })
  );
  resp.status(200).json(gamesNameAndIdArr);
};

export const sendGameDetails = (req: Request, resp: Response) => {
  const selectedGameID = req.params.name;
  const selectedGame = games.find(({ name }) => name === selectedGameID);
  const selectedGameDetails = {
    name: selectedGame.name,
    rules: selectedGame.rules,
  };
  resp.status(200).json(selectedGameDetails);
};

