

// type checkPointType = [x: number, y: number, distanceToCheckpoint: number] | null;
// type pointType = [x: number, y: number] | null;
// type vectorType = { origin: pointType, direction: pointType } | null;

// class Utilities {

//     public static arrayEqual<T>(a: T[] | null | undefined, b: T[] | null | undefined): boolean {
//         if (a == null || b == null) {
//             return false;
//         }
//         if (a.length !== b.length) {
//             return false;
//         }

//         if (a.every((value, index) => value === b[index])) {
//             return true;
//         }

//         return false;
//     }
// }

// class System {
//     private static lastPlayerPosition: pointType = null;
//     private static readonly xMax = 15999;
//     private static readonly yMax = 8999;
//     private static lastCheckpoint: checkPointType = null;
//     private static boosted = false;
//     private static checkPoints: checkPointType[] = [];
//     private static lapped: boolean = false;
//     private static largestCheckpointIndex: number | null = null;

//     ////////////////////////////////////////////////////////////
//     // arcos  R(-1,1) => R(0, pi)[Radians] R(0, 180)[degrees)]
//     // vectors are normalized to origin = [0,0]
//     // returns degrees
//     private static findAngleBetweenVectors(normalizedVectorA: vectorType, normalizedVectorB: vectorType): number {
//         // α = arccos[(a · b) / (|a| * |b|)]   arccos(dot product / product of magnitudes)

//         if (normalizedVectorA?.direction == null || normalizedVectorB?.direction == null
//             || normalizedVectorA?.origin == null || normalizedVectorB?.origin == null) {
//             throw (`findAngleBetweenVectors: vector  null:  normalizedVectorA = ${normalizedVectorA} normalizedVectorB = ${normalizedVectorB}`)

//         }

//         if (normalizedVectorA.origin !== [0, 0] || normalizedVectorB.origin !== [0, 0]) {
//             throw (`findAngleBetweenVectors: vectors not normalized: orgins have to be [0,0]:  normalizedVectorA.origin = ${normalizedVectorA.origin} normalizedVectorB.origin = ${normalizedVectorB.origin}`)
//         }


//         let resultRadians = Math.acos(
//             this.dotProductVectors(normalizedVectorA, normalizedVectorB) / this.productMagnitudesVectors(normalizedVectorA, normalizedVectorB)
//         );

//         // convert to degrees
//         let resultDegrees = resultRadians * 180 / Math.PI;

//         return resultDegrees;
//     }


//     /////////////////////////
//     // vectors are normalized to origin = [0,0]
//     private static dotProductVectors(normalizedVectorA: vectorType, normalizedVectorB: vectorType): number {

//         if (normalizedVectorA?.direction == null || normalizedVectorB?.direction == null
//             || normalizedVectorA?.origin == null || normalizedVectorB?.origin == null) {
//             throw (`dotProductVectors: vector  null:  normalizedVectorA = ${normalizedVectorA} normalizedVectorB = ${normalizedVectorB}`)

//         }

//         if (normalizedVectorA.origin !== [0, 0] || normalizedVectorB.origin !== [0, 0]) {
//             throw (`dotProductVectors: vectors not normalized: orgins have to be [0,0]:  normalizedVectorA.origin = ${normalizedVectorA.origin} normalizedVectorB.origin = ${normalizedVectorB.origin}`)
//         }


//         return normalizedVectorA.direction[0] * normalizedVectorB.direction[0] + normalizedVectorA.direction[1] * normalizedVectorB.direction[1];
//     }

//     private static productMagnitudesVectors(normalizedVectorA: vectorType, normalizedVectorB: vectorType): number {

//         if (normalizedVectorA?.direction == null || normalizedVectorB?.direction == null
//             || normalizedVectorA?.origin == null || normalizedVectorB?.origin == null) {
//             throw (`productMagnitudesVectors: vector  null:  normalizedVectorA = ${normalizedVectorA} normalizedVectorB = ${normalizedVectorB}`)

//         }

