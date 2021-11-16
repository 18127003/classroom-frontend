import { RedirectRequest, RedirectSuccess } from "@/@types/common.action";
import { AssignedClassroom } from "@/@types/model";
import { commonAction } from "@/constants/actions";

export const redirectRequest = (payload: AssignedClassroom): RedirectRequest => ({
    type: commonAction.REDIRECT_REQUEST,
    payload: payload
});

export const redirectSuccess = (): RedirectSuccess => ({
    type: commonAction.REDIRECT_SUCCESS
});