import React, { Component } from 'react';
import Fuse from 'fuse.js';
import VidComponent from "./VidComponent";
import './SearchBar.css';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: '',
            result: undefined,
            new_list: undefined,
            search_list:[],
            keyword: ''
        }
    };

    componentDidMount() {
        const url = 'http://localhost:80/react-backend/index.php';
        axios.get(url)
            .then((res)=>{
                this.setState({list:res.data.video});
                console.log(res.data);
            })
            .then(()=>{
                const new_list=this.state.list.map(a=>({item:a}));
                const search_list = this.state.list.map(a=>(a.title));
                console.log(new_list);
                console.log(this.state.result);
                this.setState({new_list:new_list});
                this.setState({search_list:search_list});
            });
        console.log(this.state.search_list);
    }


    handleSearch=(e)=>{
        console.log(e.target.search.value);
        e.preventDefault();
        let options = {
            shouldSort: true,
            threshold: 0.5,
            location: 0,
            distance: 100,
            minMatchCharLength: 1,
            keys: [
                "title"
            ]
        };
        let fuse = new Fuse(this.state.list, options); // "list" is the item array
        this.setState({
            result: fuse.search(e.target.search.value),
            keyword: e.target.search.value
        });
    };


    render() {
        return (
            <div className = "searchContainer">
                <form onSubmit={this.handleSearch} autoComplete="off">
                    {/*<input name='search' type="text" placeholder = "Search..."/>*/}
                    <TextInput name='search' placeholder = "Search..." trigger={''} options={this.state.search_list} matchAny={true} Component="input"/>
                    <button></button>
                </form>
                <div className="videoArea">
                {this.state.keyword !== '' ? <VidComponent source={this.state.result}/> : <VidComponent source={this.state.new_list}/>}
                </div>
            </div>
        );
    }
}

export default Search;