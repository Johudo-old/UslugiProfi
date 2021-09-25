import { SelectorProps } from "./SelectorProps";
import styles from "./Selector.module.scss";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Selector(props: SelectorProps) {
    const [isOpened, setIsOpened] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(props.defaultValue || undefined);

    return (
        <div className={[props.className, props.hidden ? styles.hiddenSeletor : ""].join(" ").trim()}>
            <div
                className={[styles.select, props.error ? styles.errorSelect : "", !isOpened ? styles.selectClosed : ""]
                    .join(" ")
                    .trim()}
                onClick={(event) => {
                    setIsOpened(!isOpened);
                }}
            >
                <span>
                    {selectedItem && props.textValueName in selectedItem
                        ? selectedItem[props.textValueName]
                        : props.defaultText || "Unknown name"}
                </span>
                <FontAwesomeIcon
                    icon={faAngleDown}
                    className={[styles.arrowIcon, !isOpened ? styles.arrowIconClosed : ""].join(" ").trim()}
                />
            </div>

            <ul className={[styles.optionsBlock, !isOpened ? styles.optionsBlockClosed : ""].join(" ").trim()}>
                {props.options.map((optionItem, index) => (
                    <li
                        className={styles.option}
                        key={props.keyValue + index}
                        onClick={(event) => {
                            if (props.onSelect) props.onSelect(optionItem);
                            setIsOpened(false);
                            setSelectedItem(optionItem);
                        }}
                    >
                        {props.textValueName in optionItem ? optionItem[props.textValueName] : "Unknown name"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Selector;
