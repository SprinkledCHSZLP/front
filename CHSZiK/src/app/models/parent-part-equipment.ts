export interface IParentPart {
  id?: number,
  image_plan_reference: string,
  equipment_name: string,
}

export interface IAddParentPart {
  id?: number,
  image?: File,
  equipment_name: string,
}
