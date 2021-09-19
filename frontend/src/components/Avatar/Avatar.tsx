import { AvatarProps } from "./AvatarProps";
import styles from "./Avatar.module.scss";

export default function Avatar(props: AvatarProps) {
    let avatarSize = styles.avatar__mediumSize;

    if (props.size == "large") avatarSize = styles.avatar__largeSize;

    return (
        <div className={[styles.avatarWrapper, avatarSize, props.className].join(" ").trim()}>
            {props.src ? (
                <img src={props.src} alt={props.alt} className={styles.avatar} />
            ) : (
                <span>{props.alt[0].toUpperCase() || "U"}</span>
            )}
        </div>
    );
}
