import { AboutUsData } from "~/core/types";

export type AboutUsState = {
    loading: boolean;
    data: AboutUsData | null;
}