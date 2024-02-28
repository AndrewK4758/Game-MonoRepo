import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  getGameDetails,
  getGameList,
  getGameInstance,
} from './services/game_service';
import Waiting from './components/waiting';
import GamesList from './pages/pre_loaded';
import GameDetails from './components/game_details';
import App from './app';
import GameInstance from './pages/game_instance';

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
        path: `games/:id`,
        Component: GameDetails,
        loader: getGameDetails,
      },
      {
        path: 'games/:id/instances',
        Component: GameInstance,
        loader: getGameInstance,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<Waiting />} />
  </StrictMode>
);
