// export const BASE_URL = 'http://192.168.0.117:8000/'
// export const BASE_URL = 'http://192.168.0.117:8080'
export const BASE_URL = 'http://195.161.68.107'


export const CHECKTOKEN_URL = BASE_URL + '/api/check_token'
export const USER_URL = BASE_URL + '/api/user'
export const ADDINGPART_URL = BASE_URL + '/api/add_equipment_child'
export const UPGRADEPART_URL = BASE_URL + '/api/save_changes'
export const DELETEPART_URL = BASE_URL + '/api/delete_equipment?id='
export const PARENTPART_URL = BASE_URL + '/api/equipment_data?parent_equipment_id='
export const ALLPART_URL = BASE_URL + '/api/equipment_child?parent_equipment_id='
export const NEWPARENTPART_URL = BASE_URL + '/api/add_equipment'
export const UPGRADEIMAGE_URL = BASE_URL + '/api/change_image'
export const UPGRADENAME_URL = BASE_URL + '/api/change_name'
export const ALLMODELS_URL = BASE_URL + '/api/equipment'
export const DELETEMODEL_URL = BASE_URL + '/api/delete_equipment?id='

export const ADDINGLOCATION_URL = BASE_URL + '/api/add_location'
export const ALLLOCATION_URL = BASE_URL + '/api/location?id='
export const PARENTLOCATION_URL = BASE_URL + '/api/parent_location?id='
export const SPLITLOCATION_URL = BASE_URL + '/api/split_location'
export const CHANGELOCATION_URL = BASE_URL + '/api/change_location'
export const DELETELOCATION_URL = BASE_URL + '/api/delete_location?id='
export const GETPOSITION_URL = BASE_URL + '/api/position_equipment?equipment_id='
export const ADDINGNEWPOSITION_URL = BASE_URL + '/api/add_position_equipment'
export const ADDINGTOLOCATION_URL = BASE_URL + '/api/add_to_location'
export const SHOWPOSITION_URL = BASE_URL + '/api/show_by_location?locations_id='
export const DELETEPOSITIONMODEL_URL = BASE_URL + '/api/remove_from_location'
export const DELETEPOSITION_URL = BASE_URL + '/api/delete_position?group_id='
export const GETALLPOSITION_URL = BASE_URL + '/api/show_by_equipment?equipment_id='
