import { Hospital } from './hospital.model';


interface MedicoUser {
  id: string;
  nombre: string;
  img: string;
}


export class Medico {

  constructor(
    public nombre: string,
    public _id: string,
    public hospital?: Hospital,
    public img?: string,
    public usuario?: MedicoUser,
  ) {}

}
