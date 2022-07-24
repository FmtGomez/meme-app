import axios from "axios";
export const GET_MEME = "GET_MEME";

export function getMeme (){
    return function(dispatch){
        axios.get("https://api.imgflip.com/get_memes")
        .then(response =>{
            return dispatch({
                type: GET_MEME,
                payload: response.data
            })
        })
    }
}

