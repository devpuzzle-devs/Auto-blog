import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getArticles} from '../../actions/articleActions';
import {Grid} from 'semantic-ui-react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
class CommentList extends Component {


  constructor(props) {
    super(props);
    this.state = {
      comments: [...this.props.article.comments]
    }
  }


  rerender = () => {

    this.setState({comments: [...this.props.article.comments]});

  };


  render() {
    const  isAuthenticated  = this.props.isAuthenticated;
    let content = <p></p>;
    if (this.props.article.comments.length) {
      content = [...this.state.comments]
        .map(comment => (
          <Grid.Row key={comment.hash}>
            <CommentItem article={this.props.article}
                         comment={comment}
                         isAdmin={this.props.isAdmin}
                         isAuthenticated={this.props.isAuthenticated}
                         rerender={this.rerender}
            />
          </Grid.Row>
        ));
    }

    return (
      <div>
        {isAuthenticated ?
          <CommentForm hash={this.props.article.hash}  rerender={this.rerender}/>
          :
          <h3 style={{padding:'20px',color:'red'}}>
          Log into your account to add a comment.</h3>
        }
        <Grid>
          {content}
        </Grid>
      </div>

    );
  }
}


function mapStateToProps(state) {

  return {
    loading: state.loading,
    articles: state.articles.articles,
    isAdmin: state.auth.isAdmin,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, {getArticles})(CommentList);