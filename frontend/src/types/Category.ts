import { Subcategory } from "./Subcategory";

export type Category = {
    id: number;
    name: string;
    subcategories?: Array<Subcategory>;
};
