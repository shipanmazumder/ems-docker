import Layout from "@/components/Layout";
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  classReEnroll,
  getStudentArchiveClasses,
} from "../../store/actions/classAction";

function Archive(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [classes, setClasses] = useState([]);
  const [classInfo, setClassInfo] = useState({
    classCode: "",
  });
  const [classCode, setClassCode] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(async () => {
    await getStudentArchiveClasses();
  }, []);

  useEffect(() => {
    if (!props.auth.isStudent) router.push("/student/login");
    setClasses(props.classes.classes);
  }, [props.classes.classes]);

  const setInfo = async (value) => {
    setClassInfo({ ...classInfo, classCode: value });
    await props.classReEnroll({ classCode: value }, router);
    onClose();
  };

  const getStudentArchiveClasses = async () => {
    await props.getStudentArchiveClasses(router);
  };

  const openModal = async (code) => {
    setClassCode(() => code);
    onOpen();
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
            {classes.length > 0 ? (
              classes.map((value, index) => (
                <>
                  <div className="col-lg-3 col-md-6" key={index}>
                    <Box
                      w={"full"}
                      h={"full"}
                      bg={"white"}
                      boxShadow={"lg"}
                      rounded={"md"}
                      overflow={"hidden"}
                    >
                      <Box p={6} borderTop="4px" borderColor="teal">
                        <Stack spacing={2} align={"center"} mb={2}>
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
                            align={"center"}
                            lineHeight={1.5}
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

                          <Text color={"gray.500"}>{value.batchNumber}</Text>
                        </Stack>
                        <Stack spacing={0} align={"center"} mt={2}>
                          <Text fontSize={"sm"}>
                            by{" "}
                            {value.teacherId != undefined ? (
                              <span className="fw-bold">
                                {value.teacherId.firstName}{" "}
                                {value.teacherId.lastName}
                              </span>
                            ) : (
                              "N/A"
                            )}
                          </Text>
                        </Stack>

                        <Stack mt={5} direction={"row"} spacing={4}>
                          <Button
                            onClick={(e) => openModal(value.classCode)}
                            fontSize={"sm"}
                            rounded={"lg"}
                            _focus={{
                              bg: "gray.200",
                            }}
                          >
                            Re Enroll
                          </Button>
                          <Link
                            href={`/student/view-class?classId=${value.classCode}`}
                          >
                            <Button
                              flex={1}
                              fontSize={"sm"}
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

                  <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Are you Sure?</ModalHeader>
                      <ModalCloseButton />
                      <ModalFooter>
                        <Button
                          colorScheme="red"
                          fontSize="sm"
                          mr={3}
                          onClick={(e) => setInfo(classCode)}
                          // onClick={classUnroll}
                        >
                          Yes! Re Enroll
                        </Button>
                        <Button
                          colorScheme="gray"
                          fontSize="sm"
                          onClick={onClose}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              ))
            ) : (
              <div className="py-5 my-5 text-center">
                <Text fontSize="3xl" mb="6">
                  You have No Archive Class!
                </Text>
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
    getStudentArchiveClasses: (router) =>
      dispatch(getStudentArchiveClasses(router)),
    classReEnroll: (classInfo, router) =>
      dispatch(classReEnroll(classInfo, router)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
