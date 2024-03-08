import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    username: yup.string().required('Username is required').min(4).max(20),
    password: yup.string().required('Password is required')
        .min(5, 'Password must be at least 8 characters')
        .max(20, 'Password must not exceed 20 characters')
        .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain at least one letter, one number, and one special character'
        ),
    })

export const RegisterSchema = yup.object().shape({
    username: yup.string().min(3).max(15).required('username is required'),
    email: yup.string().email('There are errors in writing an email').required('Email is required'),
    password: yup.string().min(8).max(20).required('password is required').matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one letter, one number, and one special character'
    ),
})

export const EditProfileSchema = yup.object().shape({
    username: yup.string().min(3).max(15).required('username is required'),
    email: yup.string().email('There are errors in writing an email').required('Email is required'),
    // password: yup.string().min(8).max(20).required('password is required').matches(
    //     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //     'Password must contain at least one letter, one number, and one special character'
    // ),
    // confirmePassword: yup.string().min(8).max(20).required('password is required').matches(
    //     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //     'Password must contain at least one letter, one number, and one special character'
    // ),
})