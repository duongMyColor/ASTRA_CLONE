// External imports
import { Dispatch, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import type { Image, Canvas, IEvent, IPoint } from 'fabric/fabric-impl';
import {
  Stack,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material';

// Internal imports
import {
  CustomRect,
  CustomText,
  RectData,
  RectEditorProps,
} from '@repo/types/rectangleEditor';
import { generateRandomId, roundNumberWith5Decimals } from '@repo/utils/number';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  RECT_OPTIONS,
  TEXT_OPTIONS,
  SIZE_FALLBACK,
  SCALE_FALLBACK,
} from '@repo/consts/imgRectSelection';

import './style.css';

const tableBorder = {
  border: '1px solid black',
  borderSpacing: '0',
  width: 'fit-content',
  height: 'fit-content',
};

const cellBorder = {
  ...tableBorder,
  padding: 5,
};

let classLocal: string;

const drawImgWithFabric = (
  canvas: Canvas,
  imagePath: string,
  rectData: RectData[],
  setRectData: Dispatch<React.SetStateAction<RectData[]>>
) => {
  if (!imagePath.includes('base64')) return;

  let rect: CustomRect, isDown: boolean, origX: number, origY: number;

  const addRectangle = (pointer: IPoint) => {
    rect = new fabric.Rect({
      left: pointer.x,
      top: pointer.y,
      ...RECT_OPTIONS,
    });

    rect.id = generateRandomId();

    addTextToCanvas(canvas, rect, TEXT_OPTIONS);

    canvas.add(rect);
  };

  const updateRectangle = (pointer: IPoint) => {
    if (!isDown) return;
    if (origX > pointer.x) {
      rect.set({ left: Math.abs(pointer.x) });
    }
    if (origY > pointer.y) {
      rect.set({ top: Math.abs(pointer.y) });
    }
    rect.set({ width: Math.abs(origX - pointer.x) });
    rect.set({ height: Math.abs(origY - pointer.y) });
    canvas.renderAll();
  };

  const finishDrawingRectangle = () => {
    isDown = false;

    const x =
      ((rect.left ?? SIZE_FALLBACK) + (rect.width ?? SIZE_FALLBACK) / 2) /
      (canvas.width ?? SIZE_FALLBACK);
    const y =
      ((rect.top ?? SIZE_FALLBACK) + (rect.height ?? SIZE_FALLBACK) / 2) /
      (canvas.height ?? SCALE_FALLBACK);
    const width =
      (rect.width ?? SIZE_FALLBACK) / (canvas.width ?? SCALE_FALLBACK);
    const height =
      (rect.height ?? SIZE_FALLBACK) / (canvas.height ?? SCALE_FALLBACK);

    setRectData((prevState: RectData[]) => {
      return [
        ...prevState,
        {
          id: rect.id,
          class: Number(classLocal),
          x: roundNumberWith5Decimals(x),
          y: roundNumberWith5Decimals(y),
          width: roundNumberWith5Decimals(width),
          height: roundNumberWith5Decimals(height),
        },
      ];
    });
  };

  const handleMouseDown = (o: IEvent) => {
    isDown = true;
    const pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    addRectangle(pointer);
  };

  const handleMouseMove = (o: IEvent) => {
    const pointer = canvas.getPointer(o.e);
    updateRectangle(pointer);
  };

  const handleMouseUp = () => {
    finishDrawingRectangle();
  };

  const addTextToCanvas = (
    canvas: Canvas,
    rect: CustomRect,
    textOptions: object
  ) => {
    const indexText: CustomText = new fabric.Text(String(rect.id), {
      left: (rect.left ?? 0) + 25,
      top: (rect.top ?? 0) + 10,
      ...textOptions,
    });
    indexText.id = rect.id;
    canvas.add(indexText);
  };

  // Add image to canvas
  fabric.Image.fromURL(imagePath, (img: Image) => {
    let scale = Math.min(
      CANVAS_WIDTH / (img.width ?? SCALE_FALLBACK),
      CANVAS_HEIGHT / (img.height ?? SCALE_FALLBACK)
    );

    // set canvas size to fit scaled image size
    canvas.setWidth((img.width ?? SCALE_FALLBACK) * scale);
    canvas.setHeight((img.height ?? SCALE_FALLBACK) * scale);

    // set image as background
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      scaleX: scale,
      scaleY: scale,
    });

    // Add existing rectangles to canvas
    if (!rectData || rectData.length === 0) return;
    rectData.forEach((data, index) => {
      const left =
        (data.x ?? SIZE_FALLBACK) * (canvas.width ?? SIZE_FALLBACK) -
        ((data.width ?? SIZE_FALLBACK) * (canvas.width ?? SIZE_FALLBACK)) / 2;
      const top =
        (data.y ?? SIZE_FALLBACK) * (canvas.height ?? SIZE_FALLBACK) -
        ((data.height ?? SIZE_FALLBACK) * (canvas.height ?? SIZE_FALLBACK)) / 2;
      const width =
        (data.width ?? SIZE_FALLBACK) * (canvas.width ?? SIZE_FALLBACK);
      const height =
        (data.height ?? SIZE_FALLBACK) * (canvas.height ?? SIZE_FALLBACK);

      const rect: CustomRect = new fabric.Rect({
        left,
        top,
        width,
        height,
        ...RECT_OPTIONS,
      });

      rect.id = data.id;

      addTextToCanvas(canvas, rect, TEXT_OPTIONS);

      canvas.add(rect);
    });

    canvas.renderAll();
  });

  // Handle when user start dragging to draw rectangle
  canvas.on('mouse:down', handleMouseDown);

  // Handle while user dragging to draw rectangle
  canvas.on('mouse:move', handleMouseMove);

  // Handle when user finish drawing rectangle by dropping mouse
  canvas.on('mouse:up', handleMouseUp);
};

