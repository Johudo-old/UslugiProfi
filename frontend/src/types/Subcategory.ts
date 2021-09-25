import { Category } from "./Category";

export type Subcategory = {
    id: number;
    name: string;
    category: number | Category;
};
