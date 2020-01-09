import axios from 'axios';

export function fetchData() {
    return(dispatch) => {
        const URL = 'https://rickandmortyapi.com/api/character/';
        axios.get(URL)
        .then((response) => {
            console.log(response);
            dispatch(
                {
                    type:'SET_DATA', 
                    data:response.data.results
                }
            )
        })
        .catch((response) => {console.log(response)});
    };
}