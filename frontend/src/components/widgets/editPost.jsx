import { useSelector } from 'react-redux';
import { useState } from "react";
import { FaCircleNotch } from "react-icons/fa6";
import EditPostPublication from '../home/EditPostPublication';

const EditPost = () => {
    const { profile } = useSelector( state => state.profile )
    const [ Loading, setLoading ] = useState(false)

    return (
        <>
            {
                !Loading ? (<>
                    <h1>Edit Post</h1>
                        <EditPostPublication profile={profile} />
                </>) :
                    <div className="loading">/
                        <FaCircleNotch />
                    </div>
            }
        </>
    )
}

export default EditPost