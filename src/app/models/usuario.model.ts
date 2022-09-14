export interface Usuario {
    registration: String;
    name?: String;
    email?: String;
    password: String;
    techs?: Array<Tech[]>
}

export interface Tech {
    name: string;
}