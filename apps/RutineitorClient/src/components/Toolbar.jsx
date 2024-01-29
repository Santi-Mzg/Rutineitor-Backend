import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Toolbar() {

    const { handleSubmit } = useForm()
    const { signout, user, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async () => {
        localStorage.clear();
        signout()
        navigate('/login')
    })

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to="/workout">
                    <h1 className="navbar-brand">Rutineitor</h1>
                </Link>
                <ul className='flex gap-x-2'>
                    {isAuthenticated &&
                        <>
                            <li className="flex">
                                <h2 className='text-lg font-medium text-gray-600 py-2 pr-10'>{user.username}</h2>
                            </li>
                            <li>
                                <form className="d-flex" onSubmit={onSubmit}>
                                    <button className="btn btn-secondary my-2 my-sm-0 py-2 border-gray-600 text-gray-600" type="submit">Cerrar sesión</button>
                                </form>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Toolbar