export interface Student {
    id:               string;
    name:             string;
    age:              number;
    email:            string;
    isActive:         boolean;
    gender:           Gender;
    favoriteSubjects: string[];
    nickname:         string;
    grades:           Grade[];
}



export enum Gender {
    Female = "Female",
    Male = "Male",
    Other = "Other",
}

export interface Grade {
    id:      string;
    subject: string;
    grade:   number;
}
