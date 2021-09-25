export type User = {
    address: string;
    avatar: string | null;
    company: string;
    country: string;
    create_date: string;
    email: string;
    id: number;
    inn: string;
    is_email_confirmed: boolean;
    name: string;
    ogrn: string;
    phone: string;
    surname: string;
    type: string;
    announcements_count?: number;
};
