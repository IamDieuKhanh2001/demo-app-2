'use client'
import React from 'react'
import styles from './PasswordFormEdit.module.scss'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

interface FormChangePasswordValues {
    currentPassword: string;
    newPassword: string;
    retypePassword: string;
}
const PasswordFormEdit = () => {

    const initialChangePasswordValues: FormChangePasswordValues = {
        currentPassword: '',
        newPassword: '',
        retypePassword: '',
    };
    const getCharacterValidationError = (str: string) => {
        return `Your password must have at least 1 ${str} character`;
    };
    const validationChangePasswordSchema = Yup.object({
        currentPassword: Yup.string()
            .required("current password not be empty"),
        newPassword: Yup.string()
            .required("new password not be empty")
            // .matches(/[0-9]/, getCharacterValidationError("digit"))
            // .matches(/[a-z]/, getCharacterValidationError("lowercase"))
            // .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
            .min(5, "Password must have at least 5 characters"),
        retypePassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Passwords does not match")
            .required("Retype password not be empty"),
    });

    const handleChangePasswordSubmit = async (values: FormChangePasswordValues) => {
        try {
            console.log(values)
            toast.success("Sửa mật khẩu thành công ")
        }
        catch (e) {
            toast.error("Something when wrong, please try again")
        }
    };

    return (
        <>
            <Formik
                initialValues={initialChangePasswordValues}
                validationSchema={validationChangePasswordSchema}
                onSubmit={handleChangePasswordSubmit}
            >
                {({ isValid ,setFieldValue, handleChange, errors, touched, isSubmitting, values }) => (
                    <Form>
                        <div className={styles.inputBox}>
                            <label htmlFor='currentPass'>Mật khẩu hiện tại</label>
                            <div className={styles.inputItem}>
                                <div className={styles.inputGroup}>
                                    <Field
                                        type="password"
                                        className={styles.textBox}
                                        placeholder='Nhập MK hiện tại'
                                        id='currentPassword'
                                        name='currentPassword'
                                    />
                                    {errors.currentPassword && touched.currentPassword && (
                                        <span className={styles.textBoxAlert}></span>
                                    )}
                                </div>
                                {errors.currentPassword && touched.currentPassword && (
                                    <div className={styles.inputAlert}>
                                        {errors.currentPassword}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.inputBox}>
                            <label htmlFor='newPass'>Mật khẩu mới</label>
                            <div className={styles.inputItem}>
                                <div className={styles.inputGroup}>
                                    <Field
                                        type="password"
                                        className={styles.textBox}
                                        placeholder='Nhập MK mới'
                                        id='newPassword'
                                        name="newPassword"
                                    />
                                    {errors.newPassword && touched.newPassword && (
                                        <span className={styles.textBoxAlert}></span>
                                    )}
                                </div>
                                {errors.newPassword && touched.newPassword && (
                                    <div className={styles.inputAlert}>
                                        {errors.newPassword}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.inputBox}>
                            <label htmlFor='newRetypePass'>Nhập lại mật khẩu mới</label>
                            <div className={styles.inputItem}>
                                <div className={styles.inputGroup}>
                                    <Field
                                        type="password"
                                        className={styles.textBox}
                                        placeholder='Nhập lại MK mới'
                                        id='retypePassword'
                                        name="retypePassword"
                                    />
                                    {errors.retypePassword && touched.retypePassword && (
                                        <span className={styles.textBoxAlert}></span>
                                    )}
                                </div>
                                {errors.retypePassword && touched.retypePassword && (
                                    <div className={styles.inputAlert}>
                                        {errors.retypePassword}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.btnGroup}>
                            <button
                                type="submit"
                                className={styles.btnSave}
                            >
                                Thay đổi mật khẩu
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default PasswordFormEdit
