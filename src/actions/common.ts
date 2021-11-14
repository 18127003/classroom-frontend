import { RedirectRequest, RedirectSuccess } from "@/@types/common.action";
import { commonAction } from "@/constants/actions";

export const redirectRequest = (): RedirectRequest => ({
    type: commonAction.REDIRECT_REQUEST
});

export const redirectSuccess = (): RedirectSuccess => ({
    type: commonAction.REDIRECT_SUCCESS
});