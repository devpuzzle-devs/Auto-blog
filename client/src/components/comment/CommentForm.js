import React, {Component} from 'react';
import {Button, Form, TextArea} from 'semantic-ui-react'
import {createComment} from "../../actions/commentActions";
// import axios from "axios";
// import {apiPrefix} from "../../config";
import {connect} from "react-redux";
// import {createArticle, getArticleByHash, updateArticle} from "../../actions/articleActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: true,
      colorButton: 'red',
      text: '',

    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    if (e.target.value.length === 0) {
      this.setState({
        showButton: true,
        colorButton: 'red',
        text: ''
      })
    } else {
      this.setState({
        showButton: false,
        colorButton: 'green',
        text: document.getElementById("text").value
      })
    }
  }

  onClick(e) {
    e.preventDefault();
    const text = document.getElementById("text").value;
    console.log(this.props.hash);
    const comment = {
      text
    };
    this.props.createComment(this.props.hash, comment).then(()=>this.props.rerender());;
    this.setState({
      showButton: true,
      colorButton: 'red',
      text: ''
    });

  }


  render() {
    return (

      <Form>
        <Form.Field control={TextArea}
                    placeholder='Введите коментарий'
                    onChange={this.onChange}
                    id='text'
                    value={this.state.text}
                    style={{border:'1px solid black'}}
        />
        <Button
          inverted color={this.state.colorButton}
          disabled={this.state.showButton}
          style={{marginBottom: '20px'}}
          onClick={this.onClick}
        >Add Comment</Button>
      </Form>

    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {createComment})(CommentForm);
// export default CommentForm;