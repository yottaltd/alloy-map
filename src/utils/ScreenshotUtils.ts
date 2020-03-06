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
      let canvasCopy: HTMLCanvasElement | undefined;
      map.olMap.once('postrender', (event: RenderEvent) => {
        try {
          // get the canvas
          const canvas: HTMLCanvasElement | null = map.olMap
            .getTargetElement()
            .querySelector<HTMLCanvasElement>('canvas');
          if (canvas === null) {
            reject(new AlloyMapError(1578673819, 'failed to find map canvas'));
            return;
          }

          // Crete a copy of the canvas, since we will be drawing scale on it we don't want it to be
          // visible on the main map canvas
          canvasCopy = document.createElement('canvas');
          canvasCopy.width = canvas.width;
          canvasCopy.height = canvas.height;
          map.olMap.getTargetElement().appendChild(canvasCopy);
          const canvasCopyContext = canvasCopy.getContext('2d');
          if (!canvasCopyContext) {
            reject(new AlloyMapError(1583231614, 'failed to copy map canvas to new canvas'));
            return;
          }
          canvasCopyContext.drawImage(canvas, 0, 0);

          // Draw scale on the canvas copy
          const drawScaleResponse = ScreenshotUtils.drawScale(map, canvasCopy);
          if (drawScaleResponse) {
            reject(new AlloyMapError(1583155169, 'failed to draw scale - ' + drawScaleResponse));
          }

          canvasCopy.toBlob((blob: Blob | null) => {
            if (!blob) {
              reject(new AlloyMapError(1578673083, 'failed to convert canvas to blob'));
              return;
            }

            resolve(blob);
          }, 'image/png');
        } catch (error) {
          reject(new AlloyMapError(1559148073, 'failed to convert canvas to blob'));
        } finally {
          if (canvasCopy) {
            map.olMap.getTargetElement().removeChild(canvasCopy);
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

    const inner = map.olMap.getTargetElement().querySelector<HTMLElement>('.ol-scale-line-inner');
    if (!inner) {
      return 'Could not get scale line inner element';
    }

    const offset = 20;
    const height = 10;
    const padding = 2;
    const fontHeight = 12;
    const width = parseInt(inner.style['width'], 10);

    context.fillStyle = 'rgba(10, 49, 82, 0.5)';
    context.fillRect(
      offset - padding * 2,
      canvas.height - offset - fontHeight - padding * 4,
      width + padding * 4,
      fontHeight + padding * 6,
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

    context.strokeText(
      inner.innerText,
      offset + width / 2,
      canvas.height - (offset + height - padding),
    );
  }
}
