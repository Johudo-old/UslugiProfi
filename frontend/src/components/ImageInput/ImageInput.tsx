// import styles from "./Input.module.scss";
import React, { ChangeEvent, useState } from "react";
import { ImageInputProps } from "./ImageInputProps";
import styles from "./ImageInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function ImageInput(
    { className, error, type, onChange, ...otherProps }: ImageInputProps,
    ref: React.ForwardedRef<any>
) {
    const [imageSrc, setImageSrc] = useState<string>("");

    return (
        <label
            htmlFor={otherProps.id}
            className={[styles.imageWrapper, error ? styles.errorImageWrapper : "", className].join(" ").trim()}
            style={{ backgroundImage: imageSrc ? `url(${imageSrc})` : "" }}
        >
            {!imageSrc ? <FontAwesomeIcon icon={faCamera} className={styles.cameraIcon} /> : <></>}
            <input
                type="file"
                ref={ref}
                className={styles.imageInput}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if ((event.target.files as FileList)[0])
                        setImageSrc(URL.createObjectURL((event.target.files as FileList)[0]));
                    else setImageSrc("");

                    if (onChange) onChange(event);
                }}
                {...otherProps}
            />
        </label>
    );
}

export default React.forwardRef(ImageInput);
