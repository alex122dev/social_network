import { Form, Formik } from "formik"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { ContactsType, ProfileType, SetProfileDataType } from "../../api/profileAPI"
import globalstyle from '../../globalStyles/globalStyle.module.scss'
import { actions, saveProfile } from "../../redux/profile-reducer"
import { selectorGetProfileErrorMessage, selectorGetProfileSavingSuccess } from "../../redux/profile-selectors"
import { DispatchThunkType } from "../../redux/store"
import { createField, CustomInputComponent, CustomTextareaComponent, GetStringKeys } from "../common/FormControls/FormControls"
import style from './Profile.module.scss'



type PropsType = {
    profile: ProfileType
    setEditMode: (value: boolean) => void
}

type ProfileKeysType = GetStringKeys<ProfileType>
type ContactsKeysType = GetStringKeys<ContactsType>



export const ProfileDataForm: React.FC<PropsType> = ({ profile, setEditMode }) => {

    const errorMessage = useSelector(selectorGetProfileErrorMessage)
    //const savingSuccess = useSelector(selectorGetProfileSavingSuccess)
    const dispatch: DispatchThunkType = useDispatch()

    //* for situations when server return value of properties null, where must to be string
    const formInitialValues = {
        aboutMe: profile.aboutMe || '',
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription || '',
        fullName: profile.fullName || '',
        contacts: {
            github: profile.contacts.github || '',
            vk: profile.contacts.vk || '',
            facebook: profile.contacts.facebook || '',
            instagram: profile.contacts.instagram || '',
            twitter: profile.contacts.twitter || '',
            website: profile.contacts.website || '',
            youtube: profile.contacts.youtube || '',
            mainLink: profile.contacts.mainLink || ''
        },
    }

    const backHandler = () => {
        setEditMode(false)
        dispatch(actions.setErrorMessage(null))
    }

    const saveProfileCallback = (profile: SetProfileDataType) => {
        dispatch(saveProfile(profile))
    }


    return <Formik
        initialValues={formInitialValues}
        onSubmit={(values) => {
            console.log(values);
            saveProfileCallback(values)
            //setEditMode(false)
        }}
    >
        <Form>
            <button className={globalstyle.btn} type='submit'>save changes</button>
            <button className={globalstyle.btn} type='button' onClick={backHandler}>back</button>

            {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}

            <div className={style.infoItem}><b>Full name</b>:
                {createField<ProfileKeysType>('Full name', 'fullName', CustomInputComponent, '', null)}
            </div>
            <div className={style.infoItem}><b>Looking for a job</b>:
                {createField<ProfileKeysType>(undefined, 'lookingForAJob', CustomInputComponent, '', null, { type: 'checkbox' })}
            </div>
            <div className={style.infoItem}><b>My skills</b>:
                {createField<ProfileKeysType>('My skills', 'lookingForAJobDescription', CustomTextareaComponent,
                    '', null, { className: style.formTextarea })}
            </div>
            <div className={style.infoItem}><b>About me</b>:
                {createField<ProfileKeysType>('Tell about you', 'aboutMe', CustomTextareaComponent,
                    '', null, { className: style.formTextarea })}
            </div>
            <div className={style.infoItem}><b>Contacts</b>: <ul className={style.contactsList}>{Object.keys(profile.contacts).map(k => {
                return <li key={k} className={style.contactsItem}><b>{k}</b>:
                    {createField(k, 'contacts.' + k, CustomInputComponent, '', null)}
                </li>
            })}</ul></div>
        </Form>
    </Formik>
}