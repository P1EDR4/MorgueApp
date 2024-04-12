import React from 'react';
import Tabla from '../Components/Tabla/Tabla';


function Layout({children}) {
  return (
    <div>
      <Tabla/>
      {children}
    </div>
  )
}


export default Layout
