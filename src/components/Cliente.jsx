import React from 'react'
import { useNavigate, Form, redirect } from 'react-router-dom';
import { deleteClient } from '../data/clientes';

export async function action({params}){
    await deleteClient(params.clientId);
    return redirect('/');
}


const Cliente = ( {client} ) => {

    const {name, enterprise, email, phone, id} = client;

    const navigate = useNavigate();

    return (
        <tr className='border-b'>
            <td className='p-6 space-y-2'>
                <p className='text-2xl text-gray-800'>{name}</p>
                <p>{enterprise}</p>
            </td>
            <td className='p-6'>
                <p className='text-gray-600'><span className='text-gray-800 uppercase font-bold'>Email:</span> {email}</p>
                <p className='text-gray-600'><span className='text-gray-800 uppercase font-bold'>Tel:</span> {phone}</p>
            </td>
            <td className='p-6 flex gap-3'>
                <button 
                    type="button" 
                    className='text-blue-600 hover:text-blue-700 uppercase font-bold text-xs'
                    onClick={() => navigate(`/clientes/${id}/editar`)}    
                >Editar</button>
                <Form 
                    method='post'
                    action={`/clientes/${id}/eliminar`}
                    onSubmit={e => {
                        if(!confirm('¿Estás seguro que quieres eliminar este registro?')){
                            e.preventDefault();
                        }
                    }}
                >
                    <button type="submit" className='text-red-600 hover:text-red-700 uppercase font-bold text-xs'>Eliminar</button>
                </Form>
             
            </td>
        </tr>
    )
}

export default Cliente