//         if (normalizedVectorA.origin !== [0, 0] || normalizedVectorB.origin !== [0, 0]) {
//             throw (`productMagnitudesVectors: vectors not normalized: orgins have to be [0,0]:  normalizedVectorA.origin = ${normalizedVectorA.origin} normalizedVectorB.origin = ${normalizedVectorB.origin}`)
//         }



//         let lengthA = Math.sqrt(Math.pow(normalizedVectorA.direction[0], 2) + Math.pow(normalizedVectorA.direction[1], 2));
//         let lengthB = Math.sqrt(Math.pow(normalizedVectorB.direction[0], 2) + Math.pow(normalizedVectorB.direction[1], 2));

//         return lengthA * lengthB;
//     }

//     private static normalizeVectorToOrigin(vector: vectorType): vectorType {

//         if (vector?.origin?.[0] == null || vector?.origin?.[1] == null || vector?.direction?.[0] == null || vector?.direction?.[1] == null) {
//             throw (`normalizeVectorToOrigin: vector can't be null or have nulls. vector = ${vector}`)
//         }

//         if (vector == null) {
//             throw (`normalizeVectorToOrigin: vector can't be null.`)
//         }

//         let vectorNormalized: vectorType = {
//             origin: [0, 0], direction: [vector.direction[0] - vector.origin[0], vector.direction[1] - vector.origin[1]]
//         };

//         return vectorNormalized;

//     }



//     ///////////////////////////////
//     public static calculateVelocityVectorToCheckPointVectoreAngle(velocityVector: vectorType, checkPointVector: vectorType): number {

//         if (velocityVector == null) {
//             throw (`calculateVelocityVectorToCheckPointVectoreAngle: velocityVector can't be null.`)
//         }
//         if (checkPointVector == null) {
//             throw (`calculateVelocityVectorToCheckPointVectoreAngle: checkPointVector can't be null.`)
//         }

//         // Normalize to (0,0)
//         let velocityVectorNormalized = this.normalizeVectorToOrigin(velocityVector);
//         let checkPointVectorNormalized = this.normalizeVectorToOrigin(checkPointVector);

//         let angleBetween = this.findAngleBetweenVectors(velocityVectorNormalized, checkPointVectorNormalized);

//         console.error(`calculateVelocityVectorToCheckPointVectoreAngle: angleBetween = ${angleBetween}`);

//         return angleBetween;

//     }


//     /////////////////////////////////////
//     public static calculateCheckPointVector(currentPlayerPosition: pointType, currentCheckpoint: checkPointType): vectorType {
//         if (currentPlayerPosition == null) {
//             throw (`calculateCheckPointVector: currentPlayerPosition can't be null.`)
//         }
//         if (currentCheckpoint == null) {
//             throw (`calculateCheckPointVector: currentCheckpoint can't be null.`)
//         }


//         let checkPointVector: vectorType = { origin: currentPlayerPosition, direction: [currentCheckpoint[0], currentCheckpoint[1]] };

//         console.error(`calculateCheckPointVector: checkPointVector = ${checkPointVector}`);

//         return checkPointVector;

//     }


//     //////////////////////////
//     public static calculateVelocityVector(currentPlayerPosition: pointType): vectorType {

//         if (currentPlayerPosition == null) {
//             throw (`calculateVelocityVector: currentPlayerPosition can't be null.`)
//         }

//         if (this.lastPlayerPosition == null) {
//             // first time through so set it and return null
//             this.lastPlayerPosition = Object.assign([], currentPlayerPosition);
//             return null;
//         }

//         // otherwise we have a verlocity vector so compute it
//         let velocityVector: vectorType = { origin: this.lastPlayerPosition, direction: currentPlayerPosition };

//         console.error(`calculateVelocityVector: velocityVector = ${velocityVector}`);

//         return velocityVector;


//     }

//     /////////////////////////////////
//     private static rotateVector(
//         origin: pointType,
//         target: pointType,
//         angleToRotate: number //In degrees.  Positive is clockwise but our map y is flipped.  hmmmm
//     ): pointType {

//         console.error(`rotateVector: origin: ${origin} target ${target} angleToRotate ${angleToRotate}`);

