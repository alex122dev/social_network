import { Form, Formik } from "formik"
import { useSelector } from "react-redux"
import { ContactsType, ProfileType } from "../../api/api-profile"
import globalstyle from '../../globalStyles/globalStyle.module.scss'
import { selectorGetProfileErrorMessage, selectorGetProfileSavingSuccess } from "../../redux/profile-selectors"
import { createField, CustomInputComponent, CustomTextareaComponent, GetStringKeys } from "../common/FormControls/FormControls"
import style from './Profile.module.scss'



type PropsType = {
    profile: ProfileType
    setEditMode: (value: boolean) => void
    saveProfile: (profile: ProfileType) => void
}

type ProfileKeysType = GetStringKeys<ProfileType>
type ContactsKeysType = GetStringKeys<ContactsType>



export const ProfileDataForm: React.FC<PropsType> = ({ profile, setEditMode, saveProfile }) => {

    const errorMessage = useSelector(selectorGetProfileErrorMessage)
    const savingSuccess = useSelector(selectorGetProfileSavingSuccess)
    /* const formInitialValues = {
        aboutMe: profile.aboutMe || '',
        //userId: number,
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
    } */

    /* if (savingSuccess) {
        setEditMode(!savingSuccess)
    } */

    return <Formik
        initialValues={profile}
        onSubmit={(values) => {
            console.log(values);
            saveProfile(values)
            setEditMode(false)
        }}
    >
        <Form>
            <button className={globalstyle.btn} type='submit'>save changes</button>
            <button className={globalstyle.btn} type='button' onClick={() => setEditMode(false)}>back</button>

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