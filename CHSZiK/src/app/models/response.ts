import {IModel} from "./models-equipment";
import {IPart} from "./part-equipment";
import {IParentPart} from "./parent-part-equipment";

export interface ResponseDataModels {
  data: IModel[]
}

export interface ResponseDataPart {
  data: IPart[]
}

export interface ResponseDataParentPart {
  data: IParentPart
}
