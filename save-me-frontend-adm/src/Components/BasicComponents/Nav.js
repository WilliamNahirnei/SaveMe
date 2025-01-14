import { Link } from "react-router-dom"

export default function App() {
  return (
    <react-fragment>
      <nav className="card">
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/pacientes">Pacientes</Link>
            </li>
        </ul>
      </nav>
    </react-fragment>
  );
}