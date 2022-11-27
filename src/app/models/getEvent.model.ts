import { GetFiles } from "./getFiles.model";

export interface getEventModel {
    title: string;
    description: string;
    creatorRegistration: string;
    duration: string;
    techs: Array<string>;
    filesId: string;
    eventNumber: string;
    status: string;
    thumbnail?: GetFiles;
}