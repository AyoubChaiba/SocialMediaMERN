import { FaSpinner, FaPenToSquare  } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordSchema } from '../../lib/validation';
import { AXIOS_CLIENT } from '../../lib/api/axios';


const FromSecurity = () => {

    const { register, handleSubmit, watch,  formState : { errors , isValid , isSubmitting } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(PasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    const NewPassword = watch('newPassword')
    const ConfirmPAssword = watch('confirmPassword')

    const updateProfile = async (data) => {
        try {
            const response = await AXIOS_CLIENT.put(`auth`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            toast.success(response.data.message, {
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
                        {...register('oldPassword')}
                    />
                    <p className='text-red-500'>{errors?.oldPassword?.message}</p>
                </div>
                <br />
                <div >
                    <label htmlFor="">New Password</label>
                    <input type="password"
                        placeholder='New password'
                        {...register('newPassword')}
                    />
                        <p className='text-red-500'>{errors?.newPassword?.message}</p>
                </div>
                <br />
                <div >
                    <label htmlFor="">Confirm password</label>
                    <input type="password"
                        placeholder='Confirm password'
                        {...register('confirmPassword')}
                    />
                    {NewPassword !== ConfirmPAssword && <p className='text-red-500'>Passwords do not match</p>}
                </div>
                <button className="btn-update"
                    type="submit"
                    disabled={ isSubmitting  || !isValid  }>
                    {isSubmitting ? <FaSpinner className='animate-spin h-5 w-5 mr-3'/>  : <FaPenToSquare />}
                    {isSubmitting  ? 'Loding...' : 'Update Password' }
                </button>
            </form>
        </div>
    )
}


export default FromSecurity