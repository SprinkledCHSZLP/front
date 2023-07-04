export interface IParentEquipmentPosition {
  id: number,
  position: string,
  list_image: [{
    id: number,
    image_plan_reference: string
  }],
  equipment_name: string
}
