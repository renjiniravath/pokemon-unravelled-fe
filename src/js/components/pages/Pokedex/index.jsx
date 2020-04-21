import React, { Fragment } from "react";
import { Table, Input, Form, FormGroup, Label, Spinner, Tooltip } from 'reactstrap';
import { getPokemonList } from "../../../api/pokemon";
import TypeBox from "../../commonComponents/TypeBox";
import { listGenerations } from "../../../api/generation";
import { Link } from 'react-router-dom';
import './index.css'
import { getTypeList } from "../../../api/type";

class Pokedex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: [],
            generations: [],
            generationId: 0,
            types: [],
            primaryTypeSelected: 0,
            secondaryTypeSelected: 0,
            nameSearchKey: "",
            idSearchKey: "",
            page: 1,
            totalPages: 1,
            loading: false,
            statTooltipOpen: false,
            statTooltipIndex: 0,
            statTooltipKey: "",
        }
    }
    componentDidMount = () => {
        this.getGenerations();
        this.getTypes();
        document.addEventListener('scroll', this.trackScrolling);
    }
    trackScrolling = () => {
        const wrappedElement = document.getElementById('tableItem');
        if (this.isBottom(wrappedElement)) {
            this.loadMore();
        }
    };
    isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    searchPokemon = () => {
        let params = {
            name: this.state.nameSearchKey,
            id: this.state.idSearchKey,
            type1: this.state.primaryTypeSelected,
            type2: this.state.secondaryTypeSelected,
            generationId: this.state.generationId,
        }
        this.setState({
            loading: false,
        })
        getPokemonList(params).then((response) => {
            this.setState({
                pokemon: response.data,
                loading: true,
                totalPages: response.noOfPages,
            })
        })
    }

    getTypes = () => {
        getTypeList().then((response) => {
            this.setState({
                types: response.data,
            })
        }).catch((error) => {
            console.log("Error while getting types list", error)
        })
    }
    getGenerations = () => {
        listGenerations().then((response) => {
            this.setState({
                generations: response.data,
            })
            this.searchValueChange("generationId", response.data[response.data.length - 1].id)
        }).catch((error) => {
            console.log("Error while getting list of generations ", error)
        })
    }

    searchValueChange = (key, value) => {
        this.setState({
            [key]: value,
        }, () => {
            this.searchPokemon()
        })
    }

    loadMore = () => {
        if (this.state.totalPages > this.state.page) {
            document.removeEventListener('scroll', this.trackScrolling)
            let params = {
                name: this.state.nameSearchKey,
                id: this.state.idSearchKey,
                type1: this.state.primaryTypeSelected,
                type2: this.state.secondaryTypeSelected,
                generationId: this.state.generationId,
                page: this.state.page + 1,
            }
            this.setState({
                loading: false,
            })
            getPokemonList(params).then((response) => {
                this.setState((prevState) => ({
                    page: prevState.page + 1,
                    totalPages: response.noOfPages,
                    pokemon: this.state.pokemon.concat(response.data),
                    loading: true,
                }))
                setTimeout(() => {
                    document.addEventListener('scroll', this.trackScrolling);
                }, 500)
            })
        }
    }

    toggleStatTooltip = (index, key) => {
        this.setState((prevState) => ({
            statTooltipOpen: !prevState.statTooltipOpen,
            statTooltipIndex: index,
            statTooltipKey: key,
        }))
    }

    render() {
        const {
            pokemon,
            generations,
            generationId,
            types,
            loading,
            statTooltipOpen,
            statTooltipIndex,
            statTooltipKey,
        } = this.state;
        return (
            <Fragment>
                <section className="page-top-section set-bg" style={{ backgroundImage: "url(https://cdn.wikimg.net/en/strategywiki/images/2/24/Pokemon_FRLG_VermilionCity.png)" }}>
                    <div className="container pokedex-heading">
                        <h2>Pokedex</h2>
                    </div>
                </section>
                <section className="characters-section character-one">
                    <div className="container-lg p-5 p-lg-0">
                        <div className="row mb-4">
                            <div className="col-md-1 col-sm-3 my-1">
                                <Label for="pokemonId">ID</Label>
                                <Input id="pokemonId" type="text" placeholder="ID" onChange={(e) => { this.searchValueChange("idSearchKey", e.target.value) }} />
                            </div>
                            <div className="col-md-3 col-sm-9 my-1">
                                <Label for="name">Name</Label>
                                <Input type="text" placeholder="Search by name" id="name" onChange={(e) => { this.searchValueChange("nameSearchKey", e.target.value) }} />
                            </div>
                            <div className="col-md-2 col-sm-6 my-1">
                                <Label for="primaryType">Type</Label>
                                <Input type="select" id="primaryType" onChange={(e) => { this.searchValueChange("primaryTypeSelected", e.target.value) }}>
                                    <option value={0}>Choose a type</option>
                                    {
                                        types && types.length > 0 &&
                                        types.map((type) => {
                                            return (
                                                <option key={type.id} value={type.id}>{type.name}</option>
                                            )
                                        })
                                    }
                                </Input>
                            </div>
                            <div className="col-md-2 col-sm-6 my-1">
                                <Label for="secondaryType">Type</Label>
                                <Input type="select" id="secondaryType" onChange={(e) => { this.searchValueChange("secondaryTypeSelected", e.target.value) }}>
                                    <option value={0}>Choose a type</option>
                                    {
                                        types && types.length > 0 &&
                                        types.map((type) => {
                                            return (
                                                <option value={type.id} key={type.id}>{type.name}</option>
                                            )
                                        })
                                    }
                                </Input>
                            </div>
                            <div className="col-md-4 generation-box mb-xs-0">
                                <p>Generation</p>
                                <p className="gen-list">
                                    {
                                        generations && generations.length > 0 &&
                                        generations.map((generation, index) => {
                                            return (
                                                <Fragment key={generation.id}>
                                                    <span>{index != 0 ? "/" : ""}</span>
                                                    <a href="" className={generationId === generation.id ? "generation-selected" : ""} onClick={(e) => { e.preventDefault(); this.searchValueChange("generationId", generation.id); }}>{generation.name}</a>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="pokemon-list mx-3 mx-lg-0" id="tableItem">
                            <div className="row mb-4 list-heading d-none d-lg-flex">
                                <div className="col-1" width="5%">ID</div>
                                <div className="col" width="20%">Pokemon</div>
                                <div className="col-2">Type</div>
                                <div className="col-1">Atk</div>
                                <div className="col-1">Def</div>
                                <div className="col-1">Spe</div>
                                <div className="col-1">Sp.Atk</div>
                                <div className="col-1">Sp.Def</div>
                                <div className="col-1">HP</div>
                            </div>
                            <div>
                                {
                                    pokemon && pokemon.length > 0 &&
                                    pokemon.map((poke, index) => {
                                        let imgSrc = "https://img.pokemondb.net/sprites/sun-moon/icon/" + poke.name.toLowerCase()
                                        if (poke.formName) {
                                            imgSrc = imgSrc + "-" + poke.formName.toLowerCase()
                                        }
                                        imgSrc = imgSrc.replace(". ", "-").replace("'", "") + ".png";
                                        let name = "";
                                        if (poke.formName) {
                                            name = poke.formName.split('-')[0] + " " + poke.name + " " + (poke.formName.split('-')[1] ? poke.formName.split('-')[1] : "");
                                        } else {
                                            name = poke.name
                                        }
                                        return (
                                            <Fragment key={index} >
                                                <div className="row mb-4 d-none d-lg-flex">
                                                    <div className="col-md-1">{poke.id}</div>
                                                    <div className="col-md-3"><Link to={`/pokemon/${poke.uniqueId}`}>{name}</Link><img src={imgSrc} width="48px" height="36px" /></div>
                                                    <div className="col-md-2">
                                                        <TypeBox type={poke.primaryType} />
                                                        <TypeBox type={poke.secondaryType} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <span href="#" id={"attack" + index}>{poke.attack}</span>
                                                        <Tooltip placement="right" isOpen={statTooltipOpen && statTooltipIndex == index && statTooltipKey == "attack"} target={"attack" + index} toggle={() => this.toggleStatTooltip(index, "attack")}>
                                                            Attack
                                                    </Tooltip>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <span href="#" id={"defense" + index}>{poke.defense}</span>
                                                        <Tooltip placement="right" isOpen={statTooltipOpen && statTooltipIndex == index && statTooltipKey == "defense"} target={"defense" + index} toggle={() => this.toggleStatTooltip(index, "defense")}>
                                                            Defense
                                                    </Tooltip>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <span href="#" id={"speed" + index}>{poke.speed}</span>
                                                        <Tooltip placement="right" isOpen={statTooltipOpen && statTooltipIndex == index && statTooltipKey == "speed"} target={"speed" + index} toggle={() => this.toggleStatTooltip(index, "speed")}>
                                                            Speed
                                                    </Tooltip>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <span href="#" id={"specialAttack" + index}>{poke.specialAttack}</span>
                                                        <Tooltip placement="right" isOpen={statTooltipOpen && statTooltipIndex == index && statTooltipKey == "specialAttack"} target={"specialAttack" + index} toggle={() => this.toggleStatTooltip(index, "specialAttack")}>
                                                            Special Attack
                                                    </Tooltip>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <span href="#" id={"specialDefense" + index}>{poke.specialDefense}</span>
                                                        <Tooltip placement="right" isOpen={statTooltipOpen && statTooltipIndex == index && statTooltipKey == "specialDefense"} target={"specialDefense" + index} toggle={() => this.toggleStatTooltip(index, "specialDefense")}>
                                                            Special Defense
                                                    </Tooltip>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <span href="#" id={"hp" + index}>{poke.hp}</span>
                                                        <Tooltip placement="right" isOpen={statTooltipOpen && statTooltipIndex == index && statTooltipKey == "hp"} target={"hp" + index} toggle={() => this.toggleStatTooltip(index, "hp")}>
                                                            HP
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                <div className="d-lg-none my-3">
                                                    <div className="d-flex flex-wrap">
                                                        <div className="py-3 mr-2 mr-sm-3">#{poke.id}</div>
                                                        <div className="py-3 mr-2 mr-sm-3" style={{ fontSize: "large" }}><Link to={`/pokemon/${poke.uniqueId}`}>{name}</Link></div>
                                                        <div className="d-flex">
                                                            <img src={imgSrc} style={{ minWidth: "80px", minHeight: "60px" }} className="mr-2 mr-sm-3" />
                                                            <div className="pt-2 text-left">
                                                                <TypeBox type={poke.primaryType} />
                                                                <TypeBox type={poke.secondaryType} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-2 col-4 text-left my-3">
                                                            <span><span className="list-heading">Attack</span> {poke.attack}</span>
                                                        </div>
                                                        <div className="col-md-2 col-4 text-left my-3">
                                                            <span><span className="list-heading">Defence</span> {poke.defense}</span>
                                                        </div>
                                                        <div className="col-md-2 col-4 text-left my-3">
                                                            <span><span className="list-heading">Speed</span> {poke.speed}</span>
                                                        </div>
                                                        <div className="col-md-2 col-4 text-left my-3">
                                                            <span><span className="list-heading">Sp. Atk</span> {poke.specialAttack}</span>
                                                        </div>
                                                        <div className="col-md-2 col-4 text-left my-3">
                                                            <span><span className="list-heading">Sp. Def</span> {poke.specialDefense}</span>
                                                        </div>
                                                        <div className="col-md-2 col-4 text-left my-3">
                                                            <span><span className="list-heading mr-4">HP</span> {poke.hp}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {
                            !loading &&
                            <div className="text-center">
                                <Spinner color="info" />
                            </div>
                        }
                        {
                            loading && pokemon.length == 0 &&
                            <div className="text-center text-white">
                                No Results
                            </div>
                        }
                    </div>
                </section>
            </Fragment >
        )
    }
}
export default Pokedex;