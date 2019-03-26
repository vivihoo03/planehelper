/**
 * PlaneHelper is helperful to switch between
 * 2d and 3d plane point operation
 **/
import * as THREE from 'three';
import { Vector3 as V3, Plane as P3 } from 'three';
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
    convertTo2D(point: V3): THREE.Vector2;
    convertTo3D(point: XY): THREE.Vector3;
    convertTo2DVec(point: any): THREE.Vector2;
    converTo3DVec(vec: any): THREE.Vector3;
    intersectInfinityLine(line: any): THREE.Vector3;
    intesectLine(line: any): THREE.Vector3;
    intersectSegment(segment: any): THREE.Vector3;
    projectPoint(point: any, target: any): THREE.Vector3;
    applyMatrix4(mat: THREE.Matrix4): this;
    getTransMatrix(): THREE.Matrix4;
    toMetaData(): {
        origin: THREE.Vector3;
        xray: THREE.Vector3;
        normal: THREE.Vector3;
    };
}
export {};
