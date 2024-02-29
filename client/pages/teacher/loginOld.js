import { Component } from 'react';
import { connect } from 'react-redux';
import { teacherLogin } from '../../store/actions/authAction';
import { withRouter } from 'next/router'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import Layout from '@/components/Layout';

class LoginOld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
      errors: {},
      userName: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.auth.errors) !== JSON.stringify(prevState.errors)
    ) {
      return {
        errors: nextProps.auth.errors,
        message: nextProps.auth.message,
      };
    } else {
      return {
        message: nextProps.auth.message,
      };
    }
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  submitHandler = (event) => {
    event.preventDefault();
    let { email, password } = this.state;
    this.props.teacherLogin({ email, password }, this.props.history);
  };

  render() {
    console.log(this.props.history)
    let { email, password, errors, message } = this.state;
    return (
      <Layout>
        <Flex minH={'90vh'} align={'center'} justify={'center'} bg={'gray.50'}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            </Stack>
            <Box rounded={'lg'} boxShadow={'lg'} p={8} bg={'white'}>
            <strong className="d-block mb-2 text-danger">{message}</strong>
              <form onSubmit={this.submitHandler}>
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      onChange={this.changeHandler}
                    />
                    <strong>{errors.email ? errors.email.msg : ''}</strong>
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      onChange={this.changeHandler}
                    />
                    <strong>
                      {errors.password ? errors.password.msg : ''}
                    </strong>
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link
                        color={'blue.400'}
                        href={{ pathname: '/student/signup' }}
                      >
                        Forgot password?
                      </Link>
                    </Stack>
                    <Button
                      type="submit"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default withRouter(connect(mapStateToProps, { teacherLogin })(LoginOld))
