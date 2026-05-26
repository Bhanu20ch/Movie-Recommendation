import { useEffect } from "react";

import axios from "axios";

import { useUser } from "@clerk/clerk-react";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const { user } = useUser();

  useEffect(() => {
    syncUser();
  }, [user]);

  const syncUser = async () => {
    if (!user) return;

    try {
      await axios.post("http://localhost:5000/api/users/sync", {
        clerkId: user.id,
        username: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return <AppRoutes />;
}

export default App;
