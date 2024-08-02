import { TeamMember } from "~/core/types";

export type TeamState = {
    loading: boolean;
    listTeam: TeamMember[];
    totalMembers: number;
    currentPage: number;
    
}
