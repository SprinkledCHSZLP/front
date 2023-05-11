export interface IModel {
  id: number;
  equipment_name: string
  image_plan_reference: string
  parent_equipment_id?: number
  listPosition?: {
    id: number,
    groupId: number,
    position: string,
    equipmentId: number
  }


  //parent: "3" string ссылка на родителя
  //children: [] список детей
}
