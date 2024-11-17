import { useAuthStore } from "../stores/authStore";
import { authHttp } from "../utils";

export const fetchUser = async () => {
  const user = useAuthStore.getState().user;
  if (!user) {
    return null;
  }
  try {
    const resp = await authHttp.get("/me");
    useAuthStore.setState({ user: resp.data });
  } catch (error) {
    console.error(error);
    return null;
  }
};
