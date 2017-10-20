import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    
    title1: "",
    snippet1: "",
    url1: "",
    title2: "",
    snippet2: "",
    url2: "",
    title3: "",
    snippet3: "",
    url3: "",
  };

  componentDidMount() {
    this.loadBooks();
  }

  searchMovies = query => {
	    API.search(query)
	      .then(res => this.setState({ 
	    	  title1: res.data.response.docs[0].headline.main,
	    	  snippet1: res.data.response.docs[0].snippet,
	    	  url1: res.data.response.docs[0].web_url,
	    	  
	    	  title2: res.data.response.docs[1].headline.main,
	    	  snippet2: res.data.response.docs[1].snippet,
	    	  url2: res.data.response.docs[1].web_url,
	    	  
	    	  title3: res.data.response.docs[2].headline.main,
	    	  snippet3: res.data.response.docs[2].snippet,
	    	  url3: res.data.response.docs[2].web_url,
	    	  
	    	  }))
	      .catch(err => console.log(err));
	  };
	  
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
    	this.searchMovies(this.state.title);
//      API.saveBook({
//        title: this.state.title1,
//        author: this.state.url1,
//        synopsis: this.state.synopsis
//      })
//        .then(res => this.loadBooks())
//        .catch(err => console.log(err));
    }
  };
  
  saveArticle1 = event => {
	  API.saveBook({
	        title: this.state.title1,
	        author: this.state.url1,
	        synopsis: this.state.synopsis
	      })
	        .then(res => this.loadBooks())
	        .catch(err => console.log(err));
  }
  
  saveArticle2 = event => {
	  API.saveBook({
	        title: this.state.title2,
	        author: this.state.url2,
	        synopsis: this.state.synopsis
	      })
	        .then(res => this.loadBooks())
	        .catch(err => console.log(err));
  }
  
  saveArticle3 = event => {
	  API.saveBook({
	        title: this.state.title3,
	        author: this.state.url3,
	        synopsis: this.state.synopsis
	      })
	        .then(res => this.loadBooks())
	        .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
        <Col size="md-2"></Col>
          <Col size="md-8">
            <Jumbotron>
              <h1>New York Times Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Search keywords"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="End Date (YYYY/MM/DD optional)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Start Date (YYYY/MM/DD optional)"
              />
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Search News
              </FormBtn>
            </form>
          </Col>
          <Col size="md-2"></Col>
          </Row>
          
          <Row>
          <Col size="md-2"></Col>
          <Col size="md-8">
          	<a href = {this.state.url1}>{this.state.title1}</a>
          	<button onClick={this.saveArticle1}>save</button>
          </Col>
          </Row>
          <Row>
          <Col size="md-2"></Col>
          <Col size="md-8">
          {this.state.snippet1}
          </Col>
          </Row>
          
          <Row>
          <Col size="md-2"></Col>
          <Col size="md-8">
          	<a href = {this.state.url2}>{this.state.title2}</a>
          	<button onClick={this.saveArticle2}>save</button>
          </Col>
          </Row>
          <Row>
          <Col size="md-2"></Col>
          <Col size="md-8">
          {this.state.snippet2}
          </Col>
          </Row>
          
          <Row>
          <Col size="md-2"></Col>
          <Col size="md-8">
          	<a href = {this.state.url3}>{this.state.title3}</a>
          	<button onClick={this.saveArticle3}>save</button>
          </Col>
          </Row>
          <Row>
          <Col size="md-2"></Col>
          <Col size="md-8">
          {this.state.snippet3}
          </Col>
          </Row>
          
          <Row>
          <Col size="md-2"></Col>
          <Col size="md-8">
            <Jumbotron>
              <h2>Saved Aritcles</h2>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={book.author}>
                      <strong>
                        {book.title}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-2"></Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
