import Layout from "@/components/Layout";
import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { classCreate } from "../../../store/actions/classAction";

function CreateClass(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [classInfo, setClassInfo] = useState({
    subjectName: "",
    subjectCode: "",
    batchNumber: "",
  });
  // const initialErrors = { email: { msg: "" }, password: { msg: "" } };
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  useEffect(
    (state) => {
      if (!props.auth.isTeacher) {
        router.push("/teacher/login");
      }
      if (JSON.stringify(props.classes.errors) !== JSON.stringify(errors)) {
        setErrors(props.classes.errors);
        setMessage("");
      } else {
        setErrors({});
        setMessage(props.classes.message);
      }
    },
    [props.classes]
  );

  const submitHandler = (e) => {
    e.preventDefault();
    props.classCreate(classInfo, router);
  };
  const changeHandler = (e) => {
    setClassInfo({ ...classInfo, [e.target.name]: e.target.value });
  };
  return (
    <Layout metaTitle={"Create Class"}>
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        py={12}
        bg={"gray.50"}
      >
        <Stack
          boxShadow={"2xl"}
          bg={"white"}
          rounded={"xl"}
          p={10}
          spacing={8}
          align={"center"}
        >
          <Stack align={"center"} spacing={2}>
            <Text fontSize={"xl"} color={"gray.500"} align={"center"}>
              Create New Class
            </Text>
          </Stack>
          <form onSubmit={submitHandler}>
            <Stack spacing={4} w={"full"}>
              <Input
                type={"text"}
                onChange={changeHandler}
                name={"subjectName"}
                placeholder={"Subject Name *"}
                color={"gray.800"}
                bg={"gray.100"}
                rounded={"lg"}
                border={0}
                _focus={{
                  bg: "gray.200",
                  outline: "none",
                }}
              />
              <Input
                type={"text"}
                onChange={changeHandler}
                name={"subjectCode"}
                placeholder={"Subject Code *"}
                color={"gray.800"}
                bg={"gray.100"}
                rounded={"lg"}
                border={0}
                _focus={{
                  bg: "gray.200",
                  outline: "none",
                }}
              />
              <Input
                type={"text"}
                onChange={changeHandler}
                name={"batchNumber"}
                placeholder={"Batch"}
                color={"gray.800"}
                bg={"gray.100"}
                rounded={"lg"}
                border={0}
                _focus={{
                  bg: "gray.200",
                  outline: "none",
                }}
              />
              <Button
                type={"submit"}
                bg={"teal.400"}
                rounded={"lg"}
                color={"white"}
                flex={"1 0 auto"}
                _hover={{ bg: "teal.500" }}
                _focus={{ bg: "teal.500" }}
              >
                Create Class
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    classes: state.classes,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    classCreate: (classInfo, router) =>
      dispatch(classCreate(classInfo, router)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateClass);
