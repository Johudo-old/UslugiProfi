import { LogoProps } from "./LogoProps";
import whiteLogo from "../../../public/images/whiteLogo.png";
import defaultLogo from "../../../public/images/defaultLogo.png";

function Logo(props: LogoProps) {
    let logoImage = defaultLogo;
    if (props.type === "white") logoImage = whiteLogo;
    return <img src={logoImage} className={props.className} />;
}

export default Logo as React.FunctionComponent<LogoProps>;
