import {IModel} from "./models-equipment";
import {IPart} from "./part-equipment";

export interface ResponseDataModels{
  data: IModel[]
}

export interface  ResponseDataPart {
  data: IPart[]
}
