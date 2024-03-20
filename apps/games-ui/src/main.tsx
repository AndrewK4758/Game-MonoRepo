import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { loadGameBoard } from './services/loader_functions/game_board_loader';
import { returnPlayerAvatarRegisterFunctionality } from './services/loader_functions/register_player_avatar_loader_data';
import { getGameDetails } from './services/loader_functions/get_game_details';
import { getGameList } from './services/loader_functions/get_game_list';
import { registerPlayerAndAvatarAction } from './services/action_functions/register_player_avatar_action';
import { playGameButtonAction } from './services/action_functions/play_button_action';
import Waiting from './components/waiting';
import GamesList from './pages/games_list';
import GameDetails from './components/game_details';
import App from './app';
import RegisterPlayerAndGameID from './pages/register_player_on_game';
import BoardAndWaitToStart from './pages/show_game_board_and_wait_to_Start';

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
      },
      {
        path: `games/:name`,
        Component: GameDetails,
        loader: getGameDetails,
        action: playGameButtonAction,
      },
      {
        path: 'games/:name/play',
        Component: RegisterPlayerAndGameID,
        loader: returnPlayerAvatarRegisterFunctionality,
        id: 'register',
        action: registerPlayerAndAvatarAction,
      },
      {
        path: '/games/:name/play/board',
        Component: BoardAndWaitToStart,
        loader: loadGameBoard,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<Waiting />} />
  </StrictMode>
);

//session storage or local will send gameID in header