import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { getGameDetails, getGameList } from './services/game_service';
import Waiting from './components/waiting';
import PreLoaded from './pages/pre_loaded';
import GameDetails from './components/game_details';
import App from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    loader: getGameList,
    children: [
      {
        path: 'games',
        Component: PreLoaded,
        loader: getGameList,
        children: [],
      },
      {
        path: `games/:id`,
        Component: GameDetails,
        loader: getGameDetails,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<Waiting />} />
  </StrictMode>
);
