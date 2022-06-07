import React from "react";
import { Field, FieldInputProps, FieldMetaProps, FieldProps } from "formik";
import style from './FormControls.module.scss'

export type OwnProps = {
    type: string
}

export const CustomInputComponent: React.ComponentType<FieldProps> = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    return <>
        <input {...field} {...props} />
        {touched[field.name] &&
            errors[field.name] && <div className={style.errorField}>{errors[field.name] as React.ReactNode}</div>}
    </>
}

export const CustomTextareaComponent: React.ComponentType<FieldProps> = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {
    return <>
        <textarea {...field} {...props}></textarea>
        {touched[field.name] &&
            errors[field.name] && <div className={style.errorField}>{errors[field.name] as React.ReactNode}</div>}
    </>
}

export function createField<FormKeysType extends string>(
    placeholder: string | undefined,
    name: FormKeysType,
    component: React.ComponentType<FieldProps>,
    className: string = '',
    validate: ((value: any) => undefined | string | Promise<any>) | null,
    props = {}, text = '') {
    return <div className={className}>
        <Field
            placeholder={placeholder}
            name={name}
            component={component}
            validate={validate ? validate : null}
            {...props} /> {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string> 