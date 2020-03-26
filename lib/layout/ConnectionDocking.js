/**
 * @memberOf djs.layout
 */

/**
 * @class DockingPointDescriptor
 */

/**
 * @name DockingPointDescriptor#point
 * @type djs.Point
 */

/**
 * @name DockingPointDescriptor#actual
 * @type djs.Point
 */

/**
 * @name DockingPointDescriptor#idx
 * @type Number
 */

/**
 * A layout component for connections that retrieves waypoint information.
 *
 * @class
 * @constructor
 */
export default function ConnectionDocking() {}


/**
 * Return the actual waypoints of the connection (visually).
 *
 * @param {djs.model.Connection|Array<Point>} connectionOrWaypoints
 * @param {djs.model.Shape} [source]
 * @param {djs.model.Shape} [target]
 *
 * @return {Array<Point>}
 */
ConnectionDocking.prototype.getCroppedWaypoints = function(connectionOrWaypoints, source, target) {
  return connectionOrWaypoints.waypoints || connectionOrWaypoints;
};

/**
 * Return the connection docking point on the specified shape
 *
 * @param {Array<Point>} waypoints
 * @param {djs.model.Shape} shape
 * @param {Boolean} [dockStart=false]
 *
 * @return {DockingPointDescriptor}
 */
ConnectionDocking.prototype.getDockingPoint = function(waypoints, shape, dockStart) {
  var dockingIdx,
      dockingPoint;

  dockingIdx = dockStart ? 0 : waypoints.length - 1;
  dockingPoint = waypoints[dockingIdx];

  return {
    point: dockingPoint,
    actual: dockingPoint,
    idx: dockingIdx
  };
};