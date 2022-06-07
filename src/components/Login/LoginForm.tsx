import style from './Login.module.scss'
import { Form, Formik } from "formik"
import { createField, CustomInputComponent, GetStringKeys } from "../common/FormControls/FormControls";
import globalstyle from '../../globalStyles/globalStyle.module.scss'
import { DispatchThunkType } from "../../redux/store";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { selectorGetCaptchaUrl, selectorGetMessageError } from "../../redux/auth-selectors";
import { useSelector } from "react-redux";
import React from 'react';

type PropsType = {
}

type FormType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type ProfileKeysType = GetStringKeys<FormType>

export const LoginForm: React.FC<PropsType> = React.memo(() => {
    const validate = (str: string) => {
        if (!str.length) return 'give more symbols'
    }

    const validateCheck = (val: boolean) => {
        if (val) return undefined
        return 'you must check'
    }


    const captchaUrl = useSelector(selectorGetCaptchaUrl)
    const messageError = useSelector(selectorGetMessageError)
    const dispatch: DispatchThunkType = useDispatch()

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setTimeout(() => {
            dispatch(login(values.email, values.password, values.rememberMe, values.captcha))
            //console.log(values);
            setSubmitting(false);
        }, 400);
    }
    console.log('render form');

    return <Formik
        initialValues={{ email: '', password: '', rememberMe: false, captcha: '' }}
        onSubmit={submit}
    >
        {({ isSubmitting, errors }) => {
            //console.log('All errors', errors);


            return <Form>
                {createField<ProfileKeysType>('email', 'email', CustomInputComponent, style.loginItem, validate, { type: 'email', className: style.loginInput })}
                {createField<ProfileKeysType>('password', 'password', CustomInputComponent, style.loginItem, validate, { type: 'password', className: style.loginInput })}
                {createField<ProfileKeysType>('password', 'rememberMe', CustomInputComponent, '',
                    validateCheck, { type: 'checkbox' }, 'remember me')}


                {captchaUrl && <div className={style.captchaImage}><img src={captchaUrl} alt="captcha image" /></div>}
                {captchaUrl && createField<ProfileKeysType>('image text', 'captcha',
                    CustomInputComponent, style.loginItem, validate, { type: 'text', className: style.loginInput })}


                {messageError && <div className={style.requestError}>{messageError}</div>}
                <button type="submit" className={globalstyle.btn} disabled={isSubmitting}>
                    Submit
                </button>
            </Form>
        }}
    </Formik>
})