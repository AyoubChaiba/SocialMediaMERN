import { FaSpinner, FaPenToSquare  } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropTypes } from 'prop-types';
import { useDispatch} from 'react-redux';
import { EditProfileSchema } from '../../lib/validation';
import { AXIOS_CLIENT } from '../../lib/api/axios';
import { setCurrentUser } from "../../toolkit/userSlice";


const FormEdit = ({user}) => {

    const dispatch = useDispatch()

    const { register, handleSubmit, formState : { errors , isValid , isSubmitting } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(EditProfileSchema),
        defaultValues: {
            username: user?.username,
            email: user?.email,
            firstName: user?.fullName.split(' ')[0],
            lastName : user?.fullName.split(' ')[1],
            avatar: '',
        },
    })

    const updateProfile = async data => {
        const formData = new FormData();
        formData.append('avatar', data.avatar[0]);
        formData.append('username', data.username);
        formData.append('fullName', `${data.firstName} ${data.lastName}`);
        formData.append('email', data.email);
        try {
            const { data } = await AXIOS_CLIENT.put(`users/${user.id}`, formData);
            dispatch(setCurrentUser({
                ...user,
                username: data.profile.username,
                fullName: data.profile.fullName,
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
                    <label htmlFor="">First name</label>
                    <input type="text"
                        placeholder='First name'
                        {...register('firstName')}
                    />
                    <p className='text-red-500'>{errors?.username?.message}</p>
                </div>
                <br />
                <div >
                    <label htmlFor="">Last name</label>
                    <input type="text"
                        name="confirmePassword"
                        placeholder='Last name'
                        {...register('lastName')}
                    />
                        <p className='text-red-500'>{errors?.username?.message}</p>
                </div>
                <br />
                <div >
                    <label htmlFor="">Username</label>
                    <input type="text"
                        placeholder='Username'
                        {...register('username')}
                    />
                    <p className='text-red-500'>{errors?.username?.message}</p>
                </div>
                <br />
                <div >
                    <label htmlFor="">Email</label>
                    <input type="text"
                        placeholder='email'
                        {...register('email')}
                    />
                    <p className='text-red-500'>{errors?.email?.message}</p>
                </div>
                <br />
                <div >
                    <label htmlFor="">Update avatar</label>
                    <input type="file"
                        className='file-input'
                        {...register('avatar')}
                    />
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

FormEdit.propTypes = {
    user : PropTypes.object.isRequired,
}


export default FormEdit