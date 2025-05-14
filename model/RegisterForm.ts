import { OptionItem } from "./OptionItem";

export interface RegisterForm {
    email: string;
    name: string;
    surname: string;
    password: string;
    confirmPassword: string;
    birthDate?: string;
    height?: number;
    position?: OptionItem;
}