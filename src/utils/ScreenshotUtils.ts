import OLRenderEvent from 'ol/render/Event';
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
      map.olMap.once('postcompose', (e: any) => {
        try {
          const event: OLRenderEvent = e as OLRenderEvent;

          // get the canvas
          const canvas: HTMLCanvasElement = event.context.canvas;
          canvas.toBlob((blob: Blob | null) => {
            if (!blob) {
              reject(new AlloyMapError(1559148073, 'failed to convert canvas to blob'));
              return;
            }

            resolve(blob);
          }, 'image/png');
        } catch (error) {
          reject(new AlloyMapError(1559148073, 'failed to convert canvas to blob'));
        }
      });

      map.olMap.renderSync();
    });
  }
}
