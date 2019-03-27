This module is helperful to deal with 3d/2d coordinated system switch in threejs

## Installation

    npm install planehelper 
    or
    yarn add planehelper
    

## Quick Used

```
import { PlaneHelper } from 'planhelper';

const planeHp = PlaneHelper.createPlane(normal, origin, xRay)

planeHp.converTo2D(...)
planeHp.converTo3D(...)

```

## API
```
createPlane
convertTo2D
convertTo3D
convertTo2DVec
converTo3DVec
intersectInfinityLine
intesectLine
intersectSegment
projectPoint
applyMatrix4
copy
getTransMatrix
toMetaData
loadMetaData
```
