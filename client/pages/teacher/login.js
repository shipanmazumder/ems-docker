import Layout from "@/components/Layout";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { teacherLogin } from "../../store/actions/authAction";

function Login(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [teacher, setUser] = useState({
    email: "",
    password: "",
  });
  const initialErrors = { email: { msg: "" }, password: { msg: "" } };
  const [errors, setErrors] = useState(initialErrors);
  const [message, setMessage] = useState("");
  useEffect(
    (state) => {
      if (props.auth.isTeacher) {
        router.push("/teacher/dashboard");
      }
      if (JSON.stringify(props.auth.errors) !== JSON.stringify(errors)) {
        setErrors(props.auth.errors);
        setMessage("");
      } else {
        setErrors(initialErrors);
        setMessage(props.auth.message);
      }
    },
    [props.auth]
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(teacherLogin(teacher, router));
  };
  const changeHandler = (e) => {
    setUser({ ...teacher, [e.target.name]: e.target.value });
  };
  return (
    <Layout>
      <Flex minH={"90vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"3xl"}>Sign In</Heading>
            <Text fontSize={"xl"}>Teacher Portal</Text>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8} bg={"white"}>
            <strong className="d-block mb-2 text-danger">{message}</strong>
            <form onSubmit={submitHandler}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" onChange={changeHandler} />
                  <strong className="mb-2 text-danger">
                    {errors.email ? errors.email.msg : ""}
                  </strong>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    onChange={changeHandler}
                  />
                  <strong className="mb-2 text-danger">
                    {errors.password ? errors.password.msg : ""}
                  </strong>
                </FormControl>
                <Stack>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    {/*<Checkbox>Remember me</Checkbox>*/}
                    {/*<Link*/}
                    {/*  color={'blue.400'}*/}
                    {/*  href={{ pathname: '/student/signup' }}*/}
                    {/*>*/}
                    {/*  Forgot password?*/}
                    {/*</Link>*/}
                  </Stack>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={"center"}>
                Not Registered?{" "}
                <Link href="/teacher/signup">
                  <a color={"blue.400"}>Signup</a>
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}

function mapStateToProps(state) {
  // console.log(state.auth)
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(withRouter(Login));
