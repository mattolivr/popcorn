export abstract class Person {
  id: number;
  creditId: string;

  name: string;
  knownForDepartment: string;

  profilePath: string;

  constructor(object: any) {
    this.id = object.id;
    this.creditId = object.credit_id;

    this.name = object.name;
    this.knownForDepartment = object.known_for_department;

    this.profilePath = object.profile_path;
  }
}

export class Cast extends Person {
  character: string;
  castId: number;
  order: number;

  constructor(object: any) {
    super(object);

    this.character = object.character;
    this.castId = object.cast_id;
    this.order = object.order;
  }
}

export class Crew extends Person {
  job: string;
  department: string;

  constructor(object: any) {
    super(object);

    this.job = object.job;
    this.department = object.department;
  }
}
