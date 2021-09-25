import { NextPageContext } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { UserAPI } from "../../src/api/UserAPI";
import Button from "../../src/components/Button";
import FormErrorsBlock from "../../src/components/FormErrorsBlock";
import ImageInput from "../../src/components/ImageInput";
import Input from "../../src/components/Input";
import PageWrapper from "../../src/components/PageWrapper";
import Selector from "../../src/components/Selector";
import UserProfileWrapper from "../../src/components/UserProfileWrapper";
import { PHONE_COUNTRY_CODE, PHONE_EXAMPLE, PHONE_REGEXP } from "../../src/constants/phoneConstants";
import { IState, wrapper } from "../../src/store";
import { UserTypeArray, UserTypeEnum } from "../../src/types/UserTypeEnum";
import { AuthStartUp } from "../../src/utils/AuthStartUp";
import styles from "../../styles/pages/UserProfileEditPage.module.scss";

function UserProfileEditPage() {
    const userInfo = useSelector((state: IState) => state.user.userInfo);

    const [innValue, setInnValue] = useState<string>(userInfo?.inn || "");
    const [phoneValue, setPhoneValue] = useState<string>(userInfo?.phone || "");
    const [avatarValue, setAvatarValue] = useState<File | undefined>();
    const [userTypeValue, setUserTypeValue] = useState<{ type: UserTypeEnum; name: string } | undefined>(
        UserTypeArray.find((item) => item.type === userInfo?.type)
    );
    const { register, handleSubmit, formState, setError, clearErrors } = useForm<EditProfileFormData>({
        shouldFocusError: false,
    });

    const innInput = register("inn");
    const phoneInput = register("phone");

    async function onSubmit(data: EditProfileFormData) {
        if (phoneValue && !PHONE_REGEXP.test(phoneValue)) {
            setError("phone", { message: "Поле номера телефона неправильного формата. Пример: " + PHONE_EXAMPLE });
            return;
        }

        const formData = new FormData();

        if (avatarValue) formData.append("avatar", avatarValue, avatarValue.name);
        if (userTypeValue) formData.append("type", userTypeValue.type);
        if (data.name) formData.append("name", data.name);
        if (data.surname) formData.append("surname", data.surname);
        if (data.company) formData.append("company", data.company);
        if (innValue) formData.append("inn", innValue);
        if (phoneValue) formData.append("phone", phoneValue);
        if (data.address) formData.append("address", data.address);

        const result = await UserAPI.updateCurrenUserInfo(formData);

        if (result.status === 200) {
            location.reload();
            return;
        }

        console.log(result);

        if (Array.isArray(result.data.phone) && result.data.phone[0])
            setError("phone", { message: result.data.phone[0] });
    }

    return (
        <PageWrapper>
            <UserProfileWrapper>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ImageInput
                        id={"editProfile_userImage__"}
                        className={styles.page__element}
                        defaultImageSrc={userInfo?.avatar || ""}
                        onChange={(event) => setAvatarValue(event.target.files ? event.target.files[0] : undefined)}
                    />

                    <Selector
                        keyValue={"editProfile_userTypeSelector__"}
                        options={UserTypeArray}
                        defaultText={"defaultText"}
                        textValueName={"name"}
                        className={styles.page__element}
                        defaultValue={userTypeValue}
                        onSelect={(item) => setUserTypeValue(item)}
                    />

                    <Input
                        placeholder="Имя"
                        defaultValue={userInfo?.name}
                        className={styles.page__element}
                        {...register("name")}
                    />

                    <Input
                        placeholder="Фамилия"
                        defaultValue={userInfo?.surname}
                        className={styles.page__element}
                        {...register("surname")}
                    />

                    <Input
                        placeholder="Название компании"
                        defaultValue={userInfo?.company}
                        className={styles.page__element}
                        {...register("company")}
                    />

                    <Input
                        placeholder="ИНН"
                        value={innValue}
                        className={styles.page__element}
                        onChange={(event) => {
                            if (Number.isNaN(Number(event.target.value))) return;

                            clearErrors("inn");
                            setInnValue(event.target.value);
                        }}
                        onBlur={innInput.onBlur}
                        ref={innInput.ref}
                    />

                    <Input
                        placeholder="Номер телефона"
                        value={phoneValue}
                        className={styles.page__element}
                        onChange={(event) => {
                            if (event.target.value.length > 12 || Number.isNaN(Number(event.target.value))) return;
                            clearErrors("phone");

                            if (event.target.value.length === 1 && !Number.isNaN(Number(event.target.value)))
                                setPhoneValue(
                                    event.target.value === PHONE_COUNTRY_CODE[0]
                                        ? "+" + PHONE_COUNTRY_CODE[0]
                                        : "+" + PHONE_COUNTRY_CODE[0] + event.target.value
                                );
                            else setPhoneValue(event.target.value);
                        }}
                        onBlur={phoneInput.onBlur}
                        ref={phoneInput.ref}
                    />

                    <Input
                        placeholder="Адрес"
                        defaultValue={userInfo?.address}
                        className={styles.page__element}
                        {...register("address")}
                    />

                    <FormErrorsBlock errors={formState.errors} className={styles.page__element} />

                    <Button>Сохранить</Button>
                </form>

                {/* <Input placeholder="Текущий пароль" />
                <Input placeholder="Новый пароль" />
                <Input placeholder="Повторите новый пароль" /> */}
            </UserProfileWrapper>
        </PageWrapper>
    );
}

UserProfileEditPage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
});

type EditProfileFormData = {
    image: File | undefined;
    name: string;
    surname: string;
    company: string;
    inn: string;
    phone: string;
    address: string;
};

export default UserProfileEditPage;
