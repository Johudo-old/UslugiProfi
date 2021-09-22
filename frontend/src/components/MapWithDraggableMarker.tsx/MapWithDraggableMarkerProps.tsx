import { Coords, Props as MapProps } from "google-map-react";
import { ReactNode } from "react";

export default interface MapWithDraggableMarkerProps extends MapProps {
    className?: string;
    positionChangeDelay?: number;
    onPositionChange?: (position: Coords) => void;
}
