import * as _ from 'lodash';
import OLFeature from 'ol/Feature';
import OLLayer from 'ol/layer/Layer';
import OLMapBrowserPointerEvent from 'ol/MapBrowserPointerEvent';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyLayer } from '../layers/AlloyLayer';

/**
 * the number of milliseconds to throttle the pointer move event by
 * @ignore
 */
const POINTER_MOVE_THROTTLE = 50;

/**
 * adds hover interaction to an alloy map
 * @ignore
 */
export class AlloyHoverInteraction {
  /**
   * the map to add hover interaction to
   */
  private map: AlloyMap;

  /**
   * cached function to get the pointer move layer payload based on the current state of layers
   * and open layers revisions
   */
  private memoizedPointerMoveLayerPayload: (
    layers: AlloyLayer[],
  ) => PointerMoveLayerPayload = _.memoize(
    // gets the payload
    (layers: AlloyLayer[]) => {
      const olLayers = layers.map((l) => l.olLayer);
      // TODO maybe work out the z-index?
      const payload: PointerMoveLayerPayload = {
        layers,
        olLayers,
        olLayersSet: new Set(olLayers),
      };
      return payload;
    },
    // function generates a consistent cache key
    (layers: AlloyLayer[]) => {
      return layers.map((l) => l.id + '@' + l.olLayer.getRevision()).join(':');
    },
  );

  /**
   * creates a new instance
   * @param map the map to add hover interaction to
   */
  constructor(map: AlloyMap) {
    this.map = map;

    // listen for pointer move events, these can happen very frequently so we debounce the
    // processing done for these events
    this.map.olMap.on(
      'pointermove',
      _.debounce((e) => this.onPointerMove(e /* this is untyped in ol */), POINTER_MOVE_THROTTLE, {
        // call the function immediately
        leading: true,
        // always call it after the events stop
        trailing: true,
        // the max amount of time between calling e.g. user keeps moving the mouse for 1s
        maxWait: POINTER_MOVE_THROTTLE,
      }),
    );
  }

  /**
   * called when the pointer event is triggered
   * @param event the pointer move event
   */
  private onPointerMove(event: OLMapBrowserPointerEvent): void {
    // short circuit when dragging
    if (event.dragging) {
      this.map.hoverLayer.setHoveredFeature(null);
      return;
    }

    const payload = this.memoizedPointerMoveLayerPayload(this.map.layers);

    // the features we found when hovering
    const features: AlloyFeature[] = [];

    // iterate through each feature at the map pixel
    this.map.olMap.forEachFeatureAtPixel(
      event.pixel,
      (olFeature, olLayer) => {
        // potentially a render feature
        if (olFeature instanceof OLFeature) {
          // find the open layers layer index in our layers (reverse mapping)
          const index = payload.olLayers.indexOf(olLayer);
          if (index >= 0) {
            // get the alloy layer and find the feature by id
            const feature = payload.layers[index].getFeatureById(
              FeatureUtils.getFeatureIdFromOlFeature(olFeature),
            );

            // if we have a feature add it to the array
            if (feature) {
              features.push(feature);
            }
          }
        }
      },
      {
        // filters the layers to iterate though, we only want alloy layers e.g. not hover layers
        layerFilter: (l) => payload.olLayersSet.has(l),
      },
    );

    if (features.length > 0) {
      // TODO possible z-index issue
      this.map.hoverLayer.setHoveredFeature(features[0]);
    } else {
      this.map.hoverLayer.setHoveredFeature(null);
    }
  }
}

/**
 * interface to hold data for the hover interaction
 * @ignore
 */
interface PointerMoveLayerPayload {
  layers: AlloyLayer[];
  olLayers: OLLayer[];
  olLayersSet: Set<OLLayer>;
}
