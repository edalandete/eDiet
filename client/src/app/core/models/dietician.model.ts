export interface Dietician {
    _id: string; 
    firstName: string;
    lastName: string;
    email: string;
    idCard: string;
    password: string;
    schedule: {
        monday: [string];
        tuesday: [string];
        wednesday: [string];
        thursday: [string];
        friday: [string];
    }
}