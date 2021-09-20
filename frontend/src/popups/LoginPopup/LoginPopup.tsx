import md5 from "md5";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AuthAPI, AuthLoginAPIData } from "../../api/AuthAPI";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import FormErrorsBlock from "../../components/FormErrorsBlock";
import Input from "../../components/Input";
import { EMAIL_REGEXP } from "../../constants/regexps";
import { PopupActionCreator } from "../../store/actionCreators/PopupActionCreator";
import { UserActionCreator } from "../../store/actionCreators/UserActionCreator";
import { PopupTypeEnum } from "../Popup/PopupTypeEnum";
import styles from "./LoginPopup.module.scss";

type LoginPopupFormData = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const defaultLoginPopupFormData: LoginPopupFormData = {
    email: "",
    password: "",
    rememberMe: false,
};

export default function LoginPopup() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm<LoginPopupFormData>({
        defaultValues: defaultLoginPopupFormData,
        shouldFocusError: false,
    });

    async function submitForm(data: LoginPopupFormData) {
        const result = await AuthAPI.login({ email: data.email, password: md5(data.password) });

        if (result.status === 401 && result.data.error) {
            alert("Пользователя с такими данными не существует!");
            console.log(result);
            return;
        }

        if (result.status !== 200) {
            alert("Неизвестная ошибка!");
            console.log(result);
            return;
        }

        location.reload();
    }

    return (
        <>
            <h3>Войти</h3>

            <form className={styles.popupElement} onSubmit={handleSubmit(submitForm)}>
                <Input
                    type="text"
                    placeholder="Ваш e-mail"
                    defaultValue={defaultLoginPopupFormData.email}
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
                    defaultValue={defaultLoginPopupFormData.password}
                    className={styles.popupElement}
                    error={Boolean(formState.errors.password)}
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Поле пароль не может быть пустым!!",
                        },
                    })}
                />

                <Checkbox
                    id="loginPopup__rememberMe__checkbox"
                    label="Запомнить меня"
                    defaultChecked={defaultLoginPopupFormData.rememberMe}
                    wrapperClassName={[styles.checkboxWrapper, styles.popupElement].join(" ")}
                    {...register("rememberMe")}
                />

                <FormErrorsBlock className={styles.popupElement} errors={formState.errors} />

                <Button type="submit">Войти</Button>
            </form>

            <div className={styles.popupButtons}>
                <button onClick={() => {}}>Забыли пароль?</button>
                <button onClick={() => dispatch(PopupActionCreator.openPopup(PopupTypeEnum.register))}>
                    Регистрация
                </button>
            </div>
        </>
    );
}
