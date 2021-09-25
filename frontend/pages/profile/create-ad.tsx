import { NextPageContext } from "next";
import React, { ChangeEvent, useEffect, useState } from "react";
import ImageInput from "../../src/components/ImageInput/ImageInput";
import Input from "../../src/components/Input";
import PageWrapper from "../../src/components/PageWrapper";
import Textarea from "../../src/components/Textarea";
import UserProfileWrapper from "../../src/components/UserProfileWrapper";
import { wrapper } from "../../src/store";
import { AuthStartUp } from "../../src/utils/AuthStartUp";
import styles from "../../styles/pages/UserProfileCreateAdPage.module.scss";
import MapWithDraggableMarker from "../../src/components/MapWithDraggableMarker.tsx";
import { GOOGLE_MAP_DEFAULT_POSITION, GOOGLE_MAP_DEFAULT_ZOOM, GOOGLE_MAP_TOKEN } from "../../config";
import { Coords } from "google-map-react";
import { GoogleMapAPI, GeocodingAPIData } from "../../src/api/GoogleMapAPI";
import Selector from "../../src/components/Selector";
import { PriceTypeEnum } from "../../src/types/PriceTypeEnum";
import Button from "../../src/components/Button";
import { DimensionAPI } from "../../src/api/DimensionAPI";
import { Dimension } from "../../src/types/Dimension";
import { PriceCurrencyAPI } from "../../src/api/PriceCurrencyAPI";
import { PriceCurrency } from "../../src/types/PriceCurrency";
import { CategoryAPI } from "../../src/api/CategoryAPI";
import { Category } from "../../src/types/Category";
import { Subcategory } from "../../src/types/Subcategory";
import FormErrorsBlock from "../../src/components/FormErrorsBlock";
import { useForm } from "react-hook-form";
import { AnnouncementAPI } from "../../src/api/AnnouncementAPI";

