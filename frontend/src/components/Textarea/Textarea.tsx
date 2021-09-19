import { TextareaProps } from "./TextareaProps";
import styles from "./Textarea.module.scss";

export default function Textarea(props: TextareaProps) {
    const { className, ...otherProps } = props;

    return <textarea className={[styles.textarea, className].join(" ").trim()} {...otherProps} />;
}
