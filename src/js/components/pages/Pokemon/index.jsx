import React, { Fragment } from 'react';
import { Spinner, Container, Row, Col } from 'reactstrap';
import { getPokemonDetails } from '../../../api/pokemon';
import { listGenerations } from "../../../api/generation";
import './index.css';
import TypeBox from '../../commonComponents/TypeBox';

class Pokemon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonDetails: {},
            generations: [],
        }
    }
    componentDidMount = () => {
        getPokemonDetails(this.props.match.params.id).then((response) => {
            this.setState({
                pokemonDetails: response.data,
            })
        })
        this.getGenerations();
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

    chooseGeneration = (id) => {
        // poke
    }

    render() {
        const {
            pokemonDetails,
        } = this.state;
        var id = 0;
        id = pokemonDetails.id > 100 ? pokemonDetails.id : pokemonDetails.id > 10 ? "0" + pokemonDetails.id : "00" + pokemonDetails.id;
        return (
            <Fragment>
                <section className="characters-section character-one">
                    <div className="pokemon-details">
                        <h1>
                            {pokemonDetails.name}
                        </h1>
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
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default Pokemon;