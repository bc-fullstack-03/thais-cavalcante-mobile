import React, { ReactNode, useReducer } from "react";
import { getAuthHeader } from "../services/auth";
import { getProfile as getProfileById } from "../services/profile";

interface ProfilesContext {
  profiles?: Profile[];
  profile?: Profile;
  getProfile?: (profileId: string) => void;
}

const defaultValue: ProfilesContext = {
  profile: {} as Profile,
};

const Context = React.createContext<ProfilesContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: ProfilesContext, action) => {
    switch (action.type) {
      case "get_profile":
        return {
          ...state,
          profile: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const getProfile = async (profileId: string) => {
    try {
      const authHeader = await getAuthHeader();
      const profile = await getProfileById(profileId, authHeader);
      dispatch({ type: "get_profile", payload: profile });
    } catch (err) {}
  };

  return (
    <Context.Provider
      value={{
        ...state,
        getProfile,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
