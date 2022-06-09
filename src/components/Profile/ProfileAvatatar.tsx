import { Field, Form, Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import photoPlaceholder from '../../assets/img/user-image.png'
import globalStyles from '../../globalStyles/globalStyle.module.scss'
import { savePhoto } from '../../redux/profile-reducer'
import { selectorGetUserProfile } from '../../redux/profile-selectors'
import { DispatchThunkType } from '../../redux/store'
import { Preloader } from '../common/Preloader/Preloader'
import style from './Profile.module.scss'


type PropsType = {
    isOwner: boolean
}

type ImageDataType = {
    image: null | File
}

export const ProfileAvatar: React.FC<PropsType> = ({ isOwner }) => {

    const profile = useSelector(selectorGetUserProfile)
    const dispatch: DispatchThunkType = useDispatch()


    const formInitialValues: ImageDataType = { image: null }
    const fileRef = useRef<HTMLInputElement>(null)


    return <div className={style.profileAvatarBlock}>
        <div className={style.profileImage}>
            <img src={profile?.photos.large || photoPlaceholder} alt="avatar" />
        </div>
        {isOwner &&
            <>
                <Formik
                    initialValues={formInitialValues}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log(values);
                        if (values.image) {
                            dispatch(savePhoto(values.image))
                            resetForm()
                        }
                    }}>
                    {({ values, setFieldValue }) =>
                        <Form>
                            {values.image && <PreviewPhoto file={values.image} />}
                            <div>
                                <button type='button'
                                    onClick={() => {
                                        fileRef.current?.click()
                                    }}
                                    className={globalStyles.btn}>Choose photo</button>
                                <input type='file' name='image'
                                    hidden
                                    accept='image/*'
                                    ref={fileRef}
                                    onChange={(e) => {
                                        setFieldValue('image', e.target.files?.[0])
                                    }} />
                                {values.image && <button onClick={() => {
                                    setFieldValue('image', null)
                                    if (fileRef.current) fileRef.current.value = ''
                                }}
                                    className={globalStyles.btn} type='button'>Clear</button>}
                                <button type='submit' className={globalStyles.btn}>Save Photo</button>
                            </div>
                        </Form>
                    }
                </Formik>
            </>}
    </div>
}

type PreviewPhotoType = {
    file: File
}

export const PreviewPhoto: React.FC<PreviewPhotoType> = ({ file }) => {
    const [preview, setPreview] = useState<string | null>(null)

    const reader = new FileReader()
    reader.onload = () => {
        setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    return <>
        {preview
            ? <div className={style.previewImage}>
                <img src={preview} alt="avatar" />
            </div>
            : <Preloader />}
    </>
}