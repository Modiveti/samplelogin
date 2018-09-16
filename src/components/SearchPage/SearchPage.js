import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPlanetList } from '../../actions/searchActions';
import { selectUserInputData } from '../../selectors/loginSelectors';
import PageContainer from "../PageContainer";
import Highlighter from "react-highlight-words";
import {
    fetchPlanets,
    fetchPeople
} from "../../Services/apiService";
import Autosuggest from "react-autosuggest";
import { Row, Col, Container, Button } from "reactstrap";
import debounce from "lodash.debounce";
import BreadcrumbBuilder from "../Breadcrumb/BreadcrumbBuilder";
import "./SearchPage.css";

function getSuggestionValue(suggestion) {
  userSearchCount = userSearchCount + 1;
  return suggestion.name;
}

const breadcrumbData = [{ name: "Search", linkTo: "/SearchPage", active: true }];

let userSearchCount = 0;

class SearchPage extends React.Component {
  state = {
    value: "",
    suggestions: [],
    loading: false,
    areResultsFound: true
  };

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.loadSuggestions = debounce(this.loadSuggestions.bind(this), 500);
  }

  loadSuggestions(value) {
    if (!value) {
      this.setState({ loading: false, suggestions: [] });
      return;
    }

    Promise.all([fetchPlanets(), fetchPeople()])
      .then(res => {
                  const accountOptions = res[0].data.results.map(i => ({
                      name: i.name,
                      model: i.model,
                      type: "Planets",
                  }));
                  const contactOptions = res[1].data.results.map(i => ({
                                  name: i.name,
                                  height: i.height,
                                  type: "people",
        }));

        // const accountOptions = res[0].data.results;
        // const contactOptions = res[1].data.results;

        let areResultsFound = contactOptions.length + accountOptions.length > 0;
        this.setState({
          suggestions: [...accountOptions, ...contactOptions].sort(
            (a, b) => b.name - a.name
          ),
          loading: false,
          oldValue: value,
          areResultsFound: areResultsFound
        });
      })
      .catch(err => {
        this.setState({ loading: false, error: true });
      });
  }

  renderSuggestion(suggestion) {
    const imgSrc =
      suggestion.type === "Planets"
        ? require("../../Images/Planet.jpg")
        : require("../../Images/user2.png");
    return (
      <span>
        <Row
          onClick={() =>
            suggestion.name
            // this.executeSearch(
            //   suggestion.valueToSearch || suggestion.name,
            //   suggestion.type
            // )
          }
        >
          <Col sm={2} md={1}>
            {" "}
            <img alt="LOGO" style={{ height: 50 }} src={imgSrc} />
          </Col>
          <Col md={8} sm={8} lg={8}>
            <div>
              <Highlighter
                searchWords={[this.state.value]}
                textToHighlight={suggestion.name}
                autoEscape={true}
                highlightStyle={{ fontWeight: "bold" }}
              />
            </div>
            <div style={{ fontSize: 14 }} className="text-muted">
              <Highlighter
                searchWords={[this.state.value]}
                textToHighlight={suggestion.type}
                autoEscape={true}
                highlightStyle={{ fontWeight: "bold" }}
              />
            </div>
          </Col>
        </Row>
      </span>
    );
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
      areResultsFound: true
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    if (value !== this.state.oldValue) {
      this.setState({ loading: true, error: false });
      this.loadSuggestions(value);
    }
  };

  executeSearch(query, type) {
    if (type === "contact") {
      this.props.history.push(
        `/search/results?q=${encodeURIComponent(query)}&type=${type ||
          "account"}`
      );
    } else {
      this.props.history.push(
        `/search/results?q=${encodeURIComponent(query)}&type=${type ||
          "account"}`
      );
    }
  }

  render() {
    const { value, suggestions, loading, error, areResultsFound } = this.state;
    const inputProps = {
      placeholder: "Search Starwars Planets Starship Data",
      value,
      onChange: this.onChange,
      onKeyDown: e => e.key === "Enter" && this.executeSearch(value)
    };
    return (
      <PageContainer fluid>
        <Row>
          <BreadcrumbBuilder data={breadcrumbData} />
        </Row>
        <Container>
          <div>
            <Row style={{ paddingTop: 100 }}>
              <h2
                style={{
                  margin: "0 auto",
                  textAlign: "center",
                  marginTop: 20,
                  marginBottom: 20,
                  textTransform: "uppercase"
                }}
              >
                Search the Star Wars data that you've ever wanted
              </h2>
            </Row>
            <div className="search">
              <Row style={{ paddingTop: 50 }}>
                <Col sm={1} />
                <Col sm={10}>
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={
                      this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={() => {}}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={this.renderSuggestion.bind(this)}
                    inputProps={inputProps}
                  />
                  {loading && (
                    <i
                      style={{ position: "absolute", top: 17, right: 30 }}
                      className="fa fa-spinner fa-spin"
                    />
                  )}
                </Col>
                <Col sm={1}>
                  {value !== "" && (
                    <Button
                      style={{
                        backgroundColor: "#2856a0",
                        borderColor: "#2856a0"
                      }}
                      onClick={() => this.executeSearch(this.state.value)}
                    >
                      <i
                        style={{
                          top: 2,
                          fontSize: 26
                        }}
                        className="fa fa-search"
                        aria-hidden="true"
                      />
                    </Button>
                  )}
                </Col>
                <Col md={{ size: 11, offset: 1 }}>
                  {error && (
                    <div className="text-danger" style={{ fontSize: 12 }}>
                      **An error occurred fetching suggestions
                    </div>
                  )}
                  {!areResultsFound && (
                    <div className="text-danger" style={{ fontSize: 12 }}>
                      **No results found
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: selectUserInputData(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPlanetList
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);