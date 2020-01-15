import React, { Fragment } from 'react';
import { Spinner, Container, Row, Col, Progress } from 'reactstrap';
import { getPokemonDetails, getPokemonList, getGenerationsApplicable } from '../../../api/pokemon';
import { listGenerations } from "../../../api/generation";
import './index.css';
import TypeBox from '../../commonComponents/TypeBox';

class Pokemon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonDetails: {},
            generations: [],
            generationId: 0,
        }
    }
    componentDidMount = () => {
        getPokemonDetails(this.props.match.params.id).then((response) => {
            this.setState({
                pokemonDetails: response.data,
            }, () => {
                this.getGenerations();
            })
        })
    }

    getGenerations = () => {
        let params = {
            id: this.state.pokemonDetails.id,
            formId: this.state.pokemonDetails.formId,
        }
        getGenerationsApplicable(params).then((response) => {
            this.setState({
                generations: response.data,
            })
            this.chooseGeneration(response.data[response.data.length - 1].id)
        }).catch((error) => {
            console.log("Error while getting list of applicable generations")
        })
    }

    chooseGeneration = (generationId) => {
        let params = {
            id: this.state.pokemonDetails.id,
            generationId: generationId,
        }
        getPokemonList(params).then((response) => {
            let pokemonDetails = response.data.filter((pokemon) => {
                return pokemon.id === this.state.pokemonDetails.id && pokemon.formId === this.state.pokemonDetails.formId
            })
            this.setState({
                generationId,
                pokemonDetails: pokemonDetails[0],
            })
        })
    }

    getBar = (field) => {
        const pokemonDetails = this.state.pokemonDetails;
        if (pokemonDetails != {}) {
            return <Progress value={pokemonDetails[field] * 100 / 255} color={pokemonDetails[field] > 95 ? "success" : pokemonDetails[field] > 70 ? "warning" : "danger"}></Progress>
        } else {
            return <Progress />
        }
    }

    render() {
        const {
            pokemonDetails,
            generations,
            generationId,
        } = this.state;
        var id = 0;
        id = pokemonDetails.id > 100 ? pokemonDetails.id : pokemonDetails.id > 10 ? "0" + pokemonDetails.id : "00" + pokemonDetails.id;
        let pokemonFormName = pokemonDetails.formName ? pokemonDetails.formName.split('-') : ["", ""];
        return (
            <Fragment>
                <section className="characters-section character-one">
                    <div className="pokemon-details">
                        <Container>
                            <Row>
                                <Col xs="7">
                                    <h2>
                                        #{pokemonDetails.id} {pokemonFormName[0]} {pokemonDetails.name} {pokemonFormName[1]}
                                    </h2>
                                </Col>
                                <Col>
                                    <div className="left-header">
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
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <Container style={{ color: "white", marginTop: "10px" }}>
                        <Row>
                            <Col xs="3">
                                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`} />
                            </Col>
                            <Col>
                                <Container>
                                    <Row>
                                        <Col>
                                            <strong>Type</strong>
                                        </Col>
                                        <Col>
                                            <TypeBox type="Fire" /><TypeBox type="Flying" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <strong>Abilities</strong>
                                        </Col>
                                        <Col>
                                            Flash Fire,Solar Power
                                            </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <strong>Smogon Tier</strong>
                                        </Col>
                                        <Col>
                                            OU
                                            </Col>
                                    </Row>
                                </Container>
                            </Col>
                            <Col>
                                <Container>
                                    <Row>
                                        <Col>
                                            <p style={{ textAlign: "center" }}>
                                                Base Stats
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="2">
                                            Atk
                                        </Col>
                                        <Col>
                                            {
                                                this.getBar("attack")
                                            }
                                        </Col>
                                        <Col xs="1">
                                            {pokemonDetails.attack}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="2">
                                            Def
                                        </Col>
                                        <Col>
                                            {
                                                this.getBar("defense")
                                            }
                                        </Col>
                                        <Col xs="1">
                                            {pokemonDetails.defense}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="2">
                                            Speed
                                        </Col>
                                        <Col>
                                            {
                                                this.getBar("speed")
                                            }
                                        </Col>
                                        <Col xs="1">
                                            {pokemonDetails.speed}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="2">
                                            SpAtk
                                        </Col>
                                        <Col>
                                            {
                                                this.getBar("specialAttack")
                                            }
                                        </Col>
                                        <Col xs="1">
                                            {pokemonDetails.specialAttack}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="2">
                                            SpDef
                                        </Col>
                                        <Col>
                                            {
                                                this.getBar("specialDefense")
                                            }
                                        </Col>
                                        <Col xs="1">
                                            {pokemonDetails.specialDefense}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="2">
                                            HP
                                        </Col>
                                        <Col>
                                            {
                                                this.getBar("hp")
                                            }
                                        </Col>
                                        <Col xs="1">
                                            {pokemonDetails.hp}
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Fragment >
        )
    }
}

export default Pokemon;