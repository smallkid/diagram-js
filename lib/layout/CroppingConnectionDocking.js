import {
  assign
} from 'min-dash';

import {
  getElementLineIntersection
} from './LayoutUtil';


function dockingToPoint(docking) {

  // use the dockings actual point and
  // retain the original docking
  return assign({ original: docking.point.original || docking.point }, docking.actual);
}


/**
 * A {@link ConnectionDocking} that crops connection waypoints based on
 * the path(s) of the connection source and target.
 *
 * @param {djs.core.ElementRegistry} elementRegistry
 */
export default function CroppingConnectionDocking(elementRegistry, graphicsFactory) {
  this._elementRegistry = elementRegistry;
  this._graphicsFactory = graphicsFactory;
}

CroppingConnectionDocking.$inject = [ 'elementRegistry', 'graphicsFactory' ];


/**
 * Get cropped waypoints.
 *
 * @param {<djs.model.Connection>} - connection
 * @param {<djs.model.Shape>} - source
 * @param {<djs.model.Shape>} - target
 * @param {Array<Point>} - waypoints
 *
 * @returns {Array<Point>}
 */
CroppingConnectionDocking.prototype.getCroppedWaypoints = function(
    connectionOrWaypoints,
    source,
    target
) {

  source = source || connectionOrWaypoints.source;
  target = target || connectionOrWaypoints.target;

  var waypoints = connectionOrWaypoints.waypoints || connectionOrWaypoints;

  var sourceDocking = this.getDockingPoint(waypoints, source, true),
      targetDocking = this.getDockingPoint(waypoints, target);

  var croppedWaypoints = waypoints.slice(sourceDocking.idx + 1, targetDocking.idx);

  croppedWaypoints.unshift(dockingToPoint(sourceDocking));
  croppedWaypoints.push(dockingToPoint(targetDocking));

  return croppedWaypoints;
};

/**
 * Return the connection docking point on the specified shape
 *
 * @inheritDoc ConnectionDocking#getDockingPoint
 */
CroppingConnectionDocking.prototype.getDockingPoint = function(waypoints, shape, dockStart) {
  var dockingIdx,
      dockingPoint,
      croppedPoint;

  dockingIdx = dockStart ? 0 : waypoints.length - 1;
  dockingPoint = waypoints[dockingIdx];

  croppedPoint = this._getIntersection(shape, waypoints, dockStart);

  return {
    point: dockingPoint,
    actual: croppedPoint || dockingPoint,
    idx: dockingIdx
  };
};


// helpers //////////////////////

CroppingConnectionDocking.prototype._getIntersection = function(shape, waypoints, takeFirst) {

  var shapePath = this._getShapePath(shape),
      connectionPath = this._getConnectionPath(waypoints);

  return getElementLineIntersection(shapePath, connectionPath, takeFirst);
};

CroppingConnectionDocking.prototype._getConnectionPath = function(waypoints) {
  return this._graphicsFactory.getConnectionPath(waypoints);
};

CroppingConnectionDocking.prototype._getShapePath = function(shape) {
  return this._graphicsFactory.getShapePath(shape);
};

CroppingConnectionDocking.prototype._getGfx = function(element) {
  return this._elementRegistry.getGraphics(element);
};
