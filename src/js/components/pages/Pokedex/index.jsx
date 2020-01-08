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
                    <div className="container">
                        <h2>Pokedex</h2>
                    </div>
                </section>
                <section className="characters-section character-one">
                    <div className="container" >
                        <div className="row" style={{ marginBottom: "50px" }}>
                            <div className="col-2">
                                <Label for="pokemonId">ID</Label>
                                <Input id="pokemonId" type="text" placeholder="ID" onChange={(e) => { this.searchValueChange("idSearchKey", e.target.value) }} />
                            </div>
                            <div className="col">
                                <Label for="name">Name</Label>
                                <Input type="text" placeholder="Search by name" id="name" onChange={(e) => { this.searchValueChange("nameSearchKey", e.target.value) }} />
                            </div>
                            <div className="col-2">
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
                            <div className="col-2">
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
                            <div className="col">
                                <div className="left-header">
                                    <p>Generation</p>
                                    <p>
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
                        </div>
                        <Table borderless style={{ color: "white" }} id="tableItem">
                            <thead>
                                <tr>
                                    <th width="5%">ID</th>
                                    <th width="20%">Pokemon</th>
                                    <th>Type</th>
                                    <th>Atk</th>
                                    <th>Def</th>
                                    <th>Spe</th>
                                    <th>Sp.Atk</th>
                                    <th>Sp.Def</th>
                                    <th>HP</th>
                                </tr>
                            </thead>
                            <tbody>
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
                                            <tr key={index}>
                                                <th scope="row">{poke.id}</th>
                                                <td><Link to={`/pokemon/${poke.uniqueId}`}>{name}</Link><img src={imgSrc} /></td>
                                                <td>
                                                    <TypeBox type={poke.primaryType} />
                                                    <TypeBox type={poke.secondaryType} />
                                                </td>
                                                <td>
                                                    <span href="#" id={"attack" + index}>{poke.attack}</span>
                                                    <Tooltip placement="right" isOpen={statTooltipOpen && statTooltipIndex == index && statTooltipKey == "attack"} target={"attack" + index} toggle={() => this.toggleStatTooltip(index, "attack")}>
                                                        Attack
                                                    </Tooltip>
                                                </td>
                                                <td>
                                                    <span href="#" id={"defense" + index}>{poke.defense}</span>
                                                    <Tooltip placement="right" isOpen={statTooltipOpen && statTooltipIndex == index && statTooltipKey == "defense"} target={"defense" + index} toggle={() => this.toggleStatTooltip(index, "defense")}>
                                                        Defense
                                                    </Tooltip>
                                                </td>
                                                <td>
                                                    <span href="#" id={"speed" + index}>{poke.speed}</span>
                                                    <Tooltip placement="right" isOpen={statTooltipOpen && statTooltipIndex == index && statTooltipKey == "speed"} target={"speed" + index} toggle={() => this.toggleStatTooltip(index, "speed")}>
                                                        Speed
                                                    </Tooltip>
                                                </td>
                                                <td>
                                                    <span href="#" id={"specialAttack" + index}>{poke.specialAttack}</span>
                                                    <Tooltip placement="right" isOpen={statTooltipOpen && statTooltipIndex == index && statTooltipKey == "specialAttack"} target={"specialAttack" + index} toggle={() => this.toggleStatTooltip(index, "specialAttack")}>
                                                        Special Attack
                                                    </Tooltip>
                                                </td>
                                                <td>
                                                    <span href="#" id={"specialDefense" + index}>{poke.specialDefense}</span>
                                                    <Tooltip placement="right" isOpen={statTooltipOpen && statTooltipIndex == index && statTooltipKey == "specialDefense"} target={"specialDefense" + index} toggle={() => this.toggleStatTooltip(index, "specialDefense")}>
                                                        Special Defense
                                                    </Tooltip>
                                                </td>
                                                <td>
                                                    <span href="#" id={"hp" + index}>{poke.hp}</span>
                                                    <Tooltip placement="right" isOpen={statTooltipOpen && statTooltipIndex == index && statTooltipKey == "hp"} target={"hp" + index} toggle={() => this.toggleStatTooltip(index, "hp")}>
                                                        HP
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        {
                            !loading &&
                            <div style={{ textAlign: "center" }}>
                                <Spinner color="info" />
                            </div>
                        }
                    </div>
                </section>
            </Fragment >
        )
    }
}
export default Pokedex;