//         if (origin == null || target == null) {
//             return null;
//         }

//         // translate to normal
//         let newTarget: pointType = [target[0] - origin[0], target[1] - origin[1]];

//         console.error(`rotateVector: Translate to 0,0: newTarget ${newTarget}`);

//         newTarget[0] =
//             newTarget[0] * Math.cos((angleToRotate * Math.PI) / 180) -
//             newTarget[1] * Math.sin((angleToRotate * Math.PI) / 180);

//         newTarget[1] =
//             newTarget[1] * Math.cos((angleToRotate * Math.PI) / 180) +
//             newTarget[0] * Math.sin((angleToRotate * Math.PI) / 180);

//         console.error(`rotateVector: Rotated: : newTarget ${newTarget}`);

//         // translate back to origin
//         newTarget = [Math.floor(newTarget[0] + origin[0]), Math.floor(newTarget[1] + origin[1])];

//         console.error(`rotateVector: Translated Back: origin: ${origin} newTarget ${newTarget}`);


//         return newTarget;
//     }

//     ///////////////////////////
//     private static insideArena(target: pointType): boolean {
//         if (target == null) {
//             return true;
//         }
//         return ((target[0] >= 0 && target[0] <= this.xMax) && (target[1] >= 1 && target[1] <= this.yMax));
//     }

//     /////////////////////////////
//     private static findMidPoint(
//         origin: pointType,
//         target: pointType
//     ): pointType {

//         if (target == null || origin == null) {
//             return null;
//         }
//         target = [Math.floor((origin[0] + target[0]) / 2), Math.floor((origin[1] + target[1]) / 2)];

//         return target;
//     }

//     //////////////////////
//     public static calculateNavigationTarget(
//         playerPosition: pointType,
//         currentCheckpoint: checkPointType,
//         checkpointAngle: number
//     ): pointType {

//         if (currentCheckpoint == null) {
//             return null;
//         }
//         let currentTarget: pointType = [currentCheckpoint[0], currentCheckpoint[1]];
//         // tolerance
//         if (Math.abs(checkpointAngle) === 0 || Math.abs(checkpointAngle) >= 70) {
//             console.error(`calculateNavigationTarget: Angle within Tolerance or > 70 degrees: No Oversteer`);

//             return currentTarget;
//         }

//         let modifiedAngle = checkpointAngle * 1;
//         if (modifiedAngle > 70) {
//             modifiedAngle = 70;
//         }
//         else if (modifiedAngle < -70) {
//             modifiedAngle = -70
//         }

//         let newTarget = this.rotateVector(
//             playerPosition,
//             currentTarget,
//             modifiedAngle
//         );

//         console.error(`calculateNavigationTarget: Target Vector Rotated: ${checkpointAngle} degrees to ${newTarget}`);


//         while (!this.insideArena(newTarget)) {
//             console.error(`calculateNavigationTarget: Target Vector Not In Arena Bounds: Finding midpoint`);
//             newTarget = this.findMidPoint(playerPosition, newTarget);
//             console.error(`calculateNavigationTarget: Midpoint = ${newTarget}`);

//         }

//         console.error(`calculateNavigationTarget: New Target = ${newTarget}`);

//         return newTarget;
//     }

//     ////////////////////////////////
//     public static checkPointChanged(currentCheckpoint: checkPointType): boolean {


//         if (currentCheckpoint == null) {
//             return false;
//         }

//         // check if changed and not null start

//         console.error(
//             `lastCheckpoint = ${this.lastCheckpoint} currentCheckpoint = ${currentCheckpoint}`
//         );

//         if (this.lastCheckpoint == null) {
//             //if (Utilities.arrayEqual(this.lastCheckpoint, [0, 0, 0])) {
//             // tuple equality not workign as expected.

//             //first iteration no change flag
//             this.lastCheckpoint = Object.assign([], currentCheckpoint);
//             return false;
//         } else if (
//             !Utilities.arrayEqual(
//                 currentCheckpoint.slice(0, 1),
//                 this.lastCheckpoint.slice(0, 1)
//             )
//         ) {
//             //changed
//             this.lastCheckpoint = Object.assign([], currentCheckpoint);
//             return true;
//         } else {
//             return false;
//         }
//     }

