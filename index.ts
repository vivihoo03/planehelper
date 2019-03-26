
/**
 * PlaneHelper is helperful to switch between 
 * 2d and 3d plane point operation
 **/

import THREE, { Vector3 as V3, Plane as P3 } from 'three';

interface XYZ {
    x: number;
    y: number;
    z: number;
}

interface XY {
    x: number;
    y: number;
}

export class PlaneHelper {
    private plane: P3

    private xRay: V3

    private yRay: V3

    private origin: V3

    static createPlane(normal: XYZ, origin: XYZ, xRay: XYZ) : PlaneHelper {
        let normal3 = new V3().copy((normal as V3));
        let origin3 = new V3().copy((origin as V3));
        let xRay3 = new V3().copy((xRay as V3));
        const constant = normal3.normalize().dot(origin3);
        const planeHp = new PlaneHelper(new P3(normal3, -constant), xRay3);
        planeHp.setOrigin(origin3);
        return planeHp;
    }

    constructor(plane: P3, xRay: V3) {
        this.plane = plane;
        this.xRay = xRay;
        this.yRay = plane.normal.clone().cross(xRay);
    }

    get Normal(): V3 {
        return this.plane.normal;
    }

    get Origin(): V3 {
        return this.origin;
    }

    set Origin (v: V3) {
        this.origin = new V3().copy((v as V3));
    }

    get XRay(): V3 {
        return this.xRay;
    }

    set XRay(v: V3) {
        this.xRay = new V3().copy((v as V3));
    }

    get YRay(): V3 {
        return this.yRay;
    }

    set YRay(v: V3) {
        this.yRay = new V3().copy((v as V3));
    }

    static copy(planeHp: PlaneHelper) {
        let { Normal, origin, xRay} = planeHp;
        Normal = new V3().copy(Normal);
        origin = new V3().copy(origin);
        xRay = new V3().copy(xRay);
        return  PlaneHelper.createPlane(Normal, origin, xRay);
    }


    public setOrigin(origin: XYZ) {
        this.origin = new V3().copy((origin as V3));
    }

    public convertTo2D(point: V3) {
        if (point && !point.sub) point = new V3().copy(point);
        const planeVec = point.sub(this.origin);
        const xval = planeVec.dot(this.xRay);
        const yval = planeVec.dot(this.yRay);
        return new THREE.Vector2(xval, yval);
    }

    public convertTo3D(point: XY) {
        return this.xRay.clone().multiplyScalar(point.x).add(this.yRay.clone().multiplyScalar(point.y)).add(this.origin);
    }

    public convertTo2DVec(point) {
        if (point && !point.sub) point = new V3().copy(point);
        const planeVec = point;
        const xval = planeVec.dot(this.xRay);
        const yval = planeVec.dot(this.yRay);
        return new THREE.Vector2(xval, yval);
    }

    public converTo3DVec(vec) {
        return this.xRay.clone().multiplyScalar(vec.x).add(this.yRay.clone().multiplyScalar(vec.y));
    }

    public intersectInfinityLine(line) {
        const result = new V3();
        const direction = line.delta(new V3());
        const denominator = this.plane.normal.dot(direction);
    
        if (denominator === 0) {
            // line is coplanar, return origin
            if (this.plane.distanceToPoint(line.start) === 0) {
                return result.copy(line.start);
            }
            // unsure if this is the correct method to handle this case.
            return undefined;
        }
    
        const t = -(line.start.dot(this.plane.normal) + this.plane.constant) / denominator;
    
        return result.copy(direction).multiplyScalar(t).add(line.start);
    }

    public intesectLine(line) {
        let interPnt = this.plane.intersectLine(line, new V3());
        if (!(interPnt instanceof V3)) {
            console.warn('Intersect with finity line failed. Try use Infinity.');
            interPnt = this.intersectInfinityLine(line);
            if (!(interPnt instanceof V3)) {
                throw new Error('Intersect with line error.');
            }
        }
        return interPnt;
    }

    public intersectSegment(segment) {
        return this.plane.intersectLine(segment, new V3());
    }

    public projectPoint(point, target) {
        return this.plane.projectPoint(point, target);
    }

    public applyMatrix4(mat: THREE.Matrix4) {
        this.plane.applyMatrix4(mat);
        this.xRay.applyMatrix4(mat);
        this.yRay.applyMatrix4(mat);
        return this;
    }

    public getTransMatrix() {
        let plane = PlaneHelper.copy(this);
        let xDir = new V3().copy(plane.xRay);
        let yDir = new V3().copy(plane.yRay);
        let zDir = new V3().copy(plane.Normal);
        let baseMatrix = new THREE.Matrix4().makeBasis(xDir, yDir, zDir);
        return baseMatrix;
    }

    public toMetaData() {
        return {
            origin: this.Origin,
            xray: this.XRay,
            normal: this.Normal,
        };
    }
}