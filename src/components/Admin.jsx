import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';

// Definición del COMPONENTE
const Admin = () => {
   // Definición de ESTADOS y HOOKS
   // const user = auth.currentUser;
   const navigateTo = useNavigate()
   const [user, setUser] = React.useState(auth.currentUser);
   const [userFromEmail, setUserFromEmail] = React.useState('')

   React.useEffect(() => {
      if (user) {
         setUser(user);
         setUserFromEmail(fnExtractUserFromEmail(user.email))
         console.log(user)
      } else {
         navigateTo('/login')
         setUser(null)
         setUserFromEmail('')
         console.log('Ningún usuario ha iniciado sesión.')
      }
   }, [user, navigateTo])

   // Definir funciones
   //
   // FN: Extraer usuario del email registrado
   const fnExtractUserFromEmail = (emailAddress => {
      return emailAddress.split('@')[0]
   })

   // Generación HTML del COMPONENTE
   return (
      <div>
         <h3>Ruta Protegida | Admin</h3>
         {
            user && (
               <h4 className='text-success fw-bold'>Bienvenido "{userFromEmail}".</h4>
            )
         }

      </div>
   );
};

export default Admin;