const RectEditor = ({
  imagePath,
  data: propsData,
  onSave,
  onCancel,
}: RectEditorProps) => {
  const [rectData, setRectData] = useState<RectData[]>(propsData ?? []);
  const [stateCanvas, setStateCanvas] = useState<Canvas>();
  const [imageClass, setImageClass] = useState('0');
  classLocal = imageClass;

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;

    setImageClass(value);
    classLocal = value;
  };

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas');

    setStateCanvas(canvas);
    drawImgWithFabric(canvas, imagePath, propsData, setRectData);
  }, [imagePath]);

  const removeRectData = ({ id }: RectData) => {
    if (!stateCanvas) return;

    stateCanvas.getObjects().forEach((obj: CustomRect) => {
      if (obj.id === id) {
        stateCanvas.remove(obj);
      }
    });

    setRectData((prevState: RectData[]) =>
      prevState.filter((rect: RectData) => rect.id !== id)
    );
  };

  return (
    <div style={{ margin: 20, padding: 20 }}>
      <div className="flex-container">
        <div>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Class</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={imageClass}
              onChange={handleChange}
              required
            >
              <MenuItem value="0">Collect</MenuItem>
              <MenuItem value="1">Incollect</MenuItem>
            </Select>
          </FormControl>
          <canvas id="canvas"></canvas>
        </div>
        {rectData && rectData.length > 0 && (
          <table style={{ ...tableBorder }}>
            <thead>
              <tr>
                <th style={cellBorder}>ID</th>
                <th style={cellBorder}>Data</th>
                <th style={cellBorder}></th>
              </tr>
            </thead>
            <tbody>
              {rectData.map((rect, index) => (
                <tr key={rect.id}>
                  <td style={cellBorder}>{rect.id}</td>
                  <td style={cellBorder}>{`${rect.class ? rect.class : 0}, ${
                    rect.x
                  }, ${rect.y}, ${rect.width}, ${rect.height}`}</td>
                  <td style={cellBorder}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => removeRectData(rect)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSave(rectData)}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default RectEditor;
