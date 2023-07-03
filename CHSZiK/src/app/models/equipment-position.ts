export interface IEquipmentPosition {
  id: number,
  position_on_plan: string,
  equipment_name: string,
  date_last_service: string,
  date_planned_service: string,
  service: boolean,
  have_equipment: boolean
}
