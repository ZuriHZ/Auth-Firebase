export interface Usuario {
  uid: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  demo?: boolean;
}
