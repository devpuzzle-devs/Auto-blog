import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {login} from '../../actions/authActions';
import {Button, Form, Message, Loader} from 'semantic-ui-react'
import validateInput from '../../validations/login';
import {Redirect} from 'react-router-dom';

class LoginForm extends Component {

  // _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      nickName: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const {errors, isValid} = validateInput(this.state);

    if (!isValid) {
      this.setState({errors});
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true});
      this.props.login(this.state).catch(
        (err) =>
          // console.dir(err)
          this.setState({
          errors: err.response.data?err.response.data:err,
          isLoading: false
        })
      );
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {errors} = this.state;
    if (this.props.auth.isAuthenticated === true) {
      return <Redirect to="/"/>
    }
    return (
      <Form error onSubmit={this.onSubmit}>
        {errors.message && <Message error content={errors.message}/>}
        <Form.Field>

          <Form.Input icon='user' iconPosition='left'
                      placeholder='Nickname'
                      value={this.state.nickName}
                      name="nickName"
                      onChange={this.onChange}
                      type="text"
          />

        </Form.Field>
        <Message error content={errors.nickName}/>
        <Form.Field>
          <Form.Input icon='lock'
                      iconPosition='left'
                      // label='Password'
                      type='password'
                      name="password"
                      onChange={this.onChange}
                      value={this.state.password}
                      placeholder="Password"/>


        </Form.Field>
        <Message error content={errors.password}/>
        <Loader active={this.state.isLoading} size='medium'>Loading</Loader>
        <Button disabled={this.state.isLoading} type='submit'>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {login})(LoginForm);