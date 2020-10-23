export class Employe {
    id: number;
    fullname: string;
    role: Role | null;
    email: string;
    boss: Employe | null;
}

export class Role {
    id: number;
    descripcion: string;
}
