import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import { useEffect, useState } from "react";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  const [render, setRender] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("matrice_user_cred")
        ? localStorage.getItem("matrice_user_cred")
        : null
    );

    if (user?.user) {
      setUser(user);
    }
  }, [render]);

  return (
    <div>
      <Routes>
        <Route element={<ProtectRoute render={render} />}>
          <Route
            path="/"
            element={
              <Home user={user} setRender={setRender} setUser={setUser} />
            }
          />
        </Route>
        <Route path="/signup" element={<SignUp setRender={setRender} />} />
        <Route path="/login" element={<Login setRender={setRender} />} />
      </Routes>
    </div>
  );
}

export default App;
