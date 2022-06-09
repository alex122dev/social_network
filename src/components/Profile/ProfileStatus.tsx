import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getProfileStatus, saveProfileStatus } from "../../redux/profile-reducer"
import { selectorGetProfileStatus } from "../../redux/profile-selectors"
import { DispatchThunkType } from "../../redux/store"


type PropsType = {
    userId: number
    isOwner: boolean
}

export const ProfileStatus: React.FC<PropsType> = ({ userId, isOwner }) => {

    const dispatch: DispatchThunkType = useDispatch()
    const status = useSelector(selectorGetProfileStatus)

    const [editMode, setEditMode] = useState(false)
    const [localStatus, setLocalStatus] = useState(status)

    useEffect(() => {
        dispatch(getProfileStatus(userId))
    }, [userId])

    useEffect(() => {
        setLocalStatus(status || '')
    }, [status])

    const saveChanges = () => {
        setEditMode(false)
        if (status !== localStatus) {
            dispatch(saveProfileStatus(localStatus))
        }
    }

    return <div>
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Status: </span>
        {isOwner
            ? !editMode
                ? <span onDoubleClick={() => setEditMode(true)}>{status || 'No Status'}</span>
                : <input type='text' autoFocus onChange={(e) => setLocalStatus(e.currentTarget.value)}
                    value={localStatus} onBlur={saveChanges} />
            : <span>{status || 'No Status'}</span>
        }
    </div>
}