import { GET_MEME } from "../actions"
const initialState={
    memes : [],

}

export default function rootReducer (state = initialState, action){
    switch(action.type){
            case GET_MEME:
                return{
                    ...state,
                    memes:action.payload.data.memes
                }
            default: return {...state}
    }
}