//     ////////////////////////////////
//     public static checkPointSeen(
//         currentCheckpoint: checkPointType,
//         checkPointChanged: boolean
//     ): boolean {
//         if (currentCheckpoint == null) {
//             return false;
//         }

//         // if we have lapped then we've seen it
//         if (this.lapped) {
//             return true;
//         }

//         let seen = this.checkPoints?.some((checkPoint) => {

//             return Utilities.arrayEqual(
//                 checkPoint?.slice(0, 1),
//                 currentCheckpoint.slice(0, 1)
//             );
//         });

//         return seen;
//     }

//     ////////////////////////////////
//     public static shouldWeBoost(
//         checkPoint: checkPointType,
//         checkpointAngle: number
//     ): boolean {
//         // !boosted
//         // angle is stable
//         // on longest leg ( that we know this means we have lapped)

//         if (checkPoint == null) {
//             console.error(`shouldWeBoost: checkPoint Null or Undefined`);
//             return false;
//         }

//         if (this.boosted) {
//             console.error(`shouldWeBoost: Already Boosted`);
//             return false;
//         }

//         if (!this.lapped) {
//             console.error(`shouldWeBoost: Not Lapped`);
//             return false;
//         }

//         if (!this.onLongestLeg(checkPoint)) {
//             console.error(`shouldWeBoost: Not On Longest Leg`);
//             return false;
//         }

//         if (!this.angleStableForBoost(checkpointAngle)) {
//             console.error(`shouldWeBoost: Angle Unstable`);
//             return false;
//         }

//         if (checkPoint[2] <= 6000) {
//             console.error(`shouldWeBoost: Checkpoint too close`);
//             return false;
//         }



//         return true;
//     }

//     ////////////////////////////
//     public static angleStableForBoost(checkpointAngle: number): boolean {
//         return checkpointAngle === 0;
//     }

//     /////////////////////////////////
//     public static onLongestLeg(checkPoint: checkPointType): boolean {
//         if (checkPoint == null) {
//             return false;
//         }
//         if (this.largestCheckpointIndex == null) {
//             return false;
//         }

//         if (
//             Utilities.arrayEqual(
//                 checkPoint.slice(0, 1),
//                 this.checkPoints[this.largestCheckpointIndex]?.slice(0, 1)
//             )
//         ) {
//             return true;
//         }

//         return false;
//     }

//     //////////////////////////////
//     // given the current params have we just now lapped?
//     public static haveWeJustLapped(
//         checkPointChanged: boolean,
//         checkpointSeen: boolean
//     ): boolean {
//         // if we've seen it and the cp just changed then we have  just lapped if we haven't lapped yet
//         if (checkPointChanged && checkpointSeen && !this.lapped) {
//             this.lapped = true;
//             return true;
//         }

//         return false;
//     }

//     ////////////////////////////////////////
//     public static executeShipNavigationCommand(
//         checkpointAngle: number,
//         boost: boolean,
//         target: pointType,
//         checkPoint: checkPointType,
//         thrust: number
//     ): void {
//         if (boost && this.shouldWeBoost(checkPoint, checkpointAngle)) {
//             // boost
//             console.log(`${target?.[0]}  ${target?.[1]}  BOOST`);
//             this.boosted = true;
//         } else {
//             // no boost thrust
//             console.log(`${target?.[0]}  ${target?.[1]}  ${thrust}`);
//         }
//     }

//     //////////////////////////////////////
//     public static calculateThrust(
//         checkpointAngle: number,
//         distanceToCheckpoint: number
//     ): number {

//         return 100;
//         let thrust: number = 0;

