import axios from 'axios';

export const getCharacterInfo = (page,name) => {
    return axios({
        'url' : 'https://rickandmortyapi.com/api/character/',
        'method': 'GET',
        'params': {
            page: page,
            name: name
        }
    }).then((data) => {
        return data.data;
    }, (err) => {return err})
}