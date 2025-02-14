import { useNavigate } from 'react-router-dom';
import carrotLogo from './src/img/carrot-icon.png'
import backgroundImage from '../src/img/background-fruits.png'

import './src/styles/main-page.css'


const Main = () => {
    const navigate = useNavigate()
    return (
        <>
        <nav> 
            <div className='nav-container'>
                <div className="logo">
                    <img alt='logo' src={carrotLogo}></img>
                </div>
                <div className='nav-information'>
                    <a href='/about'>About</a>
                    <a href='/features'>Features</a>
                </div>
                <div className="nav-auth">
                    <a href='/login'>Login</a>
                    <a href='/register'>Register</a>
                </div>
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