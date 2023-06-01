export interface IModel {
  id: number,
  equipment_name: string,
  image_plan_reference: string,
  listPosition?: {
    id: number,
    groupId: number,
    position: string,
    equipmentId: number
  }


  //parent: "3" string ссылка на родителя
  //children: [] список детей
}
