import RenderEvent from 'ol/render/Event';
import { AlloyMapError } from '../error/AlloyMapError';
import { AlloyMap } from '../map/core/AlloyMap';

/**
 * utility for screenshotting the map
 * @ignore
 * @internal
 */
export abstract class ScreenshotUtils {
  /**
   * takes a screenshot and returns the blob data
   * @param map the map instance to screenshot
   */
  public static async screenshot(map: AlloyMap): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      let canvas: HTMLCanvasElement | undefined;
      map.olMap.once('postrender', (event: RenderEvent) => {
        try {
          // get the canvas
          const mapCanvases: NodeListOf<HTMLCanvasElement> = map.olMap
            .getTargetElement()
            .querySelectorAll<HTMLCanvasElement>('canvas');
          if (mapCanvases.length === 0) {
            reject(new AlloyMapError(1578673819, 'failed to find map canvases'));
            return;
          }

          // Device pixel ratio will be used to scale down the resulting canvas so that screenshot
          // matches what's displayed on the screen
          const dpr = window.devicePixelRatio || 1;

          // Crete a copy of the canvas, since we will be drawing scale on it we don't want it to be
          // visible on the main map canvas
          canvas = document.createElement('canvas');
          canvas.width = mapCanvases.item(0).width / dpr;
          canvas.height = mapCanvases.item(0).height / dpr;
          map.olMap.getTargetElement().appendChild(canvas);
          const canvasContext = canvas.getContext('2d');
          if (!canvasContext) {
            reject(new AlloyMapError(1583231614, 'failed to copy map canvases to new canvas'));
            return;
          }

          for (let i = 0; i < mapCanvases.length; i++) {
            const mapCanvas = mapCanvases.item(i);
            // if canvas doesn't have width or height set then nothing is rendered on it
            if (!mapCanvas.width || !mapCanvas.height) {
              continue;
            }
            // check that canvas is not tainted so final canvas can be saved
            if (!ScreenshotUtils.isTainted(mapCanvas)) {
              canvasContext.drawImage(
                mapCanvas,
                0,
                0,
                mapCanvas.width,
                mapCanvas.height,
                0,
                0,
                canvas.width,
                canvas.height,
              );
            }
          }

          // Draw scale on the canvas copy
          const drawScaleResponse = ScreenshotUtils.drawScale(map, canvas);
          if (drawScaleResponse) {
            reject(new AlloyMapError(1583155169, 'failed to draw scale - ' + drawScaleResponse));
            return;
          }

          canvas.toBlob((blob: Blob | null) => {
            if (!blob) {
              reject(new AlloyMapError(1578673083, 'failed to convert canvas to blob'));
              return;
            }

            resolve(blob);
          }, 'image/png');
        } catch (error) {
          reject(new AlloyMapError(1559148073, 'failed to convert canvas to blob'));
        } finally {
          if (canvas) {
            map.olMap.getTargetElement().removeChild(canvas);
          }
        }
      });

      map.olMap.renderSync();
    });
  }

  /**
   * Copy scale from alloy map onto canvas
   * @param map AlloyMap that we are copying scale from
   * @param canvas Canvas to draw scale on
   * @returns an error message or undefined if everything is fine
   */
  private static drawScale(map: AlloyMap, canvas: HTMLCanvasElement): string | undefined {
    const context = canvas.getContext('2d');
    if (!context) {
      return 'Could not get canvas context';
    }

    const inner = map.olMap.getTargetElement().querySelector<HTMLElement>('.alloy-map__scale-inner');
    if (!inner) {
      return;
    }

    const offset = 20;
    const height = 10;
    const padding = 10;
    const fontHeight = 12;
    const width = parseInt(inner.style['width'], 10);

    context.fillStyle = 'rgba(10, 49, 82, 0.5)';
    context.fillRect(
      offset - padding,
      canvas.height - offset - fontHeight - padding * 2,
      width + padding * 2,
      fontHeight + padding * 3,
    );

    context.lineWidth = 1;
    context.strokeStyle = '#eee';

    context.beginPath();
    context.moveTo(offset, canvas.height - (offset + height));
    context.lineTo(offset, canvas.height - offset);
    context.lineTo(offset + width, canvas.height - offset);
    context.lineTo(offset + width, canvas.height - (offset + height));
    context.stroke();

    context.textAlign = 'center';
    context.font = `${fontHeight}px "Open Sans"`;

    context.strokeText(inner.innerText, offset + width / 2, canvas.height - (offset + height - 2));
  }

  /**
   * Checks canvas whether it's tainted and cannot be saved to screenshot
   * @param canvas canvas element to check whether it's tainted
   */
  private static isTainted(canvas: HTMLCanvasElement): boolean {
    try {
      const context = canvas.getContext('2d');
      if (!context) {
        return true;
      }
      // if canvas is tainted then this should throw an exception
      context.getImageData(0, 0, 1, 1);
      return false;
    } catch (e) {
      return true;
    }
  }
}
