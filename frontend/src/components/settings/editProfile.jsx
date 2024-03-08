// import { FaSpinner } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropTypes } from 'prop-types';
// import { useDispatch} from 'react-redux';
import { EditProfileSchema } from '../../lib/validation';
import { AXIOS_CLIENT } from '../../lib/api/axios';


const EditProfile = ({user}) => {

    const { register, handleSubmit, formState : { errors , isValid , isSubmitting , submitCount  } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(EditProfileSchema),
        defaultValues: {
            username: user?.username,
            email: user?.email,
            avatar: '',
            // bio: user.bio,
        },
    })

    // useEffect(() => {
    //     const getData = async () => {
    //     try {
    //         const {
    //         data: { profile },
    //         } = await AXIOS_CLIENT.get("/auth/user");
    //         if (profile) {
    //         const { id, email, username, avatar } = profile;
    //         setUserData({ id, email, username, avatarUrl: avatar });
    //         } else {
    //         throw new Error("Profile data not found");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setError("Error fetching user data");
    //     } finally {
    //         setLoading(false);
    //     }
    //     };
    //     getData();
    // }, []);

    const editProfile = async (data) => {
        const formData = new FormData();
        formData.append('avatar', data.avatar);
        formData.append('username', data.username);
        formData.append('email', data.email);
        try {
            const response = await AXIOS_CLIENT.put(`users/${user.id}`, formData);
                toast.success(response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="editForm">
            <form onSubmit={handleSubmit(editProfile)}>
                <div htmlFor="">
                    <label>username</label>
                    <input type="text"
                        placeholder='Username'
                        {...register('username')}
                    />
                    <p className='text-red-500'>{errors?.username?.message}</p>
                </div>
                <br />
                <div htmlFor="">
                    <label>email</label>
                    <input type="text"
                        placeholder='email'
                        {...register('email')}
                    />
                    <p className='text-red-500'>{errors?.email?.message}</p>
                </div>
                <br />
                {/* <div htmlFor="">
                    <label>password</label>
                    <input type="text"
                        placeholder='password'
                        {...register('password')}
                    />
                </div>
                <br />
                <div htmlFor="">
                    <label> confirme password</label>
                    <input type="text"
                        name="confirmePassword"
                        placeholder='confirme password'
                        {...register('confirmePassword')}
                    />
                </div>
                <br />
                */}
                <div htmlFor="">
                    <label>update avatar</label>
                    <input type="file"
                        {...register('avatar')}
                    />
                </div>
                <button type="submit" >Sign In</button>
            </form>
        </div>
    )
}

EditProfile.propTypes = {
    user : PropTypes.object.isRequired,
}


export default EditProfile