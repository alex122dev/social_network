import { Field, Form, Formik } from "formik"
import React from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import globalStyle from '../../globalStyles/globalStyle.module.scss'
import { DispatchThunkType } from "../../redux/store"
import { FilterUsersType, getUsers } from "../../redux/users-reducer"
import { selectorGetUsersFilter } from "../../redux/users-selector"
import style from './Users.module.scss'


type PropsType = {
    onFilterChanged: (filter: FilterUsersType) => void
}

export const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {

    const filter = useSelector(selectorGetUsersFilter)
    //console.log('render');

    return <Formik
        enableReinitialize={true}
        initialValues={filter}
        onSubmit={(values, { setSubmitting }) => {
            console.log('formData filter: ', values);
            onFilterChanged(values)
            setSubmitting(false)
        }}>
        {({ isSubmitting }) => (
            <Form className={style.searchForm}>
                <Field name='term' component='input' />
                <Field name='friend' as="select">
                    <option value="null">All</option>
                    <option value="true">followed</option>
                    <option value="false">Unfollowed</option>
                </Field>
                <button type='submit' className={globalStyle.btn} disabled={isSubmitting}>Find</button>
            </Form>
        )}
    </Formik>
})