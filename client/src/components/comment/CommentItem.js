import React, {Component} from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import {Card, Button} from 'semantic-ui-react';
import {deleteComment} from '../../actions/commentActions';
import {connect} from "react-redux";

// import {apiPrefix} from '../../config';


class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.props.history.push({});
  }

  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteComment(this.props.article.hash, this.props.comment.hash)
      .then(()=>this.props.rerender());
  }


  render() {

    return (
      <Card fluid style={{height: "100%" ,padding:'10px' ,border:'1px solid black'}}>
        <Card.Content>
          <Card.Header  style={{ font: 'bold  180% serif'}}>
            {this.props.comment.author}
          </Card.Header>
        </Card.Content>
        <Card.Description style={{ padding:'10px' , font: 'bold  130% serif'}}>
          {this.props.comment.text}

        </Card.Description>

        {this.props.isAdmin &&
        <Button basic color='red'
                onClick={this.onDeleteClick.bind(this)}>
          Delete comment</Button>}
      </Card>
    );
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {deleteComment})(CommentItem);
// export default CommentItem;