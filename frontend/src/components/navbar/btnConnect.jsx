import { Link } from "react-router-dom"

const BtnConnect = () => {
    return (
    <div className="btn-connect">
        <Link className="login" to={'/login'}>Login</Link>
        <Link className="register" to={'/register'}>Sign up</Link>
    </div>
    )
}

export default BtnConnect