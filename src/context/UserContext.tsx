import { User } from '@/interfaces/user.interface';
import { userInitialState, UserReducer } from '@/reducers/UserReducer';
import { ActionUserType } from '@/types/types';
import { createContext, Dispatch, useReducer } from 'react';

export const UserContext = createContext<{
  state: User;
  dispatch: Dispatch<ActionUserType>;
}>({
  state: userInitialState,
  dispatch: () => null,
});

export const UserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, userInitialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
