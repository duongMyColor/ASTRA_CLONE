import exp from 'constants';
import type { Rect, Text } from 'fabric/fabric-impl';
import { Actions } from './roles';

export interface RectEditorProps {
  imagePath: string;
  data: RectData;
  actions: Actions;
  onChange: (data: RectData) => void;
}

export interface RectData {
  originX: number;
  originY: number;
  width: number;
  height: number;
  scanColors?: string;
}

export interface CustomRect extends Rect {
  id?: string | number;
}

export interface CustomText extends Text {
  id?: string | number;
}
