import './App.css';
import Login from "./Components/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import ForgotPassword from './Components/ForgotPassword';
import Signup from './Components/Signup';
import UpdateBio from './Components/UpdateBio';
function App() {
  return (<>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
           <Route
            path="/updateBio"
            element={
              <PrivateRoute>
                <UpdateBio />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
  </>
  );
}

export default App;
