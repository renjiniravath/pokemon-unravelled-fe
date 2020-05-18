import React, { Fragment } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Container, Row, Col, Progress } from 'reactstrap';
import { getPokemonDetails, getPokemonList, getGenerationsApplicable } from '../../../api/pokemon';
import { listGenerations } from "../../../api/generation";
import './index.css';
import TypeBox from '../../commonComponents/TypeBox';

class Pokemon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonDetails: [{
                uniqueId: 0,
                name: "",
                formName: "",
            }],
            generations: [],
            generationId: 0,
            activeTab: 1,
            prevPokemon: {},
            nextPokemon: {},
        }
    }
    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.getDetails();
    }

    getDetails = (generationId) => {
        getGenerationsApplicable(this.props.match.params.id).then((response) => {
            this.setState({
                generations: response.data,
            })
            this.chooseGeneration(generationId || response.data[response.data.length - 1].id)
        }).catch((error) => {
            console.log("Error while getting list of applicable generations")
        })
    }

    chooseGeneration = (generationId) => {
        getPokemonDetails(this.props.match.params.id, generationId).then((response) => {
            this.setState({
                generationId,
                pokemonDetails: response.data,
                prevPokemon: response.prevPokemon,
                nextPokemon: response.nextPokemon,
            })
        })
    }

    navigateToPokemon = (id) => {
        this.props.history.push(`/pokemon/${id}`);
        this.getDetails(this.state.generationId);
    }

    getBar = (value) => {
        return (
            <div className="col">
                <Progress value={90} color={value > 95 ? "success" : value > 70 ? "warning" : "danger"}></Progress>
            </div>
        )
    }

    toggleForm = (activeTab) => {
        this.setState({
            activeTab,
        })
    }

    showFormDetails = (pokemon) => {
        const imageSrc = `/media/pokemon/sprites/${pokemon.formName.toLowerCase()}.gif`;
        return (
            <div className="d-flex flex-wrap justify-content-center">
                <div>
                    <img src={imageSrc} alt={pokemon.formName} width="160px" height="160px" />
                </div>
                <div className="ml-md-4 info-box py-3 py-md-0">
                    <div className="w-100 ml-3">
                        <div className="row">
                            <strong className="col-6">National Dex</strong>
                            <div className="col-6">{`${('000' + pokemon.id).substr(-3)}`}</div>
                        </div>
                        <div className="row">
                            <strong className="col-6">Type</strong>
                            <div className="d-flex col-6 text-white">
                                <TypeBox type={pokemon.primaryType} /><TypeBox type={pokemon.secondaryType} />
                            </div>
                        </div>
                        <div className="row">
                            <strong className="col-6">Abilities</strong>
                            <div className="col-6">
                                <div>Flash Fire</div>
                                <div className="text-info">Solar Power</div>
                            </div>
                        </div>
                        <div className="row">
                            <strong className="col-6">Smogon Tier</strong>
                            <div className="col-6">
                                OU
                        </div>
                        </div>
                    </div>
                </div>
                <div className="ml-md-4 info-box py-3 py-md-0 w-100 w-md-75">
                    <div className="w-100 ml-3">
                        <div className="text-center">
                            Base Stats
                        </div>
                        <div className="row">
                            <div className="col-4 d-none d-md-block">
                                Attack
                            </div>
                            <div className="d-md-none col-2">
                                Atk
                            </div>
                            {
                                this.getBar(pokemon.attack)
                            }
                            <div className="col">
                                {pokemon.attack}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 d-none d-md-block">
                                Defense
                            </div>
                            <div className="d-md-none col-2">
                                Def
                            </div>
                            {
                                this.getBar(pokemon.defense)
                            }
                            <div className="col">
                                {pokemon.defense}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 d-none d-md-block">
                                Speed
                            </div>
                            <div className="d-md-none col-2">
                                Spe
                            </div>
                            {
                                this.getBar(pokemon.speed)
                            }
                            <div className="col">
                                {pokemon.speed}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 d-none d-md-block">
                                Special Attack
                            </div>
                            <div className="d-md-none col-2">
                                SpA
                            </div>
                            {
                                this.getBar(pokemon.specialAttack)
                            }
                            <div className="col">
                                {pokemon.specialAttack}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 d-none d-md-block">
                                Special Defense
                            </div>
                            <div className="d-md-none col-2">
                                SpD
                            </div>
                            {
                                this.getBar(pokemon.specialDefense)
                            }
                            <div className="col">
                                {pokemon.specialDefense}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 d-none d-md-block">
                                HP
                            </div>
                            <div className="d-md-none col-2">
                                HP
                            </div>
                            {
                                this.getBar(pokemon.hp)
                            }
                            <div className="col">
                                {pokemon.hp}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    render() {
        const {
            pokemonDetails,
            generations,
            generationId,
            prevPokemon,
            nextPokemon,
        } = this.state;
        return (
            <section className="characters-section character-one pokemon-container white-mode">
                <div className="container pt-4 pt-sm-0">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center" onClick={() => this.navigateToPokemon(prevPokemon.id)}>
                            <img src="/media/icons/arrow.png" width="30px" height="30px" className="rotate-180"></img>
                            <p className="mb-0 arrow-icon-text">{`${('000' + prevPokemon.id).substr(-3)} ${prevPokemon.name}`}</p>
                        </div>
                        <div className="d-flex align-items-center" onClick={() => this.navigateToPokemon(nextPokemon.id)}>
                            <p className="mb-0 arrow-icon-text text-right">{`${('000' + nextPokemon.id).substr(-3)} ${nextPokemon.name}`}</p>
                            <img src="/media/icons/arrow.png" width="30px" height="30px"></img>
                        </div>
                    </div>
                    <h2 className="text-center mt-3">{pokemonDetails[0].name}</h2>
                    <div className="left-header mt-2">
                        <p>Generation</p>
                        <p>
                            {
                                generations && generations.length > 0 &&
                                generations.map((generation, index) => {
                                    return (
                                        <Fragment key={generation.id}>
                                            <span>{index != 0 ? "/" : ""}</span>
                                            <a href="" className={generationId === generation.id ? "generation-selected" : ""} onClick={(e) => { e.preventDefault(); this.chooseGeneration(generation.id); }}>{generation.name}</a>
                                        </Fragment>
                                    )
                                })
                            }
                        </p>
                    </div>
                </div>

                <Container style={{ marginTop: "10px" }}>
                    <Nav tabs className="nav-heading flex-nowrap">
                        {
                            pokemonDetails.length > 1 &&
                            pokemonDetails.map((pokemon, index) => {
                                return (
                                    <NavItem key={pokemon.uniqueId}>
                                        <NavLink
                                            className={this.state.activeTab === index + 1 ? "active-tab bg-transparent text-primary" : "bg-transparent"}
                                            onClick={() => { this.toggleForm(index + 1); }}
                                        >
                                            {pokemon.formName}
                                        </NavLink>
                                    </NavItem>
                                )
                            })
                        }
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="mt-4">
                        {
                            pokemonDetails.length > 0 &&
                            pokemonDetails.map((pokemon, index) => {
                                return (
                                    <TabPane tabId={index + 1} key={pokemon.uniqueId}>
                                        {
                                            this.showFormDetails(pokemon)
                                        }
                                    </TabPane>
                                )
                            })
                        }
                    </TabContent>

                </Container>
            </section>
        )
    }
}

export default Pokemon;