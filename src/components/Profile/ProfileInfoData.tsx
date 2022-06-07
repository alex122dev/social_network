import { ContactsType, ProfileType } from "../../api/api-profile"
import globalstyle from '../../globalStyles/globalStyle.module.scss'
import style from './Profile.module.scss'

type PropsType = {
    profile: ProfileType
    setEditMode: (value: boolean) => void
}

export const ProfileInfoData: React.FC<PropsType> = ({ profile, setEditMode }) => {
    return <div>
        <button className={globalstyle.btn} onClick={() => setEditMode(true)}>edit profile</button>
        <div className={style.infoItem}><b>Full name</b>: {profile.fullName}</div>
        <div className={style.infoItem}><b>Looking for a job</b>: {profile.lookingForAJob ? 'Yes' : 'No'}</div>
        <div className={style.infoItem}><b>My skills</b>: {profile.lookingForAJobDescription}</div>
        <div className={style.infoItem}><b>About me</b>: {profile.aboutMe}</div>
        <div className={style.infoItem}><b>Contacts</b>: <ul className={style.contactsList}>{Object.keys(profile.contacts).map(k => {
            return <li key={k} className={style.contactsItem}><b>{k}</b>: {profile.contacts[k as keyof ContactsType]}</li>
        })}</ul></div>
    </div>
}
