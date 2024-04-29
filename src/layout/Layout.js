import React from 'react';
import Sidebar from '../Components/BarraMenu/sidebar';
function Layout({ children }) {
  return (
    <div className="container">
      <Sidebar /> 
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
