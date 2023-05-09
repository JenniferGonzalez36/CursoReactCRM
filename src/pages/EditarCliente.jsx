import React from 'react'
import { getClient, updateClient } from '../data/clientes';
import { Form, useNavigate, useLoaderData, useActionData, redirect } from 'react-router-dom';
import Formulario from '../components/Formulario';
import Error from '../components/Error';

export async function loader({params}){
    const client = await getClient(params.clientId);
    if(Object.values(client).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'No se encontraron resultados del cliente solicitado'
        })
    }
    return client;
}

export async function action({request, params}){
    const formData = await request.formData()

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

    await updateClient(params.clientId, data);

    return redirect('/');
}

const EditarCliente = () => {
    const navigate = useNavigate();
    const client = useLoaderData();
    const errors = useActionData();

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
            <p className='mt-3'>A continuación podrás modificar los datos de un cliente.</p>
            <div className='flex justify-end'>
                <button 
                    className='bg-blue-800 text-white px-3 py-1 font-bold uppercase hover:bg-blue-700'
                    onClick={() => navigate(-1)}
                >Volver</button>
            </div>

            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

                {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)}

                <Form method='POST' noValidate>
                <Formulario client={client}/>
                <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-700' value="Actualizar Cliente"/>
                </Form>
            </div>
        </>
    )
}

export default EditarCliente