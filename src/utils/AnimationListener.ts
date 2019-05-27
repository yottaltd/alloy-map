import RenderCanvas from 'ol/render/canvas';

export interface AnimationListener {
  preAnimation: () => void;
  compose: (renderer: RenderCanvas.Immediate, ratio: number) => void;
  postAnimation: () => void;
}
