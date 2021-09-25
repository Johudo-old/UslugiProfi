export enum UserTypeEnum {
    IP = "IP",
    OOO = "OOO",
    PF = "PF",
}

export const UserTypeArray = [
    { type: UserTypeEnum.IP, name: "ИП" },
    { type: UserTypeEnum.OOO, name: "ООО" },
    { type: UserTypeEnum.PF, name: "Физ. лицо" },
];
