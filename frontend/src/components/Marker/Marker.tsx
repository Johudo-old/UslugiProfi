// import styles from "./Input.module.scss";
import React from "react";
import { MarkerProps } from "./MarkerProps";
import styles from "./Marker.module.scss";

function Marker(props: MarkerProps) {
    const { className, ...otherProps } = props;
    return <div className={[styles.marker, className].join(" ").trim()}></div>;
}

export default Marker;
