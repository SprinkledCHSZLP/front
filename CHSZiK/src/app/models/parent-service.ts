export interface IParentService {
  id: number,
  equipment_name: string,
  list_files?: {
    id: number,
    image_plan_reference: string
  }
}
