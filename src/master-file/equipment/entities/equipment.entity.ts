import { EquipmentPackage } from 'src/schemas/equipmentPackage.schema';
import { EquipmentPower } from 'src/schemas/equipmentPower.schema';
export class Equipment {
  code: string;
  name: string;
  groupName: string;
  cost: string;
  markUp: string;
  heatDissipation: string;
  ictPort: string;
  bssPort: string;
  remarks: string;
  utility: string;
  labels: string;
  created: Date;
  updated: Date;
  equipmentPackage: EquipmentPackage; 
  equipmentPower: EquipmentPower; 

}