//         if (checkpointAngle >= 170 || checkpointAngle <= -170) {
//             thrust = 20;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = 0;
//             }
//         } else if (checkpointAngle >= 160 || checkpointAngle <= -160) {
//             thrust = 20;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = 0;
//             }
//         } else if (checkpointAngle >= 150 || checkpointAngle <= -150) {
//             thrust = 20;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = 0;
//             }
//         } else if (checkpointAngle >= 140 || checkpointAngle <= -140) {
//             thrust = 20;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = 0;
//             }
//         } else if (checkpointAngle >= 130 || checkpointAngle <= -130) {
//             thrust = 20;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = 0;
//             }
//         } else if (checkpointAngle >= 120 || checkpointAngle <= -120) {
//             thrust = 20;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = 0;
//             }
//         } else if (checkpointAngle >= 110 || checkpointAngle <= -110) {
//             thrust = 20;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = 0;
//             }
//         } else if (checkpointAngle >= 100 || checkpointAngle <= -100) {
//             thrust = 20;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = 0;
//             }
//         } else if (checkpointAngle >= 90 || checkpointAngle <= -90) {
//             thrust = 20;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = 0;
//             }
//         } else if (checkpointAngle >= 80 || checkpointAngle <= -80) {
//             thrust = 50;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = thrust / 4;
//             }
//         } else if (checkpointAngle >= 70 || checkpointAngle <= -70) {
//             thrust = 70;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = thrust / 4;
//             }
//         } else if (checkpointAngle >= 60 || checkpointAngle <= -60) {
//             thrust = 80;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = thrust / 4;
//             }
//         } else if (checkpointAngle >= 50 || checkpointAngle <= -50) {
//             thrust = 80;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = thrust / 2;
//             }
//         } else if (checkpointAngle >= 40 || checkpointAngle <= -40) {
//             thrust = 80;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = thrust / 2;
//             }
//         } else if (checkpointAngle >= 30 || checkpointAngle <= -30) {
//             thrust = 80;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = thrust / 2;
//             }
//         } else if (checkpointAngle >= 20 || checkpointAngle <= -20) {
//             thrust = 100;
//             if (distanceToCheckpoint <= 3000) {
//                 thrust = thrust / 2;
//             }
//         } else if (checkpointAngle >= 10 || checkpointAngle <= -10) {
//             thrust = 100;
//             if (distanceToCheckpoint <= 2500) {
//                 thrust = thrust / 2;
//             }
//         }
//         else if (checkpointAngle >= 5 || checkpointAngle <= -5) {
//             thrust = 100;
//             if (distanceToCheckpoint <= 2000) {
//                 thrust = thrust / 2;
//             }
//         } else {
//             thrust = 100;

//         }



//         return thrust;
//     }

//     ////////////////////////////////////////
//     public static outputErrorParams(
//         checkpointAngle: number,
//         checkpointDist: number,
//         changed: boolean,
//         checkpointSeen: boolean
//     ) {
//         console.error(
//             `Boosted = ${this.boosted} nextCheckpointAngle = ${checkpointAngle}`
//         );

//         console.error(
//             `nextCheckpointDist ${checkpointDist} changed = ${changed} lapped = ${this.lapped}`
//         );

//         console.error(`checkpointSeen = ${checkpointSeen}`);

//         console.error(`Largest Leg Index = ${this.largestCheckpointIndex}`);
//     }

//     ////////////////////////////////////////
//     public static calculateLargestDistance(checkPointChanged: boolean) {
//         if (this.largestCheckpointIndex !== null) {
//             //console.error(`calculateLargestDistance: Already Calced`);
//             // have to check this way since 0 is falsey
//             return;
//         } else {
//             // determine the largest distance checkpoint if lapped, changed and not calculated yet.
//             if (this.lapped && checkPointChanged) {
//                 console.error(`calculateLargestDistance: Not Calced`);
//                 this.checkPoints.sort((a, b) => (a?.[2] ?? 0) - (b?.[2] ?? 0)); // sort ascending

//                 //console.error(`calculateLargestDistance: Sorted=${this.checkPoints}`);

//                 // now max is in index(length -1).
//                 this.largestCheckpointIndex = this.checkPoints.length - 1;

//                 //console.error(`calculateLargestDistance: largestCheckpointIndex=${this.largestCheckpointIndex}`);
//             }
//         }
//     }

