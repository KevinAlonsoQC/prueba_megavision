export interface Cliente {
  name: string;
  email: string;
  password: string;
  rol: string;
  registration_date: string; // Usamos string para la fecha, ya que se manejará como texto en JSON
  country_id: number | null; // Puede ser null si no se proporciona un país
}

export interface ClienteID extends Cliente {
  id: number;
}

export interface ClienteOp extends Partial<Cliente> {}