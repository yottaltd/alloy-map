import * as color from 'color';

/**
 * Utility for canvas
 * @ignore
 * @internal
 */
export abstract class CanvasUtils {
  /**
   * Checks luminousity of colours on canvas and returns true if they are light
   * @param canvas canvas to check colours on
   * @param dataDimensions optional dimensions to use for colour check
   * @returns true if canvas is light, false if it's dark or if couldn't get canvas context
   */
  public static isCanvasLight(
    canvas: HTMLCanvasElement,
    dataDimensions?: {
      startX: number;
      startY: number;
      width: number;
      height: number;
    },
  ): boolean {
    const context = canvas.getContext('2d');
    if (!context) {
      return false;
    }

    // Get colours data from sample of canvas, if data dimensions are provided then use that,
    // otherwise use a 100x20 rect in the bottom left corner of canvas
    let colours: Uint8ClampedArray;
    if (dataDimensions) {
      colours = context.getImageData(
        dataDimensions.startX,
        dataDimensions.startY,
        dataDimensions.width,
        dataDimensions.height,
      ).data;
    } else {
      colours = context.getImageData(20, canvas.height - 40, 100, 20).data;
    }

    // Get luminosity of all colours that we got and check whether they are light enough
    const isLightColours: boolean[] = [];
    for (var i = 0; i < colours.length / 3; i += 3) {
      const luminosity = color.rgb([colours[i], colours[i + 1], colours[i + 2]]).luminosity();
      isLightColours.push(luminosity > 0.41);
    }
    // Check that most of the colours we got are light
    return isLightColours.filter((light) => light).length > isLightColours.length / 2;
  }
}
