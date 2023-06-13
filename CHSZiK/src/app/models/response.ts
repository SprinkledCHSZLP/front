import {IModel} from "./models-equipment";
import {IPart} from "./part-equipment";
import {IParentPart} from "./parent-part-equipment";
import {ILocation} from "./location";
import {IPosition} from "./position";
import {ITypeSpareParts} from "./type-spare-part";
import {ISparePart} from "./spare-part";

export interface ResponseDataModels {
  data: IModel[]
}

export interface ResponseDataPart {
  data: IPart[]
}

export interface ResponseDataParentPart {
  data: IParentPart
}

export interface ResponseDataLocation {
  data: ILocation[]
}

export interface ResponseDataParentLocation {
  data: ILocation
}

export interface ResponseDataPosition {
  data: IPosition[]
}


export interface ResponseDataTypeSpareParts {
  data: ITypeSpareParts[]
}

export interface ResponseDataTypeSparePart {
  data: ITypeSpareParts
}

export interface ResponseDataSparePart {
  data: ISparePart[]
}
