import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import NuevoCliente, { action as newClientAction } from './pages/NuevoCliente';
import Index, {loader as clientsLoader} from './pages/Index';
import ErrorPage from './components/ErrorPage';
import EditarCliente, {loader as edidClientLoader, action as editClientAction} from './pages/EditarCliente';
import { action as deleteClientAction } from './components/Cliente';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientsLoader,
        errorElement: <ErrorPage />
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente />,
        action: newClientAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clientId/editar',
        element: <EditarCliente />,
        loader: edidClientLoader,
        action: editClientAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clientId/eliminar',
        action: deleteClientAction
      }
    ]
  }, 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
