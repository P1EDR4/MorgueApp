import React from 'react';
import './LoginVista.css';
import { FaUser, FaLock } from "react-icons/fa";


export class LoginForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {username: '', password: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({
        [name]: value
      });
    }
  
    handleSubmit(event) {
      this.validateForm();
      event.preventDefault();
    }

    validateForm() {
      if(this.state.username == "admin" && this.state.password == "admin"){
        window.location.href = "/Tabla";
      }
      else{
        alert("Las credenciales no son válidas");
      }
    }
  
    render() {
      return (
        <div className='wrapper'>
            <form onSubmit={this.handleSubmit}>
    <h1>Login</h1>
    <div className="input-box">
        <input name="username" type="text" value={this.state.username} placeholder='  Username ' required
        onChange={this.handleChange} />
        <FaUser className='icon'/>
    </div>
    <div className="input-box">
        <input name="password" type="password" value={this.state.password} placeholder='  Password ' required
        onChange={this.handleChange} />
        <FaLock className='icon'/>
    </div>
    <button type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span>Login</span>
    </button>
</form>
        </div>
      );
    }
  }