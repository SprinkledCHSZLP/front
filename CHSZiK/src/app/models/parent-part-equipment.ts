export interface IParentPart {
  id?: number,
  image_plan_reference: string,
  equipment_name: string,
  parent_equipment_id: string | null
}

export interface IAddParentPart {
  id?: number,
  image?: File,
  equipment_name: string,
}
