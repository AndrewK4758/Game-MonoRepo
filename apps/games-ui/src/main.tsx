import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  getGameDetails,
  getGameList,
  createGameInstance,
} from './services/game_service';
import Waiting from './components/waiting';
import GamesList from './pages/games_list';
import GameDetails from './components/game_details';
import App from './app';
import GameInstance from './pages/game_instance';
import GameBoard from './pages/game_board';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: 'games',
        Component: GamesList,
        loader: getGameList,
        children: [],
      },
      {
        path: `games/:name`,
        Component: GameDetails,
        loader: getGameDetails,
      },
      {
        path: 'games/:name/play',
        Component: GameInstance,
      },
      {
        path: 'games/:name/play/:gameID',
        Component: GameBoard,
        loader: createGameInstance,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<Waiting />} />
  </StrictMode>
);
