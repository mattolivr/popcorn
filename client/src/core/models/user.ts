export default interface User {
  id?: string;

  name: string;
  password: string;

  displayName: string;
  email: string;
  birth: string; // TODO: Verificar

  imgProfile?: string;
  imgBackground?: string;
}
