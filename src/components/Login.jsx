// Documentación en: https://firebase.google.com/docs/auth/web/password-auth?hl=es

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';  // Es la CONFIGURACIÓN MÍA en FIREBASE con el TOKEN del proyecto creado

// Definición del COMPONENTE
const Login = () => {
   // Definición de estados y HOOKS
   const [email, setEmail] = React.useState('')
   const [pass, setPass] = React.useState('')
   const [error, setError] = React.useState(null)
   const [esRegistro, setEsRegistro] = React.useState(true)
   const navigateTo = useNavigate()


   // Definir funciones
   //
   // FN: Procesar los datos del formulario
   const fnProcesarDatosLogReg = e => {
      e.preventDefault()
      if (!email.trim()) {
         setError('Debe ingresar un email.')
         // console.log(error)
         return
      }
      if (!pass.trim()) {
         setError('Debe ingresar una contraseña.')
         // console.log(error)
         return
      }
      if (pass.length < 6) {
         setError('La contraseña debe ser de 6 caracteres o más.')
         // console.log(error)
         return
      }
      setError(null)
      // valida si es REGISTRO DE USUARIO para proceder con la CREACIÓN DEL USUARIO y sus respectivas validaciones
      if (esRegistro) {
         fnRegistrarUsuario()
      } else {
         fnLogin()
      }
   }
   // FN: Crear un NUEVO USUARIO en AUTH (para servicios de autenticación) y en la BD FIRESTORE como un documento de una colección
   const fnRegistrarUsuario = React.useCallback(async () => {
      try {
         // Crea usuario en FIREBASE AUTH
         const userCredencials = await createUserWithEmailAndPassword(auth, email, pass)
         const user = userCredencials.user
         // Crea usuario en FIREBASE DB (Colección y documento)
         await setDoc(doc(db, 'usuarios', user.email),
            {
               email: user.email,
               uid: user.uid
            })
         setEmail('')
         setPass('')
         setError(null)
         navigateTo('/admin')
      } catch (error) {
         const errorCode = error.code
         if (errorCode === 'auth/invalid-email') {
            setError('El email no es válido.')
         }
         if (errorCode === 'auth/email-already-in-use') {
            setError('El email ya existe.')
         }
         console.log(error)
      }
   }, [email, pass])
   // FN: LOGIN de un usuario con email y contraseña con AUTH
   const fnLogin = React.useCallback(async () => {
      try {
         const userLoggedCredentials = await signInWithEmailAndPassword(auth, email, pass)
         setEmail('')
         setPass('')
         setError(null)
         
                  console.log(`Bienvenid@ ${userLoggedCredentials.user.email.split('@')[0]}. El acceso fue correcto.`)

         navigateTo('/admin')         
      } catch (error) {
         let msgError = `${error.code}: ${error.message}`
         if (error.code === 'auth/network-request-failed') {
            msgError = 'No se pudo acceder a la información. Revise la conexión a internet.'
         }
         if (error.code === 'auth/user-not-found') {
            msgError = 'Usuario no encontrado.'
         }
         if (error.code === 'auth/wrong-password') {
            msgError = 'Usuario o contraseña no válidos.'
         }
         setError(msgError)
         console.log('Código error:', error.code)
      }

   }, [email, pass])

   // Generación HTML del COMPONENTE
   return (
      <div>
         <div className="mt-5">
            <h3 className='text-center'>
               {esRegistro ? 'Registro de usuarios' : 'Login de acceso'}
            </h3>
            <hr />
            <div className="row justify-content-center">
               <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                  <form onSubmit={fnProcesarDatosLogReg}>
                     {
                        error && (
                           <div className="alert alert-danger">
                              {error}
                           </div>
                        )
                     }
                     <input
                        type="email"
                        className='form-control mb-2'
                        placeholder='Ingrese un email'
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                     <input
                        type="password"
                        className='form-control mb-2'
                        placeholder='Ingrese un password'
                        name="pass"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                     />
                     <button
                        className={'btn btn-lg btn-block w-100 mb-2 ' + (esRegistro ? ' btn-dark' : ' btn-success')}
                        type='submit'
                     >

                        {esRegistro ? 'Registrarse' : 'Acceder'}
                     </button>
                     <button
                        className="btn btn-info btn-sm btn-block w-100"
                        type='button'
                        onClick={() => setEsRegistro(!esRegistro)}
                     >
                        {
                           esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'
                        }
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;

