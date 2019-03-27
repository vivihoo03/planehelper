/**
 * PlaneHelper is helperful to switch between
 * 2d and 3d plane point operation
 **/
import * as THREE from 'three';
import { Vector3 as V3, Plane as P3, Vector2 as V2 } from 'three';
interface XYZ {
    x: number;
    y: number;
    z: number;
}
interface XY {
    x: number;
    y: number;
}
export declare class PlaneHelper {
    private plane;
    private xRay;
    private yRay;
    private origin;
    static createPlane(normal: XYZ, origin: XYZ, xRay: XYZ): PlaneHelper;
    static copy(planeHp: PlaneHelper): PlaneHelper;
    constructor(plane: P3, xRay: V3);
    readonly Normal: V3;
    Origin: V3;
    XRay: V3;
    YRay: V3;
    setOrigin(origin: XYZ): void;
    convertTo2D(point: V3): V2;
    convertTo3D(point: XY): V3;
    convertTo2DVec(point: V3): V2;
    converTo3DVec(vec: XY): V3;
    intersectInfinityLine(line: THREE.Line3): V3;
    intesectLine(line: THREE.Line3): V3;
    intersectSegment(segment: THREE.Line3): V3;
    projectPoint(point: V3, target: V3): THREE.Vector3;
    applyMatrix4(mat: THREE.Matrix4): PlaneHelper;
    getTransMatrix(): THREE.Matrix4;
    toMetaData(): {
        origin: V3;
        xray: V3;
        normal: V3;
    };
}
export {};
