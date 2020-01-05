import React from 'react';
import {getCharacterInfo} from '../../actions/actions'
import Character from '../../modules/Character'
import './style.scss'

class Home extends React.Component {
    state = {
        characters: []
    }

    componentDidMount() {
        this.getCharacters(1);
    }

    getCharacters = (page, name) => {
        getCharacterInfo(page, name).then((data)=> {
            if(data.isAxiosError) {
                this.previousPage = null;
                this.nextPage = null;
                this.setState({
                    characters: []
                })
            } else {
                this.previousPage = (data.info.prev) && (data.info.prev).split('page=')[1].split('&')[0];
                this.nextPage = (data.info.next) && (data.info.next).split('page=')[1].split('&')[0];
                this.setState({
                    characters: data.results
                })
            }
        })
    }

    searchByName = (searchChar) => {
        // for frontend search
        // let chars = this.state.characters.filter((item) => {
        //     return (item.name.toLowerCase()).indexOf(searchChar) > -1;
        // })
        // this.setState({
        //     characters: chars
        // })

        // for search through API
        this.getCharacters(1, searchChar);
    }

    getPreviousCharacters = () => {
        this.getCharacters(this.previousPage, this.inputSearch && this.inputSearch.value)
    }

    getNextCharacters = () => {
        this.getCharacters(this.nextPage, this.inputSearch && this.inputSearch.value)
    }

    sortById = (e) => {
        let list = [...this.state.characters];
        if(e.target.value === 'asc') {
            list.sort((a,b) => {return (a.id-b.id)});
        } else {
            list.sort((a,b) => {return (b.id-a.id)});
        }
        this.setState({
            characters: list
        })
    }

    render() {    
        return(
            <div className="main-container">
                <div>
                    <h1>The Rick and Morty Universe</h1>
                    <div className="home-util-bar">
                        <div>
                            <input className="input-style" type="text" ref={(el) => this.inputSearch = el}></input>
                            <button className="btn-style" onClick={()=> this.searchByName(this.inputSearch.value)}>Search</button>
                        </div>
                        <select className="btn-style" onChange={(e) => this.sortById(e)}>
                            <option value="" hidden>Sort By</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>

                <div className="home-main-container">
                   { this.state.characters.length > 0 ? (this.state.characters.map((item, key) => {
                        return <Character item={item} key={key}/>
                    })):(
                        <h2>No Characters Found!!</h2>
                    )}
                </div>

                {(this.previousPage || this.nextPage) && (<div className="home-util-bar">
                    {this.previousPage && <button className="btn-style" onClick={() => this.getPreviousCharacters()}>Previous</button>}
                    {this.nextPage && <button className="btn-style" onClick={() => this.getNextCharacters()}>Next</button>}
                </div>)}
            </div>

        )
    }
}

export default Home
