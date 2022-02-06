import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';

// Definición del COMPONENTE
const Admin = () => {
   // Definición de ESTADOS y HOOKS
   const userInSesion = auth.currentUser;
   const navigateTo = useNavigate()
   const [user, setUser] = React.useState(null);


   console.log('aquí... ')

   // React.useEffect(() => {
   //    if (userInSesion) {
   //       setUser(userInSesion);
   //    } else {
   //       navigateTo('/login')
   //       setUser(null)
   //       console.log('Ningún usuario ha iniciado sesión.')
   //    }
   // }, [])

   // Generación HTML del COMPONENTE
   return (
      <div>
         <h3>Ruta Protegida | Admin</h3>
      </div>
   );
};

export default Admin;
