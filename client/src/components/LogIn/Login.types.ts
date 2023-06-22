import {User} from '../popups/ButtonNotifications';

export interface LogInProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setCurrentUser: (user: User) => void;
}

