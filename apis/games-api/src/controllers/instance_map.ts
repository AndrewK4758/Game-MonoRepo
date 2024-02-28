// MY THOUGHT IS TO LEAVE THIS OUTSIDE OF A FUNCTION SO IT CAN NOT BE CALLED AGAIN
// OR CHANGED THROUGHOUT ITS LIFECYCLE
// const INSTANCE_MAP = new Map<number, string[]>();

// POPULATE THE MAP WITH EACH MINUTE IN THE DAY
// const MINUTES: number = 24 * 60;
// for (let i = 0; i < MINUTES; i++) {
// INSTANCE_MAP.set(i, []);
// }
// ADD ANOTHER KEY TO HOLD THE IDS FOR HOURS 24 - 48
// INSTANCE_MAP.set(2000, []);

// GET THE CURRENT MINUTE OF THE DAY
const date = new Date();
export const getCurrentMinute = (): number =>
  date.getHours() * 60 + date.getMinutes();

// let minute = getCurrentMinute();

// TAKES CLEANS UP THE INSTANCE MAP MINUTE BY MINUTE ON AN HOUR INTERVAL
/*
const reaper = () => {
  let idArrToMove = INSTANCE_MAP.get(minute);
  INSTANCE_MAP.get(2000).push(...idArrToMove);
  idArrToMove = [];
  if (minute === MINUTES) {
    let yesterday = INSTANCE_MAP.get(2000);
    yesterday = [];
    minute === 0;
  } else minute++;
};

// STARTS THE CLEANUP TIMEOUT AND INTERVAL
const startReaper = () => {
  setTimeout(reaper, 24 * 60 * 60 * 1000);
  setInterval(reaper, 1000 * 60);
};
*/

// const INSTANCE_MAP_OBJECT = () => {
//   return {
//     minutes: 24 * 60,
//     instanceMap: new Map<number, string[]>(),
//     buildInstanceMap: function () {
//       for (let i = 0; i < this.minutes; i++) {
//         this.instanceMap.set(i, []);
//       }
//       this.instanceMap.set(2000, []);
//     },
//     addGameInstance: function (minute: number, gameID: string) {
//       this.instanceMap.get(minute).push(gameID);
//     },
//     reaper: function (minute: number) {
//       let idArrToMove: string[] = this.instanceMap.get(minute);
//       this.instanceMap.get(2000).push(...idArrToMove);
//       idArrToMove = [];
//       if (minute >= this.minutes) {
//         let yesterday = this.instanceMap.get(2000);
//         yesterday = [];
//         minute === 0;
//       } else minute++;
//     },
//   };
// };

export interface IInstanceMap {
  instanceMap: Map<number, string[]>;
  addGameInstance(minute: number, gameID: string): void;
  reaper(minute: number): void;
}

export class InstanceMap implements IInstanceMap {
  instanceMap: Map<number, string[]>;
  constructor() {
    this.instanceMap = new Map<number, string[]>();
    for (let i = 0; i < 24 * 60; i++) {
      this.instanceMap.set(i, []);
    }
    this.instanceMap.set(2000, []);
  }

  addGameInstance(minute: number, gameID: string): void {
    this.instanceMap.get(minute).push(gameID);
  }

  reaper(minute: number) {
    let idArrToMove: string[] = this.instanceMap.get(minute);
    this.instanceMap.get(2000).push(...idArrToMove);
    idArrToMove = [];
    if (minute >= 24 * 60) {
      let yesterday = this.instanceMap.get(2000);
      yesterday = [];
      minute === 0;
    } else minute++;
  }
}

// const InstanceMap = INSTANCE_MAP_OBJECT();
// InstanceMap.buildInstanceMap();

// console.log(InstanceMap.instanceMap)
