import md5 from "md5";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AuthAPI } from "../../api/AuthAPI";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import FormErrorsBlock from "../../components/FormErrorsBlock";
import Input from "../../components/Input";
import { EMAIL_REGEXP } from "../../constants/regexps";
import { PopupActionCreator } from "../../store/actionCreators/PopupActionCreator";
import { PopupTypeEnum } from "../Popup/PopupTypeEnum";
import styles from "./RegisterPopup.module.scss";

type RegisterPopupFormData = {
    email: string;
    password: string;
    rePassword: string;
    agree: boolean;
    age: boolean;
};

const defaultRegisterPopupFormData: RegisterPopupFormData = {
    email: "",
    password: "",
    rePassword: "",
    agree: false,
    age: false,
};

export default function RegisterPopup() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState, watch, setError, clearErrors } = useForm<RegisterPopupFormData>({
        defaultValues: defaultRegisterPopupFormData,
        shouldFocusError: false,
    });

    const passwordState = watch("password");

    async function submitForm(data: RegisterPopupFormData) {
        const result = await AuthAPI.register({
            email: data.email,
            password: md5(data.password),
        });

        if (result.status === 400 && result.data.errors?.email) {
            setError("email", {
                type: "used",
                message: "Данный Email уже используется!",
            });
            console.log(result);
            return;
        }

        if (result.status !== 201) {
            alert("Неизвестная ошибка");
            console.log(result);
            return;
        }

        alert("Успешная регистрация");
        dispatch(PopupActionCreator.openPopup(PopupTypeEnum.login));
    }

    return (
        <>
            <h3>Регистрация</h3>

            <form className={styles.popupElement} onSubmit={handleSubmit(submitForm)}>
                <Input
                    type="text"
                    placeholder="Ваш e-mail"
                    defaultValue={defaultRegisterPopupFormData.email}
                    className={styles.popupElement}
                    error={Boolean(formState.errors.email)}
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Поле email не может быть пустым!",
                        },
                        pattern: { value: EMAIL_REGEXP, message: "Поле email не корректно! Пример: test@test.com" },
                    })}
                />

                <Input
                    type="password"
                    placeholder="Введите пароль"
                    defaultValue={defaultRegisterPopupFormData.password}
                    className={styles.popupElement}
                    error={Boolean(formState.errors.password)}
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Поле пароль не может быть пустым!!",
                        },
                        minLength: {
                            value: 8,
                            message: "Пароль должен содержать минимум 8 символов",
                        },
                    })}
                />

                <Input
                    type="password"
                    placeholder="Повторите пароль"
                    defaultValue={defaultRegisterPopupFormData.rePassword}
                    className={styles.popupElement}
                    error={Boolean(formState.errors.rePassword)}
                    {...register("rePassword", {
                        validate: (value) => value === passwordState || "Пароли не совпадают!",
                    })}
                />

                <Checkbox
                    id="registerPopup__agree__checkbox"
                    label={
                        <>
                            Я согласен с условиям{" "}
                            <a href="#" className={styles.agreeLink}>
                                Пользовательского соглашения
                            </a>
                        </>
                    }
                    defaultChecked={defaultRegisterPopupFormData.agree}
                    wrapperClassName={[styles.checkboxWrapper, styles.popupElement].join(" ")}
                    {...register("agree", {
                        required: { value: true, message: "Пользовательское соглашение не принято!" },
                    })}
                />

                <Checkbox
                    id="registerPopup__age__checkbox"
                    label={"Мне больше 18 лет"}
                    defaultChecked={defaultRegisterPopupFormData.age}
                    wrapperClassName={[styles.checkboxWrapper, styles.popupElement].join(" ")}
                    {...register("age", {
                        required: { value: true, message: "Вам должно быть больше 18 лет!" },
                    })}
                />

                <FormErrorsBlock errors={formState.errors} className={styles.popupElement} />

                <Button type="submit">Зарегистрироватся</Button>
            </form>

            <div className={styles.popupButtons}>
                <button onClick={() => dispatch(PopupActionCreator.openPopup(PopupTypeEnum.login))}>
                    Уже есть аккаунт
                </button>
            </div>
        </>
    );
}
