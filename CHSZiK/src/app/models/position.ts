export interface IPosition {
  id: number,
  equipment_id: number,
  equipment_name?: string,
  image: string,
  position: string,
  group_id?: string,
  location_id?: number,
  position_on_location: number
}
