import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createArticle, getArticleByHash, updateArticle} from '../../actions/articleActions';
import {Button, Form, Message, Loader, Container, Grid, GridColumn, Header} from 'semantic-ui-react'
import validateArticleInput from '../../validations/article';
import {Redirect} from 'react-router-dom';
import TextArea from "semantic-ui-react/dist/commonjs/addons/TextArea";

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: '',
      title: '',
      text: '',
      author: '',
      photo: {},
      errors: {},
      message: '',
      isLoading: false,
      isValid: false,
      redirect: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const hash = this.props.match.params.hash;
    // console.dir(this.props.match.params);
    if (hash) {
      this.props.getArticleByHash(hash)
        .then(res => {
          // console.dir(res);
          if (res) {
            this.setState({
              hash: res.data.hash,
              title: res.data.title,
              text: res.data.text,
              author: res.data.author,
              isEdit: true
            });
          }
        });
    }
  }

  fileSelectedHandler = event => {
      this.setState({
        photo: event.target.files[0]
      });
  };

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  isValid() {
    const {errors, isValid} = validateArticleInput(this.state);

    if (!isValid) {
      this.setState({errors});
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true});

      const fd = new FormData();
      // console.log(this.state);
      fd.append('title', this.state.title);
      fd.append('text', this.state.text);
      fd.append('author', this.state.author);


      if (this.state.photo.name) {
        fd.append('photo', this.state.photo, this.state.photo.name);
      }
      // else{
      //   this.errors.photo="Фотография объязательна";
      // }

      if (this.state.isEdit) {
        this.props.updateArticle(this.state.hash, fd)
          .then((res) => {
              this.setState({
                redirect: true,
                isLoading: false,
                message: res ? res.data.message : ""
              })
            },
            (err) => this.setState(
              {
                errors: err.response ?
                  err.response.data : {},
                isLoading: false
              }));
      } else {

        this.props.createArticle(fd)
          .then((res) => {
              this.setState({
                redirect: true,
                isLoading: false,
                message: res ? res.data.message : ""
              })
            },
            (err) => this.setState(
              {
                errors: err.response ?
                  err.response.data : {},
                isLoading: false
              }));
      }
    }
  }

  render() {
    const {errors, redirect} = this.state;
    const {isAdmin} = this.props.auth;

    if (!isAdmin) return <Redirect to='/login'/>;

    if (redirect) return <Redirect to='/'/>;
    return (
      <Container>
        <Grid centered>
          <GridColumn width="12">
            <Header textAlign="center" as="h1"></Header>
            <Form error onSubmit={this.onSubmit}>
              <Message success visible={this.state.message !== ""} content={this.state.message}/>
              <Message error content={errors.message}/>
              <Form.Field>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={this.onChange}
                  value={this.state.title}
                  placeholder="Title"/>
              </Form.Field>
              <Message error content={errors.title}/>
              <Form.Field>
                <label>Text</label>
                <TextArea
                  type="text"
                  name="text"
                  onChange={this.onChange}
                  value={this.state.text}
                  placeholder="Text"
                  style={{ minHeight: 300 }}
                />
              </Form.Field>
              <Message error content={errors.text}/>
              <Form.Field>
                <label>Author</label>
                <input
                  type="text"
                  name="author"
                  onChange={this.onChange}
                  value={this.state.author}
                  placeholder="Author"/>
              </Form.Field>
              <Message error content={errors.author}/>


              <Form.Field>
                <label>Photo</label>
                <input type="file" name="photo" onChange={this.fileSelectedHandler}/>
                <Message error content={errors.photo}/>

              </Form.Field>
              <Loader active={this.state.isLoading} size='medium'>Loading</Loader>
              <Button disabled={this.state.isLoading} type='submit'>Save</Button>
            </Form>
          </GridColumn>
        </Grid>
      </Container>
    );
  }
}

ArticleForm.propTypes = {
  auth: PropTypes.object.isRequired,
  createArticle: PropTypes.func,
  getArticleByHash: PropTypes.func,
  updateArticle: PropTypes.func
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {createArticle, getArticleByHash, updateArticle})(ArticleForm);