import Layout from "@/components/Layout";
import ClipboardCopy from "@/utils/ClipboardCopy";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getClass } from "../../store/actions/classAction";
function Dashboard(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [classes, setClasses] = useState([]);

  useEffect(async () => {
    if (!router.isReady) return;
    await getClasses();
  }, []);

  useEffect(() => {
    if (!props.auth.isTeacher) router.push("/teacher/login");
    setClasses(props.classes.classes);
  }, [props.classes.classes]);

  const getClasses = async () => {
    await props.getClasses(router);
  };

  if (props.classes.isLoading)
    return (
      <p className="vh-100 vw-100 d-flex align-items-center justify-content-center">
        <span className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </span>
      </p>
    );
  return (
    <Layout>
      <Box minH={"90vh"} bg={"gray.50"}>
        <div className="section container">
          <div className="row gy-4">
            {props.classes.classes.length > 0 ? (
              classes.map((value, index) => (
                <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
                  <Box
                    w={"full"}
                    h={"full"}
                    bg={"white"}
                    boxShadow={"lg"}
                    rounded={"md"}
                    overflow={"hidden"}
                  >
                    <Box p={6} borderTop="4px" borderColor="teal">
                      <Stack spacing={2} mb={2} align={"center"}>
                        <Text fontSize={"sm"} color={"gray.500"}>
                          Total{" "}
                          <span className="fw-bold">
                            {value.students ? value.students.length : 0}
                          </span>{" "}
                          Students
                        </Text>

                        <Heading
                          fontSize={"xl"}
                          fontWeight={600}
                          fontFamily={"body"}
                          lineHeight={1.5}
                          align={"center"}
                        >
                          {value.subjectName}{" "}
                          <Text
                            display={"inline-block"}
                            color={"gray.500"}
                            fontWeight={500}
                          >
                            ({value.subjectCode})
                          </Text>
                        </Heading>
                        <Text color={"gray.500"}>
                          Batch: {value.batchNumber}
                        </Text>

                        <Text color={"gray.500"}>
                          Class Code :{" "}
                          <Text
                            className="fw-bold"
                            fontSize="xl"
                            as="span"
                            color={"teal"}
                          >
                            <ClipboardCopy copyText={value.classCode} />
                          </Text>
                        </Text>
                      </Stack>

                      <Stack mt={5} direction={"column"} spacing={2}>
                        <Link href={`/teacher/class/${value.classCode}`}>
                          <Button
                            flex={1}
                            fontSize={"sm"}
                            py={3}
                            colorScheme="teal"
                            _focus={{
                              boxShadow: "none",
                            }}
                          >
                            <a className="text-white">View Class</a>
                          </Button>
                        </Link>
                      </Stack>
                    </Box>
                  </Box>
                </div>
              ))
            ) : (
              <div className="py-5 my-5 text-center">
                <Text fontSize="3xl" mb="6">
                  No class created yet!
                </Text>
                <Link href="/teacher/class/create-class">
                  <Button
                    fontSize={"sm"}
                    size="lg"
                    fontWeight={600}
                    color={"white"}
                    bg={"teal.400"}
                    _hover={{
                      bg: "teal.500",
                    }}
                    _focus={{
                      color: "white",
                    }}
                  >
                    Create Class
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Box>
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
    getClasses: (router) => dispatch(getClass(router)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
