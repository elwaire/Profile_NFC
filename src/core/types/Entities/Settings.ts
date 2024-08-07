export interface NavLink {
    id: string;
    title: string;
    url: string;
    isActive: boolean;
}

export interface HeaderSettings {
    logoUrl: string;
    logoPath: string;
    navLinks: NavLink[];
}