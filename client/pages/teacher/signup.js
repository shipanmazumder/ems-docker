import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Layout from "@/components/Layout";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { teacherCreate } from "../../store/actions/authAction";

function TeacherSignup(props) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  // const initialErrors = { email: { msg: "" }, password: { msg: "" } };
  const [errors, setErrors] = useState({});
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
        setErrors({});
        setMessage(props.auth.message);
      }
    },
    [props.auth]
  );
  const submitHandler = (e) => {
    e.preventDefault();
    props.teacherCreate(teacher, router);
  };
  const changeHandler = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };
  return (
    <Layout>
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Text fontSize={"xl"}>Teacher</Text>
            <Heading fontSize={"3xl"}>Sign Up</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <strong className="d-block mb-2 text-danger">{message}</strong>
            <form onSubmit={submitHandler}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        name={"firstName"}
                        onChange={changeHandler}
                      />
                    </FormControl>
                     <strong className="mb-2 text-danger">
                      {errors.firstName ? errors.firstName.msg : ""}
                    </strong>
                  </Box>
                  <Box>
                    <FormControl id="lastName" isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        name={"lastName"}
                        onChange={changeHandler}
                      />
                    </FormControl>
                     <strong className="mb-2 text-danger">
                      {errors.lastName ? errors.lastName.msg : ""}
                    </strong>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name={"email"} onChange={changeHandler} />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name={"password"}
                      onChange={changeHandler}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                 <strong className="mb-2 text-danger">
                      {errors.password ? errors.password.msg : ""}
                    </strong>
                <Stack spacing={10} pt={2}>
                  <Button
                    type={"submit"}
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link href={{ pathname: "/teacher/login" }}>
                      <a color={"blue.400"}>Login</a>
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    teacherCreate: (teacher, router) =>
      dispatch(teacherCreate(teacher, router)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TeacherSignup);
