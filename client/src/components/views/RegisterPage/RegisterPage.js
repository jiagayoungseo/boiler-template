import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('Please chech the password');
    }
    let body = {
      name: Name,
      _id: Email,
      email: Email,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      console.log(response.payload);
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        alert('Error');
      }
    });
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Form>
        <Form.Item
          label="Email or Id"
          name="userEmail"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input type="email" value={Email} onChange={onEmailHandler} />
        </Form.Item>
        <Form.Item
          label="User Name"
          name="userName"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input type="text" value={Name} onChange={onNameHandler} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password value={Password} onChange={onPasswordHandler} />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="Confirm password"
          rules={[
            {
              required: true,
              message: 'Please input your re-password!',
            },
          ]}
        >
          <Input.Password
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="Submit" onClick={onSubmitHandler}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default withRouter(RegisterPage);
