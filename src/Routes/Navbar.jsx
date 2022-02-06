import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import logo_hs01 from '../assets/img/logo_hs01.svg'

// Definición del COMPONENTE
const Navbar = (props) => {
   // Definición de ESTADOS y HOOKS
   const navigateTo = useNavigate();
   // Definir funciones
   //
   // FN: CERRAR sesión del usuario
   const fnCerrarSesion = () => {
      signOut(auth).then(() => {
         navigateTo('/login')

      }).catch(error => {
         console.log('Revise, no se pudo serrar la sesión del usuario.')
      })
   }

   // Generación HTML del COMPONENTE
   return (
      <div className='navbar navbar-dark bg-dark'>
         <Link className='navbar-brand' to="/">
            <img className='ms-2' src={logo_hs01} alt="" width={40} height={40} /> AUTH
         </Link>
         <div>
            <div className="d-flex">
               <NavLink className='btn btn-dark me-2' to='/'>Inicio</NavLink>
               {
                  props.firebaseUser !== null
                     ? (
                        <NavLink className='btn btn-dark me-2' to='/admin'>Admin</NavLink>
                     )
                     : null
               }
               {
                  props.firebaseUser !== null
                     ? (
                        <button className='btn btn-dark'
                           onClick={() => fnCerrarSesion()}
                        >
                           Cerrar sesión
                        </button>
                     )
                     : (
                        <NavLink className='btn btn-dark me-2' to='/login'>Login</NavLink>
                     )
               }
            </div>
         </div>
      </div>
   );
};

export default Navbar;
