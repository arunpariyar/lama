import {User} from '../popups/ButtonNotifications';

export interface NavBarProps {
  user: User;
  setUser: (user: User) => void;  
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}



//Type '{ isLoggedIn: boolean; setIsLoggedIn: Dispatch<SetStateAction<boolean>>; user: { _id: string; }; setUser: Dispatch<SetStateAction<{ _id: string; }>>; }' is not assignable to type 'IntrinsicAttributes & NavBarProps'.
  //   Property 'user' does not exist on type 'IntrinsicAttributes & NavBarProps'.
