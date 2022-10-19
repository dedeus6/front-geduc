export interface Usuario {
    registration: string;
    name?: string;
    email?: string;
    password?: string;
    techs?: Array<Tech[]>
}

export interface Tech {
    name: string;
}