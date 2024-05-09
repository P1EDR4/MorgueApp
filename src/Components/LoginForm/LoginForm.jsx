import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Navigate } from 'react-router-dom'; 

export class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false, 
      error: null,
      loggedIn: false 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.body.classList.add('login-background');
  }

  componentWillUnmount() {
    document.body.classList.remove('login-background');
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    this.setState({ loading: true, error: null }, () => {
      fetch('https://api-morgue-app3.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombreusuario: username, password: password })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Credenciales incorrectas');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); 
        setTimeout(() => { 
          this.setState({ loading: false, loggedIn: true }); 
          this.props.onLogin(); 
        }, 5000); 
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ loading: false, error: error.message });
      });
    });
  }
  
  render() {
 
    if (this.state.loggedIn) {
      return <Navigate to="/Dashboard" />;
    }

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
          {this.state.loading && (
            <div className="hourglassBackground">
              <div className="hourglassContainer">
                <div className="hourglassCurves"></div>
                <div className="hourglassCapTop"></div>
                <div className="hourglassGlassTop"></div>
                <div className="hourglassSand"></div>
                <div className="hourglassSandStream"></div>
                <div className="hourglassCapBottom"></div>
                <div className="hourglassGlass"></div>
              </div>
            </div>
          )}
          {this.state.error && (
            <div className="error">{this.state.error}</div>
          )}
      </div>
    );
  }
}

export default LoginForm;
