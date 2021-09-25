export interface SelectorProps {
    error?: boolean;
    className?: string;
    defaultText?: string;
    keyValue: string;
    options: Array<any>;
    hidden?: boolean;
    textValueName: string;
    onSelect?: (item: any) => void;
    defaultValue?: any;
}
