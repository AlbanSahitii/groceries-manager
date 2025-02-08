import { useNavigate } from 'react-router-dom';

import carrotLogo from './src/img/carrot-icon.png'

const Main = () => {
    const navigate = useNavigate()
    return (
        <>
        Main
        <button onClick={()=> navigate("/login")}> Login</button>
        <div className='main'>
            <nav>
                <div className='left-nav'>
                    <ol>
                        <li><img src={carrotLogo}></img></li>
                        <li className='title'>Sync Basket</li>
                    </ol>
                </div>
                <div className='right-nav'>
                    <ol>
                        <li>login</li>
                        <hr></hr>
                        <li>register</li>
                    </ol>
                </div>
            </nav>

            <div className='information-section'>
                <div className='information'>
                    <ol>
                        <img alt='tick'></img><li>keep track of everything you buy</li>
                        <img alt='tick'></img><li>keep track of everything you buy</li>
                        <img alt='tick'></img><li>keep track of everything you buy</li>
                    </ol>
                </div>
                <div className='name-slogan'>
                    <h1>SyncBasket</h1>
                    <p>Do groceries the smart way</p>
                </div>
            </div>

            <div className='image slider'>
                <img alt='left-arrow'></img>
                <img alt='photo 1'></img>
                <img alt='photo 2'></img>
                <img alt='photo 3'></img>
                <img alt='photo 4'></img>
                <img alt='right-arrow'></img>
            </div>
            <div className='footer'>
                <ol>
                    <li>Company</li>
                    <li>About Us</li>
                    <li>Terms</li>
                </ol>
                <ol>
                    <li>Useful Links</li>
                    <li>Support</li>
                    <li>Contact</li>
                </ol>
                <ol>
                    <li>Follow us</li>
                    <li><img alt='facebook logo'></img></li>
                    <li><img alt='twitter logo'></img></li>
                    <li><img alt='instagram logo'></img></li>
                </ol>
            </div>


        </div>

        </>
    )
}
export default Main