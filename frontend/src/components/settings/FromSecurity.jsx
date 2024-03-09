import { FaSpinner, FaPenToSquare  } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropTypes } from 'prop-types';
import { useDispatch} from 'react-redux';
import { EditProfileSchema } from '../../lib/validation';
import { AXIOS_CLIENT } from '../../lib/api/axios';
import { setCurrentUser } from "../../toolkit/userSlice";


const FromSecurity = ({user}) => {

    const dispatch = useDispatch()

    const { register, handleSubmit, formState : { errors , isValid , isSubmitting } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(EditProfileSchema),
        defaultValues: {
            username: user?.username,
            email: user?.email,
            firstName: user?.firstName,
            lastName : user?.lastName,
            avatar: '',
        },
    })

    const updateProfile = async data => {
        const formData = new FormData();
        formData.append('avatar', data.avatar[0]);
        formData.append('username', data.username);
        formData.append('email', data.email);
        try {
            const { data } = await AXIOS_CLIENT.put(`users/${user.id}`, formData);
            dispatch(setCurrentUser({
                ...user,
                username: data.profile.username,
                email: data.profile.email,
                avatar: data.profile.avatar
            }));
            toast.success(data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="editForm">
            <form onSubmit={handleSubmit(updateProfile)}>
                <div >
                    <label htmlFor="">Old Password</label>
                    <input type="password"
                        placeholder='Old Password'
                        {...register('old_password')}
                    />
                    <p className='text-red-500'>{errors?.username?.message}</p>
                </div>
                <br />
                <div >
                    <label htmlFor="">New Password</label>
                    <input type="password"
                        placeholder='New password'
                        {...register('new_password')}
                    />
                        <p className='text-red-500'>{errors?.username?.message}</p>
                </div>
                <br />
                <div >
                    <label htmlFor="">Confirm password</label>
                    <input type="password"
                        placeholder='Confirm password'
                        {...register('confirm_password')}
                    />
                    <p className='text-red-500'>{errors?.username?.message}</p>
                </div>
                <button className="btn-update"
                    type="submit"
                    disabled={ isSubmitting  || !isValid  }>
                    {isSubmitting ? <FaSpinner className='animate-spin h-5 w-5 mr-3'/>  : <FaPenToSquare />}
                    {isSubmitting  ? 'Loding...' : 'Update' }
                </button>
            </form>
        </div>
    )
}

FromSecurity.propTypes = {
    user : PropTypes.object.isRequired,
}


export default FromSecurity