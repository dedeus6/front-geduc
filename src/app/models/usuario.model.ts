import { Tech } from "./tech.model";

export interface Usuario {
    registration: string;
    name?: string;
    email?: string;
    password?: string;
    techs?: Array<Tech[]>
}