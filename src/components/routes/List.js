import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

class List extends Component {
  state = {
    boards: [],
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  //로딩 데이터
  loadingData = async () => {
    try {
        const instance = axios.create({
          baseURL: '/api',
          headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE2MjA5MTEyMzYsImV4cCI6MTYyMDkxNDIzNiwidXNlcl9pZCI6MSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJfbmFtZSI6IjEifQ.gzj9QpJKXMGwisE28i5E9VGs1WCx3N283wIs36EiqEE'
          }
        });

        instance.get('/boards/1/posts')
        .then(response => {
             this.setState({
                boards: response.data.content
              });
        })
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    const { loadingData } = this;
    loadingData();
  }

  render() {
    const { boards } = this.state;
    const { handleChange } = this;
    return (
      <Wrap>
        <h2>List</h2>
        <div>
          {boards && (
            <textarea
              name="getBoards2"
              onChange={handleChange}
              rows={7}
              value={JSON.stringify(boards, null, 2)}
            />
          )}
        </div>
        {/* {console.log(boards)} */}
        {/* {boards[0].boardPostId} */}
          {boards.map((item) => {
              return (
                  <ListItem key={item.board_post_id +''+ item.sort_order}>
                      <Link to={`/read/${item.board_post_id}`}>
                          <h3>{item.title}</h3>
                          <p>{item.content}</p>
                      </Link>
                  </ListItem>
              );
          })}

          <Button>
          {/* <button onClick={handleClick}>get Request</button> */}
          <Link to={`/write`}>글쓰기</Link>
        </Button>
      </Wrap>
    );
  }
}

//styling
const Wrap = styled.div`
  padding: 20px;
`;

const ListItem = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 20px;
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
      padding: 10px 0 0 0;
      color: #787878;
    }
    &:hover {
      h3 {
        color: #0066ff;
      }
    }
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
    background: #212121;
    color: #fff;
  }
`;

export default List;