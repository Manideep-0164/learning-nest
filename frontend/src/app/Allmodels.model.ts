export interface Student {
    name: string;
    dob: string | null;
    major: string;
    email: string;
    contact_number: string;
    password: string;
    gender: string
}

export interface StudentLogin {
    id : number;
    message : string;
    name : string;
    token : string;
}
export interface InstructorLogin {
    course_id : number;
    id : number;
    message : string;
    name : string;
    token : string;
}
export interface Courses {
    id: number;
    name?:string,
    description? : string ,
}

export interface AllDepartment {
    name: string;
    courses : Courses[]
}

export interface MyCourses {
    dept_id: number;
    description: string;
    id: number;
    image: string;
    instructor: string;
    name : string
}


