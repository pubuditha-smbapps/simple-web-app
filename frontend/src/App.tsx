import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/dashboard";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import NotFound from "./pages/common/NotFound";
import PrivateRoute from "./context/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/settings", element: <Settings /> },
];

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {protectedRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<PrivateRoute>{element}</PrivateRoute>}
            />
          ))}
          <Route
            path="*"
            element={
              <PrivateRoute>
                <NotFound />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
