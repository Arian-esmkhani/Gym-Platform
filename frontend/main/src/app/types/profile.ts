export interface AddProfileDto {
    phoneNumber: string,
    age: number,
    weight: number,
    height: number,
    size: string,
    userNote: string
}

export interface ProfileDto {
    phoneNumber: string,
    age: number,
    weight: number,
    height: number,
    size: string,
    userNote: string,
    coachNote: string,
    createdAt: string
}
