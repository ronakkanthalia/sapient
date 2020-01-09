import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {fetchData} from '../../store/Action';
import {connect} from 'react-redux';
import Loader from '../Loader';

class Dashboard extends React.Component{

    state = {
        data:[],
        searchName:'',
        filterGender:[],
        filterSpecies:[],
        filterOrigin:[]
    }

    componentDidMount(){
        this.props.getData();
    }

    componentDidUpdate(prevProps){
        if(this.props.data!== undefined && prevProps.data!==this.props.data && this.props.data.length > 0){
            console.log('i ent');
            this.setState({
                data:this.props.data
            })
        }
    }

    searchByName = (e) => {
        console.log(this.state.searchName!='');
        e.preventDefault();
        if(this.state.searchName!=''){
            const filteredData = this.state.data.filter(card => card.name.toLowerCase().indexOf(this.state.searchName.toLowerCase())>-1);
            this.setState({
                data:filteredData
            });
        }else{
            this.setState({
                data:this.props.data
            });
        }
    }

    setSearchName = (e) => {
        this.setState({
            searchName:e.target.value
        });
    }

    doSort = (value) => {
        if(value!=''){
            let sortedData = [];
            if(value=='asc'){
                sortedData = this.state.data.sort( (a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) );
            }else{
                sortedData = this.state.data.sort( (a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0) );
            }
            this.setState({
                data:sortedData
            });
        }else{
            this.setState({
                data:this.props.data
            });
        }
    }   

    setFilter = (type, value) => {
        let filterGender = [...this.state.filterGender];
        let filterOrigin = [...this.state.filterOrigin];
        let filterSpecies = [...this.state.filterSpecies];
        switch(type){
            case 'species':
                filterSpecies.indexOf(value.toLowerCase()) > -1 ? filterSpecies.splice( filterSpecies.indexOf(value.toLowerCase()), 1 ) : filterSpecies.push(value.toLowerCase());
                break;
            case 'gender':
                filterGender.indexOf(value.toLowerCase()) == -1 ? filterGender.push(value.toLowerCase()) : filterGender.splice( filterGender.indexOf(value.toLowerCase()), 1 );
            break;
            case 'origin':
                filterOrigin.indexOf(value.toLowerCase()) == -1 ? filterOrigin.push(value.toLowerCase()) : filterOrigin.splice( filterGender.indexOf(value.toLowerCase()), 1 );
            break;
        }
        console.log(filterGender, filterOrigin, filterSpecies);
        if(filterGender.length>0 || filterOrigin.length>0 || filterSpecies.length >0){
            const filteredData = this.state.data.filter(card => filterGender.indexOf(card.gender.toLowerCase()) > -1 || filterOrigin.indexOf(card.origin.name.toLowerCase()) > -1 || filterSpecies.indexOf(card.species.toLowerCase()) > -1 )
            console.log(filteredData);
            this.setState({
                filterSpecies:filterSpecies,
                filterGender:filterGender,
                filterOrigin:filterOrigin,
                data:filteredData
            });
        }else{
            this.setState({
                filterSpecies:filterSpecies,
                filterGender:filterGender,
                filterOrigin:filterOrigin,
                data:this.props.data
            });
        }
        
        
        
    }

    render(){
        const data = this.state.data;
        return (
            <Container>
                {data.length > 0?
                    <Row>
                    <Col md={3} xs={12}>
                        <h3>Filters</h3>
                        <div className="border m-2 p-2">
                            <h5>Species</h5>
                            <ul className="list-group list-unstyled">
                                <li className="list-item">
                                    <input type="checkbox" className="inline" value="human" onChange={(e) => this.setFilter('species',e.target.value)}/> <label className="inline">Human</label>
                                </li>
                                <li className="list-item">
                                    <input type="checkbox" className="inline" value="alien" onChange={(e) => this.setFilter('species',e.target.value)}/> <label className="inline">Alien</label>
                                </li>
                            </ul>
                        </div>
                        <div className="border m-2 p-2">
                            <h5>Gender</h5>
                            <ul className="list-group list-unstyled">
                                <li className="list-item">
                                    <input type="checkbox" className="inline" value="male" onChange={(e) => this.setFilter('gender',e.target.value)}/> <label className="inline">Male</label>
                                </li>
                                <li className="list-item">
                                    <input type="checkbox" className="inline" value="female" onChange={(e) => this.setFilter('gender',e.target.value)}/> <label className="inline">Female</label>
                                </li>
                            </ul>
                        </div>
                        <div className="border m-2 p-2">
                            <h5>Origin</h5>
                            <ul className="list-group list-unstyled">
                                <li className="list-item">
                                    <input type="checkbox" className="inline" name=""/> <label className="inline">Unknown</label>
                                </li>
                                <li className="list-item">
                                    <input type="checkbox" className="inline" name=""/> <label className="inline">Earth</label>
                                </li>
                                <li className="list-item">
                                    <input type="checkbox" className="inline" name=""/> <label className="inline">Abadango</label>
                                </li>
                                <li className="list-item">
                                    <input type="checkbox" className="inline" name=""/> <label className="inline">Others</label>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={9} xs={12}>
                        <Row>
                            <Col md={12}>
                                {
                                    this.state.filterGender.length || this.state.filterOrigin.length || this.state.filterSpecies ?
                                    <div>
                                        <h3>Selected Filters</h3>
                                        <p>{this.state.filterGender.map(val => <button className="btn btn-primary">{val}</button>) } {this.state.filterOrigin.map(val => <button className="btn btn-primary">{val}</button>) } {this.state.filterSpecies.map(val => <button className="btn btn-primary">{val}</button>) }</p>
                                    </div>
                                    :
                                    null
                                }
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <h6>Search By Name</h6>
                                <form onSubmit={this.searchByName}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Search name" onKeyUp={this.setSearchName}/>
                                    <div className="input-group-append">
                                        <span className="input-group-append"><input type="submit" value="search" /></span>
                                    </div>
                                </div>
                                </form>
                            </Col>
                            <Col md={4}>
                                <h6> </h6>
                                <select className="form-control" onChange={(e) => this.doSort(e.target.value)}>
                                    <option value="">Sort By Name</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="grey-back">
                            {
                                data.map(card => {
                                    return (
                                        <Col md={3} xs={6} key={card.id}>
                                            <figure className="card card-product">
                                                <div className="img-wrap"><img src={card.image} /></div>
                                                <figcaption className="info-wrap">
                                                        <h4 className="title">{card.name}</h4>
                                                        <p className="desc"></p>
                                                        <div className="rating-wrap">
                                                            <div className="label-rating">Species: {card.species}</div>
                                                            <div className="label-rating">Status: {card.status} </div>
                                                        </div>
                                                </figcaption>
                                            </figure>
                                        </Col>
                                    )
                                })   
                            }
                        </Row>
                    </Col>
                </Row>
                :
                <Loader />
                }
                
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        data:state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData:()=> dispatch(fetchData())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard); 