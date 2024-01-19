import { Link } from "react-router-dom"

const BtnConnect = () => {
    return (
    <div className="flex items-center">
        <button
                type="button"
                className="text-white mr-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-indigo-600 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 motion-reduce:transition-none">
                Login
            </button>
            <button
                type="button"
                className=" bg-indigo-500 mr-3 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white">
                Sign up
        </button>
    </div>
    )
}

export default BtnConnect