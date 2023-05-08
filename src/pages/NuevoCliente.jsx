import React from 'react'
import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario';
import Error from '../components/Error';
import { addClient } from '../data/clientes';

/* ROUTING: 
  Todo esto viene de la librería react-router-dom
  -> Cuando se utilizan links <a><a>, es mejor usar el componente <Link to=""></Link>
  -> Cuando se utiliza un button onClick, es mejor usar useNavigate()
  -> Cuando se usan actions y loaders, es mejor usar redirect();
*/



export async function action({request}) {
  const formData = await request.formData()

  //Formas de revisar un FormData:
  //console.log(formData.get('nombre'));
  //console.log([...formData]);
  //console.log(Object.fromEntries(formData));

  const errors = [];
  const data = Object.fromEntries(formData);
  if(Object.values(data).includes('')){
    errors.push("Todos los campos son obligatorios");
  }

  const email = formData.get('email');
  const regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(email)){
    errors.push("Email no válido");
  }

  if(Object.keys(errors).length){
    return errors;
  }

  await addClient(data);

  return redirect('/');
}

const NuevoCliente = () => {

  const errors = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo cliente</h1>
      <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente.</p>
      <div className='flex justify-end'>
        <button className='bg-blue-800 text-white px-3 py-1 font-bold uppercase hover:bg-blue-700' onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

        {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method='POST' noValidate>
          <Formulario />
          <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-700' value="Registrar Cliente"/>
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente