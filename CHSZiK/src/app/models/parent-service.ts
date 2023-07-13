export interface IParentService {
  id: number,
  equipment_name: string,
  list_files: [{
    id: number,
    files_reference: string
  }]
}

export interface IParentServiceFile {id: number, files_reference: string}