function UserProfileCreateAdPage(props: UserProfileCreateAdPageProps) {
    const [changeAddressTimeoutID, setChangeAddressTimeoutID] = useState<NodeJS.Timeout | undefined>();
    const [isAddressChangable, setIsAddressChangable] = useState<boolean>(true);

    const [adAddress, setAdAddress] = useState<string>("");
    const [addressCoordinates, setAddressCoordinates] = useState<Coords>(GOOGLE_MAP_DEFAULT_POSITION);

    const [seletedCategory, setSelectedCategory] = useState<Category>();
    const [seletedSubcategory, setSelectedSeletedSubcategory] = useState<Subcategory>();
    const [seletedPriceType, setSelectedPriceType] = useState<{ text: string; value: PriceTypeEnum }>();
    const [seletedPriceCurrency, setSelectedPriceCurrency] = useState<PriceCurrency>();
    const [seletedDimension, setSelectedDimension] = useState<Dimension>();

    const [adName, setAdName] = useState<string>("");
    const [adDescription, setAdDescription] = useState<string>("");
    const [adImage, setAdImage] = useState<File | undefined>();
    const [adFixedPrice, setAdFixedPrice] = useState<number>(0);
    const [adUpperPrice, setAdUpperPrice] = useState<number>(0);
    const [adLowerPrice, setAdLowerPrice] = useState<number>(0);

    const [formErrors, setFormErrors] = useState<{
        [x: string]: any;
    }>({});

    async function changeAddress(coords: Coords) {
        const result = await GoogleMapAPI.reverseGeocoding(coords);

        if (result.status !== 200) {
            console.log(result);
            return;
        }

        setAdAddress((result.data as GeocodingAPIData).results[0]?.formatted_address || "");
    }

    async function changeAddressPosition(address: string) {
        const result = await GoogleMapAPI.geocoding(address);

        if (result.status !== 200) {
            console.log(result);
            return;
        }

        setAdAddress((result.data as GeocodingAPIData).results[0]?.formatted_address || "");
        setAddressCoordinates((result.data as GeocodingAPIData).results[0]?.geometry.location || addressCoordinates);
    }

    function createChangePositionTimeout(address: string) {
        if (changeAddressTimeoutID) clearInterval(changeAddressTimeoutID);
        setChangeAddressTimeoutID(
            setTimeout(() => {
                setIsAddressChangable(false);
                changeAddressPosition(address);
            }, 2000)
        );
    }

    function setError(field: string, value: string) {
        setFormErrors((prevState) => {
            const newState = { ...prevState };
            newState[field] = { message: value };
            return newState;
        });
    }

    function clearError(field: string) {
        setFormErrors((prevState) => {
            const newState = { ...prevState };
            delete newState[field];
            return newState;
        });
    }

    async function onSubmit() {
        console.log({
            name: adName,
            description: adDescription,
            image: adImage,
            fixedPrice: adFixedPrice,
            upperPrice: adUpperPrice,
            lowerPrice: adLowerPrice,
            address: adAddress,
            category: seletedCategory,
            subcategory: seletedSubcategory,
            priceType: seletedPriceType,
            priceCurrency: seletedPriceCurrency,
            dimension: seletedDimension,
            coords: addressCoordinates,
        });

        if (!adImage) setError("image", "Изображение объявления не выбрано");
        if (!adName) setError("name", "Поле названия не заполнено");
        if (!adDescription) setError("description", "Поле описания не заполнено");
        if (!seletedCategory) setError("category", "Категория не выбрана");
        if (!seletedSubcategory) setError("subcategory", "Подкатегория не выбрана");
        if (!seletedPriceType) setError("priceType", "Тип цены не выбран");

        if (!adFixedPrice && seletedPriceType?.value === PriceTypeEnum.FIXED)
            setError("fixedPrice", "Поле фикисрованной цены не заполнено");
        if (!adLowerPrice && seletedPriceType?.value === PriceTypeEnum.RANGE)
            setError("lowerPrice", "Поле минимальной цены не заполнено");
        if (!adUpperPrice && seletedPriceType?.value === PriceTypeEnum.RANGE)
            setError("upperPrice", "Поле максимальной цены не заполнено");
        if (!seletedPriceCurrency && seletedPriceType?.value !== PriceTypeEnum.NEGOTIATED)
            setError("priceCurrency", "Валюта не выбрана");
        if (!seletedDimension && seletedPriceType?.value !== PriceTypeEnum.NEGOTIATED)
            setError("dimension", "Размерность не выбрана");

        if (!adAddress) setError("address", "Поле адреса не заполнено");
        if (!addressCoordinates) setError("coords", "Координаты не установлены не выбрана");

        if (seletedPriceType?.value === PriceTypeEnum.RANGE && adLowerPrice >= adUpperPrice)
            setError("priceRangeError", "Максимальная цена должна быть больше минимальной");
        if (seletedCategory?.id !== seletedSubcategory?.category)
            setError("subcategory", "Подкатегория не соотвествует категории");

        let isFormIncorrect =
            !adImage ||
            !adName ||
            !adDescription ||
            !seletedCategory ||
            !seletedSubcategory ||
            !seletedPriceType ||
            !adAddress ||
            !addressCoordinates ||
            (!adFixedPrice && seletedPriceType?.value === PriceTypeEnum.FIXED) ||
            (!adLowerPrice && seletedPriceType?.value === PriceTypeEnum.RANGE) ||
            (!adUpperPrice && seletedPriceType?.value === PriceTypeEnum.RANGE) ||
            (!seletedPriceCurrency && seletedPriceType?.value !== PriceTypeEnum.NEGOTIATED) ||
            (!seletedDimension && seletedPriceType?.value !== PriceTypeEnum.NEGOTIATED) ||
            (seletedPriceType?.value === PriceTypeEnum.RANGE && adLowerPrice >= adUpperPrice);

        if (isFormIncorrect) return;

        const data = new FormData();

        data.append("name", adName);
        data.append("description", adDescription);
        data.append("subcategory", String(seletedSubcategory?.id));
        data.append("address", adAddress);
        data.append("address_lat", String(addressCoordinates.lat.toFixed(9)));
        data.append("address_lng", String(addressCoordinates.lng.toFixed(9)));
        data.append("price_type", String(seletedPriceType?.value));
        data.append("image", adImage as File, adImage?.name);

        if (seletedPriceType?.value === PriceTypeEnum.FIXED) {
            data.append("fixed_price", String(adFixedPrice));
        }

        if (seletedPriceType?.value === PriceTypeEnum.RANGE) {
            data.append("upper_price", String(adUpperPrice));
            data.append("lower_price", String(adLowerPrice));
        }

        if (seletedPriceType?.value !== PriceTypeEnum.NEGOTIATED) {
            data.append("currency", String(seletedPriceCurrency?.id));
            data.append("dimension", String(seletedDimension?.id));
        }

        const result = await AnnouncementAPI.createAnnouncements(data);

        if (result.status === 201) {
            location.replace("/profile/");
            return;
        }

        alert("Что-то пошло не так");
        console.log(result);
    }

    return (
        <PageWrapper>
            <UserProfileWrapper>
                <form>
                    <div className={[styles.blockWithImage, styles.page__element].join(" ").trim()}>
                        <ImageInput
                            className={styles.imageField}
                            id={"createAd__adImage"}
                            error={Boolean(formErrors.image)}
                            onChange={(event) => {
                                if (!event.target.files) return;
                                setAdImage(event.target.files[0]);
                                clearError("image");
                            }}
                        />

                        <div className={styles.blockWithImage__inputsBlock}>
                            <Input
                                type="text"
                                placeholder="Название"
                                className={styles.page__element}
                                error={Boolean(formErrors.name)}
                                onChange={(event) => {
                                    setAdName(event.target.value);
                                    clearError("name");
                                }}
                            />

                            <Textarea
                                placeholder="Описание"
                                className={styles.blockWithImage__textarea}
                                error={Boolean(formErrors.description)}
                                onChange={(event) => {
                                    setAdDescription(event.target.value);
                                    clearError("description");
                                }}
                            />
                        </div>
                    </div>

                    <Selector
                        textValueName="name"
                        defaultText="Выберите категорию"
                        className={styles.page__element}
                        options={props.categories}
                        keyValue={"createAd_category_select__"}
                        onSelect={(category) => {
                            setSelectedCategory(category);
                            clearError("category");
                        }}
                        error={Boolean(formErrors.category)}
                    />

                    <Selector
                        textValueName="name"
                        defaultText="Выберите подкатегорию"
                        className={[styles.page__element, !seletedCategory ? styles.selectorHidden : ""]
                            .join(" ")
                            .trim()}
                        hidden={!Boolean(seletedCategory)}
                        options={seletedCategory?.subcategories || []}
                        keyValue={"createAd_subselect_select__"}
                        onSelect={(subcategory) => {
                            setSelectedSeletedSubcategory(subcategory);
                            clearError("subcategory");
                        }}
                        error={Boolean(formErrors.subcategory)}
                    />

                    <div className={[styles.page__element, styles.priceBlock].join(" ").trim()}>
                        <Selector
                            textValueName="text"
                            className={styles.priceBlock__Selector}
                            defaultText="Тип цены"
                            options={[
                                { text: "Фиксированная цена", value: PriceTypeEnum.FIXED },
                                { text: "Диапозон цен", value: PriceTypeEnum.RANGE },
                                { text: "Договорная цена", value: PriceTypeEnum.NEGOTIATED },
                            ]}
                            keyValue={"createAd_priceType_select__"}
                            onSelect={(priceType) => {
                                setSelectedPriceType(priceType);
                                clearError("priceType");
                                clearError("fixedPrice");
                                clearError("lowerPrice");
                                clearError("upperPrice");
                                clearError("priceCurrency");
                                clearError("dimension");
                            }}
                            error={Boolean(formErrors.priceType)}
                        />

                        {seletedPriceType?.value === PriceTypeEnum.FIXED ? (
                            <Input
                                type="text"
                                placeholder="Фикс. цена"
                                error={Boolean(formErrors.fixedPrice)}
                                value={adFixedPrice || ""}
                                onChange={(event) => {
                                    if (!Number.isNaN(Number(event.target.value))) {
                                        setAdFixedPrice(Number(event.target.value));
                                        clearError("fixedPrice");
                                    }
                                }}
                            />
                        ) : null}

                        {seletedPriceType?.value === PriceTypeEnum.RANGE ? (
                            <>
                                <Input
                                    type="text"
                                    placeholder="Мин. цена"
                                    error={Boolean(formErrors.lowerPrice || formErrors.priceRangeError)}
                                    value={adLowerPrice || ""}
                                    onChange={(event) => {
                                        if (!Number.isNaN(Number(event.target.value))) {
                                            setAdLowerPrice(Number(event.target.value));
                                            clearError("lowerPrice");
                                            clearError("priceRangeError");
                                        }
                                    }}
                                />

                                <Input
                                    type="text"
                                    placeholder="Макс. цена"
                                    error={Boolean(formErrors.upperPrice || formErrors.priceRangeError)}
                                    value={adUpperPrice || ""}
                                    onChange={(event) => {
                                        if (!Number.isNaN(Number(event.target.value))) {
                                            setAdUpperPrice(Number(event.target.value));
                                            clearError("upperPrice");
                                            clearError("priceRangeError");
                                        }
                                    }}
                                />
                            </>
                        ) : null}

                        {seletedPriceType?.value !== PriceTypeEnum.NEGOTIATED ? (
                            <>
                                <Selector
                                    textValueName="short_name"
                                    className={styles.priceBlock__Selector}
                                    defaultText="Валюта"
                                    options={props.priceCurrencies}
                                    keyValue={"createAd_priceCurrency_select__"}
                                    onSelect={(priceCurrency) => {
                                        setSelectedPriceCurrency(priceCurrency);
                                        clearError("priceCurrency");
                                    }}
                                    error={Boolean(formErrors.priceCurrency)}
                                />

                                <Selector
                                    textValueName="short_name"
                                    className={styles.priceBlock__Selector}
                                    defaultText="Размерность"
                                    options={props.dimensions}
                                    keyValue={"createAd_dimension_select__"}
                                    onSelect={(dimension) => {
                                        setSelectedDimension(dimension);
                                        clearError("dimension");
                                    }}
                                    error={Boolean(formErrors.dimension)}
                                />
                            </>
                        ) : null}
                    </div>

                    <Input
                        type="text"
                        placeholder="Адрес"
                        className={styles.page__element}
                        value={adAddress}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setAdAddress(event.target.value);
                            createChangePositionTimeout(event.target.value);
                            clearError("address");
                        }}
                        error={Boolean(formErrors.address)}
                    />

                    <MapWithDraggableMarker
                        className={[styles.page__element, styles.map].join(" ").trim()}
                        bootstrapURLKeys={{ key: GOOGLE_MAP_TOKEN }}
                        center={addressCoordinates}
                        zoom={GOOGLE_MAP_DEFAULT_ZOOM}
                        positionChangeDelay={1000}
                        onPositionChange={(position) => {
                            if (!isAddressChangable) {
                                setIsAddressChangable(true);
                                return;
                            }

                            setAddressCoordinates(position);
                            changeAddress(position);
                        }}
                    />

                    <FormErrorsBlock errors={formErrors} className={styles.page__element} />

                    <Button type="button" onClick={onSubmit}>
                        Создать объявление
                    </Button>
                </form>
            </UserProfileWrapper>
        </PageWrapper>
    );
}

UserProfileCreateAdPage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
    const dimensionsResult = await DimensionAPI.getDimensions();
    const priceCurrenciesResult = await PriceCurrencyAPI.getPriceCurrencies();
    const categoriesResult = await CategoryAPI.getCategories({ with_subcategories: true });

    return {
        dimensions: dimensionsResult.status === 200 ? dimensionsResult.data : [],
        priceCurrencies: priceCurrenciesResult.status === 200 ? priceCurrenciesResult.data : [],
        categories: categoriesResult.status === 200 ? categoriesResult.data : [],
    } as UserProfileCreateAdPageProps;
});

type UserProfileCreateAdPageProps = {
    dimensions: Array<Dimension>;
    priceCurrencies: Array<PriceCurrency>;
    categories: Array<Category>;
};

export default UserProfileCreateAdPage;
