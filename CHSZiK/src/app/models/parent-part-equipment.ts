// export interface IParentPart {
//   id?: number,
//   equipment_name: string,
//   parent_equipment_id: string | null
//   image_plan_reference: string,
//
// }

export interface IParentPart {
  id?: number,
  equipment_name: string,
  parent_equipment_id: string | null,
  list_image: [{
    id: number,
    image_plan_reference: string
  }]

}

export interface IParentPartFile {id: number, image_plan_reference: string}

export interface IAddParentPart {
  id?: number,
  image?: File,
  equipment_name: string,
}
