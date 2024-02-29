import Layout from "@/components/Layout";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { studentCreate } from "../../store/actions/authAction";

function TeacherSignup(props) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [student, setTeacher] = useState({
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
      if (props.auth.isStudent) {
        router.push("/student/dashboard");
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
    props.studentCreate(student, router);
  };
  const changeHandler = (e) => {
    setTeacher({ ...student, [e.target.name]: e.target.value });
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
            <Text fontSize={"xl"}>Student</Text>
            <Heading fontSize={"3xl"}>Sign Up</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <strong>{message}</strong>
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
                    <Link href="/student/login">
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
    studentCreate: (student, router) =>
      dispatch(studentCreate(student, router)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TeacherSignup);
