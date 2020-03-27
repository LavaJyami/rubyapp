import {
  HANDLETEXTINPUT,
  RESETWORD,
  SETERROR,
  RESETERROR
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
