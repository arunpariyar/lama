import {User} from '../popups/ButtonNotifications';

export interface NavBarProps {
  user: User;
  setUser: (user: User) => void;  
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}
