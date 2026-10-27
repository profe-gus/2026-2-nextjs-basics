export interface Student {
    id:               string;
    name:             string;
    age:              number;
    email:            string;
    isActive:         boolean;
    gender:           Gender;
    favoriteSubjects: Subject[];
    nickname:         string;
    grades:           Grade[];
}

export enum Subject {
    Biology = "Biology",
    Chemistry = "Chemistry",
    Compunet1 = "Compunet1",
    English = "English",
    History = "History",
    Math = "Math",
    PE = "P.E",
    Physics = "Physics",
    Programming = "Programming",
}

export enum Gender {
    Female = "Female",
    Male = "Male",
    Other = "Other",
}

export interface Grade {
    id:      string;
    subject: Subject;
    grade:   number;
}
