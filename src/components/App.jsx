import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../Routes/Navbar";
import Admin from "./Admin";
import Login from "./Login";

import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Definición del COMPONENTE
function App() {
  // Definición de ESTADOS y HOOKS
  const [firebaseUser, setFirebaseUser] = React.useState(false);

  // NOTA IMPORTANTE: en el ejemplo original este "onAuthStateChanged" esta en un "useEffect", pero en esta versión no funciona así y no renderiza la info
  onAuthStateChanged(auth, user => {
    if (user) {
      setFirebaseUser(user);
    } else {
      setFirebaseUser(null);
    }
  })

  // Generación HTML del COMPONENTE
  return firebaseUser !== false
    ? (
      <Router>
        <div>
          <Navbar firebaseUser={firebaseUser} />
          <Routes>
            <Route path="/" element={'inicio...'}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="*" element={'Sitio no encontrado...'}></Route>
          </Routes>
        </div>
      </Router>
    )
    : (<p>Cargando la información...</p>
    );
}

export default App;
