import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

class Read extends Component {
    state = {
        id: '',
        comments: [],
        board: [],
    };

    //로딩 데이터
    loadingPost = async () => {
        //test JSON: 이 주소로 넣으면 오류 없음
        //https://jsonplaceholder.typicode.com/todos/1
        try {
            // const id = 0; //test id
            const { id } = this.props.match.params;
            const instance = axios.create({
                baseURL: '/api',
                headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE2MjA5MTEyMzYsImV4cCI6MTYyMDkxNDIzNiwidXNlcl9pZCI6MSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJfbmFtZSI6IjEifQ.gzj9QpJKXMGwisE28i5E9VGs1WCx3N283wIs36EiqEE'
                }
            });
            instance.get(`/boards/posts/${id}`)
                .then(response => {
                    this.setState({
                        board: response.data
                    });
                })

        } catch (e) {
            console.log(e);
        }
    };

    loadingComment = async () => {
        //test JSON: 이 주소로 넣으면 오류 없음
        //https://jsonplaceholder.typicode.com/todos/1
        try {
            // const id = 0; //test id
            const { id } = this.props.match.params;
            const instance = axios.create({
                baseURL: '/api',
                headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE2MjA5MTEyMzYsImV4cCI6MTYyMDkxNDIzNiwidXNlcl9pZCI6MSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJfbmFtZSI6IjEifQ.gzj9QpJKXMGwisE28i5E9VGs1WCx3N283wIs36EiqEE'
                }
            });
            instance.get(`/boards/posts/${id}/comments`)
                .then(response => {
                    this.setState({
                        comments: response.data.content
                    });
                })

        } catch (e) {
            console.log(e);
        }
    };
    componentDidMount() {
        console.log('componentDidMount');
        const { loadingPost , loadingComment } = this;
        loadingPost();
        loadingComment();
    }
    render() {
        const { board , comments } = this.state;
        return (
            <Wrap>
                <h2>{board.title}</h2>
                <p>{board.content}</p>
                <Button>
                    <Link to="/">목록</Link>
                    <a
                        href="#"
                        onClick={() => {
                            alert('삭제');
                        }}
                    >
                        삭제
                    </a>
                    <a
                        href="#"
                        onClick={() => {
                            alert('수정');
                        }}
                    >
                        수정
                    </a>
                </Button>

                {comments.map((item) => {
                    return (
                        <ListItem key={item.board_comment_id +''+ item.sort_order}>
                            <p>{item.content}</p>
                        </ListItem>
                    );
                })}

            </Wrap>
        );
    }
}

//styling
const Wrap = styled.div`
  padding: 20px;
  h2 {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  p {
    min-height: 200px;
  }
`;
const Button = styled.div`
  border-top: 1px solid #eee;
  padding: 20px;
  a {
    float: right;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    background: #f2f2f2;
    border: 1px solid #ddd;
    color: #424242;
    font-size: 16px;
  }
  a + a {
    margin-right: 5px;
  }
`;


const ListItem = styled.div`
  width: 100%;
  border-top: 1px solid #eee;
  a {
    text-decoration: none;
    h3 {
      margin: 0;
      padding: 0;
      color: #212121;
    }
    p {
      margin: 0;
      padding: 0;
      color: #787878;
    }
    &:hover {
      h3 {
        color: #0066ff;
      }
    }
  }
`;

export default Read;