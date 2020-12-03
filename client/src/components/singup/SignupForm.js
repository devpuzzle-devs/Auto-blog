import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, Form, Message, Loader, Header} from 'semantic-ui-react'
import validateInput from '../../validations/signup';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      nickName: '',
      errors: {},
      message: '',
      isLoading: false,
      isValid: false,
      signedUp: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
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

      this.props.userSignupRequest(this.state)
        .then((res) => {
            // console.log(res);
            this.setState({
              isLoading: false,
              message: res.data.message,
              signedUp: true
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

  render() {
    const {errors} = this.state;
    return (
      <div>
        {
          this.state.signedUp ? (
            <div>
              <Header as="h1" textAlign="center" style={{height: "300%", margin: "20px"}}>Registration
                successful</Header>
              <p textAlign="center">Please login to see the phone book</p>
            </div>
          ) : (
            < div>
              < Header as="h1" textAlign="center">Sign Up</Header>
              <Form error onSubmit={this.onSubmit}>
                <Message success visible={this.state.signedUp} content={this.state.message}/>
                <Message error content={errors.message}/>

                <Form.Field>

                  <input
                    type="email"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    placeholder="Email*"/><br/>
                </Form.Field>
                <Message error content={errors.email}/>

                <Form.Field>

                  <input
                    type="text"
                    name="nickName"
                    onChange={this.onChange}
                    value={this.state.nickName}
                    placeholder="Nick Name*"/><br/>
                </Form.Field>
                <Message error content={errors.nickName}/>

                <Form.Field>

                  <input
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    placeholder="Password*"/><br/>
                </Form.Field>
                <Message error content={errors.password}/>
                <Form.Field>

                  <input
                    type="password"
                    name="passwordConfirm"
                    onChange={this.onChange}
                    value={this.state.passwordConfirm}
                    placeholder="Confirm password*"/><br/>
                </Form.Field>
                <Message error content={errors.passwordConfirm}/>


                {/*<Form.Field>*/}

                  {/*<input*/}
                    {/*type="text"*/}
                    {/*name="firstName"*/}
                    {/*onChange={this.onChange}*/}
                    {/*value={this.state.firstName}*/}
                    {/*placeholder="First Name"/>*/}
                {/*</Form.Field>*/}

                {/*<Form.Field>*/}

                  {/*<input*/}
                    {/*type="text"*/}
                    {/*name="lastName"*/}
                    {/*onChange={this.onChange}*/}
                    {/*value={this.state.lastName}*/}
                    {/*placeholder="Last Name"/><br/>*/}
                {/*</Form.Field>*/}




                <Loader active={this.state.isLoading} size='medium'>Loading</Loader>
                <Button disabled={this.state.isLoading} type='submit'>Sign In</Button>
              </Form>
            </div>
          )

        }
      </div>
    );
  }
};

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default SignupForm;