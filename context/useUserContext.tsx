import { createContext, ReactNode, useContext, useReducer } from "react";



const initialUserData = {
  displayPic: "",
  username: "",
  access_token: "",
  _id: "",
  email: ""
}

type UserType = typeof initialUserData


// payload and type here normally will be a union type to accomodate different actions
interface ActionType  {
  payload: UserType
  type: string
}


const reducer = (state: UserType, action: ActionType): UserType => {
  switch (action.type) {
    case "LOGIN": return action.payload
    case "LOGOUT": return initialUserData
    default: return state
  }
}


interface userContextInterface {
  userData: UserType;
  dispatch: React.Dispatch<ActionType> 
}

//  create context here
const userContext = createContext<userContextInterface>(
  {} as userContextInterface
);

// wrap this component around App.tsx to get access to userData in all components
const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, dispatch] = useReducer(reducer, initialUserData);

  return (
    <userContext.Provider value={{ userData, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

// use this custom hook to get the data in any component in component tree
const useUserContext = () => useContext(userContext);
export { useUserContext, UserContextProvider };