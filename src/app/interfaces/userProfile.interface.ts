export interface UserProfiles {
    users?: UserProfile;
}
export interface UserProfile {
    id: number | string;
    empName: string;
    empCode: string;
    designation: string;
    location: string;
}
