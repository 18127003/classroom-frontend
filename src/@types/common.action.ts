import { commonAction } from "@/constants/actions";
import { AssignedClassroom } from "./model";

export interface RedirectRequest{
    type: typeof commonAction.REDIRECT_REQUEST,
    payload: AssignedClassroom
}

export interface RedirectSuccess{
    type: typeof commonAction.REDIRECT_SUCCESS
}