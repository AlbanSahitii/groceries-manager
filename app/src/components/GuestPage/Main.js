import { useNavigate } from 'react-router-dom';

import carrotLogo from './src/img/carrot-icon.png'

const Main = () => {
    const navigate = useNavigate()
    return (
        <>
        <nav>
            <div className="logo">
                <img alt='logo'></img>
            </div>
            <div className='nav-information'>
                <a href='/about'>About</a>
                <a href='/features'>Features</a>
            </div>
            <div className="nav-auth">
                <button onClick={()=> navigate("/login")}> Login</button>
                <button onClick={()=> navigate("/register")}> Register</button>

            </div>
        </nav>

        <section className='hero-section'>
            <h1>SyncBasket</h1>
            <p>Do groceries in smart way.</p>
            <button onClick={()=> navigate('/register')}>Get Started</button>
        </section>

        </>
    )
}
export default Main