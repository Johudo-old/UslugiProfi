import React, { useEffect, useRef, useState } from "react";
import GoogleMapReact, { Coords } from "google-map-react";
import MapWithDraggableMarkerProps from "./MapWithDraggableMarkerProps";
import Marker from "../Marker";
import styles from "./MapWithDraggableMarker.module.scss";
import googleMapReact from "google-map-react";

function MapWithDraggableMarker(props: MapWithDraggableMarkerProps) {
    const [changePositionTimeoutID, setChangePositionTimeoutID] = useState<NodeJS.Timeout | undefined>();
    const [markerPosistion, setMarkersPosistion] = useState<Coords>(
        props.defaultCenter || {
            lat: 0,
            lng: 0,
        }
    );

    const { onDrag, onChange, onPositionChange, positionChangeDelay, className, ...otherProps } = props;

    function createChangePositionTimeout(position: Coords) {
        if (!onPositionChange) return;
        if (!positionChangeDelay) onPositionChange(position);
        else {
            if (changePositionTimeoutID) clearInterval(changePositionTimeoutID);
            setChangePositionTimeoutID(setTimeout(() => onPositionChange(position), positionChangeDelay));
        }
    }

    return (
        <div className={[styles.map, className || ""].join(" ").trim()}>
            <GoogleMapReact
                onChange={(event) => {
                    const newPosition = {
                        lat: event.center.lat,
                        lng: event.center.lng,
                    };

                    setMarkersPosistion(newPosition);
                    createChangePositionTimeout(newPosition);
                    if (onChange) onChange(event);
                }}
                onDrag={(map) => {
                    const newPosition = {
                        lat: map.center.lat(),
                        lng: map.center.lng(),
                    };

                    setMarkersPosistion(newPosition);
                    createChangePositionTimeout(newPosition);
                    if (onDrag) onDrag(map);
                }}
                {...otherProps}
            >
                <Marker lat={markerPosistion.lat} lng={markerPosistion.lng} />
            </GoogleMapReact>
        </div>
    );
}

export default MapWithDraggableMarker;