//     ///////////////////////////////////////////////////////
//     public static storeCheckPoint(
//         checkpointSeen: boolean,
//         checkPointChanged: boolean,
//         checkpoint: [x: number, y: number, distanceToCheckpoint: number]
//     ) {
//         // don't store if hasn't changed yet. this will eliminate the out of cycle issues
//         // don't store if it has been seen.
//         // if not seen and just changed.
//         // should ensure we see the largest distance to next

//         // if we have lapped then we've seen it.
//         if (this.lapped) {
//             return;
//         }

//         if (!checkPointChanged) {
//             return;
//         }
//         if (checkpointSeen) {
//             return;
//         }

//         // store it
//         this.checkPoints.push(checkpoint);

//         return;
//     }
// } //  class

// /////////////////////////////////////////////
// // game loop
// while (true) {
//     var inputs: string[] = readline().split(' ');
//     const x: number = parseInt(inputs[0]);
//     const y: number = parseInt(inputs[1]);
//     const nextCheckpointX: number = parseInt(inputs[2]); // x position of the next check point
//     const nextCheckpointY: number = parseInt(inputs[3]); // y position of the next check point
//     const nextCheckpointDist: number = parseInt(inputs[4]); // distance to the next checkpoint
//     const nextCheckpointAngle: number = parseInt(inputs[5]); // angle between your pod orientation and the direction of the next checkpoint
//     var inputs: string[] = readline().split(' ');
//     const opponentX: number = parseInt(inputs[0]);
//     const opponentY: number = parseInt(inputs[1]);

//     // translate into better object types.
//     let currentCheckpoint: checkPointType = [
//         nextCheckpointX,
//         nextCheckpointY,
//         nextCheckpointDist,
//     ];
//     let currentPlayerPosition: pointType = [x, y];
//     let currentOpponentPosition: pointType = [opponentX, opponentY];

//     ///////////////////
//     // ask the system questions
//     let checkPointChanged = System.checkPointChanged(currentCheckpoint);

//     let checkpointSeen = System.checkPointSeen(
//         currentCheckpoint,
//         checkPointChanged
//     );

//     // if we've seen it and we just changed then we have lapped.

//     if (System.haveWeJustLapped(checkPointChanged, checkpointSeen)) {
//         // should calc the largest distance now
//         // but only when we just lapped and only once.
//         System.calculateLargestDistance(checkPointChanged);
//     }

//     // if checkpoint changed and we haven't seen it yet, then store it.
//     if (checkPointChanged && !checkpointSeen) {
//         System.storeCheckPoint(
//             checkpointSeen,
//             checkPointChanged,
//             currentCheckpoint
//         );
//     }






//     // determine navigation target //////////
//     let velocityVector: vectorType = System.calculateVelocityVector(currentPlayerPosition);
//     let checkPointVector: vectorType = System.calculateCheckPointVector(currentPlayerPosition, currentCheckpoint);

//     let navigationTargetAngle: number | null = null;

//     if (velocityVector == null) {
//         navigationTargetAngle = nextCheckpointAngle;
//     }
//     else {
//         navigationTargetAngle = System.calculateVelocityVectorToCheckPointVectoreAngle(velocityVector, checkPointVector);
//     }

//     let navigationTarget = System.calculateNavigationTarget(currentPlayerPosition, currentCheckpoint, navigationTargetAngle);
//     ///////////////

//     // engine throttle
//     let thrust = 0;
//     let boost = System.shouldWeBoost(currentCheckpoint, navigationTargetAngle);
//     if (!boost) {
//         thrust = System.calculateThrust(navigationTargetAngle, nextCheckpointDist);
//     }


//     console.error(`New Target = ${navigationTarget}`);

//     System.executeShipNavigationCommand(
//         nextCheckpointAngle,
//         boost,
//         navigationTarget,
//         currentCheckpoint,
//         thrust
//     );

//     System.outputErrorParams(
//         nextCheckpointAngle,
//         nextCheckpointDist,
//         checkPointChanged,
//         checkpointSeen
//     );
// }
