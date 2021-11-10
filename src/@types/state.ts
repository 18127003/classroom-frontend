import { DefaultRootState } from "react-redux";
import { AssignedClassroom } from "./model";

export interface ClassroomsState {
    loading: boolean,
    classes?: AssignedClassroom[],
    error?: string
}