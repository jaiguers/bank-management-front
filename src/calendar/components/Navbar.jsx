import { useAuthStore } from "../../hooks/useAuthStore"
import { NavLink } from 'react-router-dom';


export const Navbar = () => {

  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        {user.name}
      </span>
      <ul className="nav">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link navbar-brand" >
            <span className="label">Inicio</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/cards" className="nav-link navbar-brand" >
            <span className="label">Solicitar tarjeta</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/transaction" className="nav-link navbar-brand" >
            <span className="label">Transferencias</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/historical" className="nav-link navbar-brand" >
            <span className="label">Historico</span>
          </NavLink>
        </li>
      </ul>

      <button
        className="btn btn-outline-danger"
        onClick={startLogout}
      >
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  )
}
