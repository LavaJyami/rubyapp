import {
  HANDLETEXTINPUT,
  RESETWORD,
  SETERROR,
  RESETERROR,
  SQUARECLASSNAME
} from './types';


export function handleChange(event){

  return {
        type: HANDLETEXTINPUT,
        text: event.target.value     // action payload
     }
}

export function resetWord(){
  return {
        type: RESETWORD,
     }
}

export function resetError(){
  return {
        type: RESETERROR,
     }
}

export function setError(text){
  return {
        type: SETERROR,
        text
     }
}

export function hilightsquare(toHilight){
  let data = [];
      if(toHilight && toHilight.length>0){
          const hltArr = toHilight.map(e => {
              data.push(arrayMapHelper(e));
              });
            return {
                type: SQUARECLASSNAME,
                payload: data
            }
        }
      else {
          return {
              type: SQUARECLASSNAME,
              payload: []
          }
      }
  }

const arrayMapHelper = (e) => {
const i=e[0];
const j=e[1];
if(i===0 && j===0)
return 1;
if(i===0 && j===1)
return 2;
if(i===0 && j===2)
return 3;
if(i===0 && j===3)
return 4;
if(i===1 && j===0)
return 5;
if(i===1 && j===1)
return 6;
if(i===1 && j===2)
return 7;
if(i===1 && j===3)
return 8;
if(i===2 && j===0)
return 9;
if(i===2 && j===1)
return 10;
if(i===2 && j===2)
return 11;
if(i===2 && j===3)
return 12;
if(i===3 && j===0)
return 13;
if(i===3 && j===1)
return 14;
if(i===3 && j===2)
return 15;
if(i===3 && j===3)
return 16;
}
