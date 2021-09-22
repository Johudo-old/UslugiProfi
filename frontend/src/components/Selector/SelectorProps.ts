export interface SelectorProps {
    error?: boolean;
    className?: string;
    defaultText?: string;
    keyValue: string;
    options: Array<any>;
    hidden?: boolean;
    onSelect?: (item: any) => void;
}
