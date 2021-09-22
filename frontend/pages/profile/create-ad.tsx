import { NextPageContext } from "next";
import React, { ChangeEvent, useState } from "react";
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

function UserProfileCreateAdPage() {
    const [changeAddressTimeoutID, setChangeAddressTimeoutID] = useState<NodeJS.Timeout | undefined>();
    const [addressCoordinates, setAddressCoordinates] = useState<Coords>(GOOGLE_MAP_DEFAULT_POSITION);
    const [isAddressChangable, setIsAddressChangable] = useState<boolean>(true);
    const [address, setAddress] = useState<string>("");

    const [seletedCategory, setSelectedCategory] = useState<any>();
    const [seletedSubategory, setSelectedSeletedSubategory] = useState<any>();
    const [seletedPriceType, setSelectedPriceType] = useState<PriceTypeEnum>();
    const [seletedPriceCurrency, setSelectedPriceCurrency] = useState<any>();
    const [seletedDimension, setSelectedDimension] = useState<any>();

    async function changeAddress(coords: Coords) {
        const result = await GoogleMapAPI.reverseGeocoding(coords);

        if (result.status !== 200) {
            console.log(result);
            return;
        }

        setAddress((result.data as GeocodingAPIData).results[0]?.formatted_address || "");
    }

    async function changeAddressPosition(address: string) {
        const result = await GoogleMapAPI.geocoding(address);

        if (result.status !== 200) {
            console.log(result);
            return;
        }
        setAddress((result.data as GeocodingAPIData).results[0]?.formatted_address || "");
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

    return (
        <PageWrapper>
            <UserProfileWrapper>
                <form>
                    <div className={[styles.blockWithImage, styles.page__element].join(" ").trim()}>
                        <ImageInput className={styles.imageField} id={"createAd__adImage"} />

                        <div className={styles.blockWithImage__inputsBlock}>
                            <Input type="text" placeholder="Название" className={styles.page__element} />
                            <Textarea placeholder="Описание" className={styles.blockWithImage__textarea} />
                        </div>
                    </div>

                    <Selector
                        defaultText="Выберите категорию"
                        className={styles.page__element}
                        options={[{ text: "Информационные технологии" }, { text: "Ремонт" }]}
                        keyValue={"createAd_category_select__"}
                        onSelect={(category) => setSelectedCategory(category)}
                    />

                    <Selector
                        defaultText="Выберите подкатегорию"
                        className={[styles.page__element, !seletedCategory ? styles.selectorHidden : ""]
                            .join(" ")
                            .trim()}
                        hidden={!Boolean(seletedCategory)}
                        options={[{ text: "Информационные технологии" }, { text: "Ремонт" }]}
                        keyValue={"createAd_category_subselect__"}
                    />

                    <div className={[styles.page__element, styles.priceBlock].join(" ").trim()}>
                        <Selector
                            className={styles.priceBlock__Selector}
                            defaultText="Тип цены"
                            options={[
                                { text: "Фиксированная цена", value: PriceTypeEnum.FIXED },
                                { text: "Диапозон цен", value: PriceTypeEnum.RANGE },
                                { text: "Договорная цена", value: PriceTypeEnum.NEGOTIATED },
                            ]}
                            keyValue={"createAd_category_subselect__"}
                            onSelect={(priceType) => setSelectedPriceType(priceType.value)}
                        />

                        {seletedPriceType === PriceTypeEnum.FIXED ? (
                            <Input type="text" placeholder="Фикс. цена" />
                        ) : null}

                        {seletedPriceType === PriceTypeEnum.RANGE ? (
                            <>
                                <Input type="text" placeholder="Мин. цена" />
                                <Input type="text" placeholder="Макс. цена" />
                            </>
                        ) : null}

                        {seletedPriceType !== PriceTypeEnum.NEGOTIATED ? (
                            <>
                                <Selector
                                    className={styles.priceBlock__Selector}
                                    defaultText="Валюта"
                                    options={[
                                        { text: "руб.", value: 1 },
                                        { text: "дин.", value: 2 },
                                        { text: "доллар", value: 3 },
                                    ]}
                                    keyValue={"createAd_category_subselect__"}
                                    onSelect={(priceCurrency) => setSelectedPriceCurrency(priceCurrency.value)}
                                />

                                <Selector
                                    className={styles.priceBlock__Selector}
                                    defaultText="Размерность"
                                    options={[
                                        { text: "Фиксированная цена", value: PriceTypeEnum.FIXED },
                                        { text: "Договорная цена", value: PriceTypeEnum.NEGOTIATED },
                                        { text: "Диапозон цен", value: PriceTypeEnum.RANGE },
                                    ]}
                                    keyValue={"createAd_category_subselect__"}
                                    onSelect={(dimension) => setSelectedDimension(dimension)}
                                />
                            </>
                        ) : null}
                    </div>

                    <Input
                        type="text"
                        placeholder="Адрес"
                        className={styles.page__element}
                        value={address}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setAddress(event.target.value);
                            createChangePositionTimeout(event.target.value);
                        }}
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

                    <Button>Создать объявление</Button>
                </form>
            </UserProfileWrapper>
        </PageWrapper>
    );
}

UserProfileCreateAdPage.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    await AuthStartUp(store, context);
});

export default UserProfileCreateAdPage;
