import {IModel} from "./models-equipment";
import {IPart} from "./part-equipment";
import {IParentPart} from "./parent-part-equipment";
import {ILocation} from "./location";
import {IPosition} from "./position";
import {ITypeSpareParts} from "./type-spare-part";
import {ISparePart} from "./spare-part";
import {IGroup} from "./groups-in-warehouse";
import {IPartEquipmentPosition} from "./part-equipment-position";
import {IParentEquipmentPosition} from "./parent-equipment-position";
import {IListTools} from "./list-tools";
import {IListDetails} from "./list-details";
import {IListConsumables} from "./list-consumables";
import {IParentService} from "./parent-service";

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

export interface ResponseDataGroupsInWarehouse {
  data: IGroup[]
}

export interface ResponseDataGroupInWarehouse {
  data: IGroup
}

export interface ResponseDataPartEquipmentPosition {
  data: IPartEquipmentPosition[]
}

export interface ResponseDataParentEquipmentPosition {
  data: IParentEquipmentPosition
}

export interface ResponseDataListTools {
  data: IListTools[]
}

export interface ResponseDataListDetails {
  data: IListDetails[]
}

export interface ResponseDataListConsumables {
  data: IListConsumables[]
}

export interface ResponseDataParentService {
  data: IParentService
}
