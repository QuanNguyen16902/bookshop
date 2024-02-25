import { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import IUser from "../../types/user.type";

interface State {
  currentUser: IUser | undefined;
}

type RenderContentFunction = (currentUser: IUser | undefined) => JSX.Element;

const IsAuthenticated = (renderContent: RenderContentFunction) => {
  const [state, setState] = useState<State>({
    currentUser: undefined,
  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setState({
        currentUser: user,
      });
    }
  }, []);

  const { currentUser } = state;

  return renderContent(currentUser);
};

export default IsAuthenticated;
