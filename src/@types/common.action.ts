import { commonAction } from "@/constants/actions";

export interface RedirectRequest{
    type: typeof commonAction.REDIRECT_REQUEST
}

export interface RedirectSuccess{
    type: typeof commonAction.REDIRECT_SUCCESS
}