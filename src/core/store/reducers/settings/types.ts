
export type SettingsState = {
    loading: boolean;
    footer: FooterState | null;
}

type FooterState = {
    descriptionGetInTouch: string;
    networks: Network[];
}

export type Network = {
    link: string;
    url: string;
}