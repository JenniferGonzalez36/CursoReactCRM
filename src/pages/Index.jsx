import React from 'react'
import { useLoaderData } from 'react-router-dom';
import Cliente from '../components/Cliente';
import { getClients } from '../data/clientes';

export function loader(){
  return getClients();
}

const Index = () => {

  const clients = useLoaderData(); 

  return (
    <>
      <h1 className='font-black text-4x1 text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus Clientes</p>
      {clients.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='p-2'>Cliente</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <Cliente client={client} key={client.id}/>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No hay clientes aún.</p>
      )}
    </>
  )
}

export default Index