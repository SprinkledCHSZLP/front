export interface ITypeSpareParts {
  id: number,
  manufacturer: string,
  article: string,
  name: string,
  price: number,
  type_measure_units_id: number,
  quantity: number,
  measurement_units: string,
  list_image: [{
    id: number,
    image_plan_reference: string
  }]
}

export interface IManufacturer {
  manufacture_name: string
}
