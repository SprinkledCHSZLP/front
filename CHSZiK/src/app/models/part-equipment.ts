import {IModel} from "./models-equipment";

export interface IPart {
  id?: number,
  position_on_plan: string,
  equipment_name: string,
  have_equipment: boolean,
  service: boolean,
  service_id?: number,
  parent_equipment_id?: number
}
