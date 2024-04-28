import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";

export class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false // Agrega un estado para manejar la carga
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Agrega la clase cuando el componente se monta
    document.body.classList.add('login-background');
  }

  componentWillUnmount() {
    // Remueve la clase cuando el componente se desmonta
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
    this.setState({ loading: true }, () => {
      setTimeout(() => {
        this.validateForm();
        this.setState({ loading: false });
      }, 5000); // Tiempo animacion
    });
  }

  validateForm() {
    if(this.state.username === "admin" && this.state.password === "admin"){
      this.props.onLogin();
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
      </div>
    );
  }
}

export default LoginForm;