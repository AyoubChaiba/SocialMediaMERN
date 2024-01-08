import { RouterProvider } from 'react-router-dom';
import { Router } from './router/index';
import "./app.scss"

let App = () => {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  )
}

export default App
