import { ChildComponentProps } from "google-map-react";

// React.AllHTMLAttributes<HTMLDivElement>
export interface MarkerProps extends ChildComponentProps {
    className?: string | undefined;
}
