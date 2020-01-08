import React, { Fragment } from 'react';
import { Spinner, Container, Row, Col } from 'reactstrap';
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

    render() {
        const {
            pokemonDetails,
            generations,
            generationId,
        } = this.state;
        var id = 0;
        console.log("pokemonDetails ", pokemonDetails)
        id = pokemonDetails.id > 100 ? pokemonDetails.id : pokemonDetails.id > 10 ? "0" + pokemonDetails.id : "00" + pokemonDetails.id;
        return (
            <Fragment>
                <section className="characters-section character-one">
                    <div className="pokemon-details">
                        <Container>
                            <Row>
                                <Col xs="7">
                                    <h1>
                                        {pokemonDetails.formName} {pokemonDetails.name}
                                    </h1>
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
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Fragment >
        )
    }
}

export default Pokemon;