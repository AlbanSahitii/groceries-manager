import { useNavigate } from 'react-router-dom';
const Main = () => {
    const navigate = useNavigate()
    return (
        <>
        Main
        <button onClick={()=> navigate("/login")}> Login</button>
        </>
    )
}
export default Main