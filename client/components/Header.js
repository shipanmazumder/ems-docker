import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout, studentLogout } from "../store/actions/authAction";
import { getCookie } from "../utils/auth";

export default function Simple() {
  const token = getCookie("token");
  let teacherLogin = false;
  let studentLogin = false;
  let isLogin = false;

  const router = useRouter();
  if (token) {
    let decode = jwtDecode(token);
    isLogin = true;
    teacherLogin = decode.data.type == "Teacher" ? true : false;
    studentLogin = decode.data.type == "Student" ? true : false;
  } else {
    isLogin = false;
    teacherLogin = false;
    studentLogin = false;
  }
  const dispatch = useDispatch();
  const teacherLogout = () => {
    dispatch(logout(router));
  };
  const StudentLogout = () => {
    dispatch(studentLogout(router));
  };

  return (
    <>
      <Box boxShadow="sm" bg={useColorModeValue("white", "gray.900")} px={4}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Flex
                h={16}
                gap={10}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <HStack spacing={8} alignItems={"center"}>
                  <Box
                    fontSize={"2xl"}
                    fontWeight={600}
                    style={{ cursor: "pointer" }}
                  >
                    <Link
                      href={
                        !isLogin
                          ? "/"
                          : studentLogin
                          ? "/student/dashboard"
                          : "/teacher/dashboard"
                      }
                    >
                      <Image src="/images/logo.svg" alt="Logo" />
                    </Link>
                  </Box>
                </HStack>
                <Flex alignItems={"center"}>
                  <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={"flex-end"}
                    direction={"row"}
                    spacing={3}
                  >
                    {!isLogin ? (
                      <>
                        <Link href="/teacher/login">
                          <Button
                            fontSize={"sm"}
                            fontWeight={600}
                            _focus={{
                              bg: "gray.200",
                            }}
                          >
                            Teacher Portal
                          </Button>
                        </Link>
                        <Link href="/student/login">
                          <Button
                            fontSize={"sm"}
                            fontWeight={600}
                            _focus={{
                              bg: "gray.200",
                            }}
                          >
                            Student Portal
                          </Button>
                        </Link>
                      </>
                    ) : (
                      ""
                    )}
                    {teacherLogin ? (
                      <>
                        <Link href="/teacher/class/create-class">
                          <Button
                            fontSize={"sm"}
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
                        <Button
                          onClick={teacherLogout}
                          fontSize={"sm"}
                          fontWeight={600}
                          colorScheme="red"
                          px={2}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            height={20}
                            width={20}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15.8 9V5.2A2.3 2.3 0 0 0 13.4 3h-6a2.3 2.3 0 0 0-2.3 2.3v13.4A2.3 2.3 0 0 0 7.5 21h6a2.3 2.3 0 0 0 2.3-2.3V15m3 0 3-3m0 0-3-3m3 3H9"
                            />
                          </svg>
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                    {studentLogin ? (
                      <>
                        <Link href="/student/archive">
                          <Button
                            fontSize={"sm"}
                            fontWeight={600}
                            color={"black"}
                            bg={"white"}
                            variant="link"
                            className="me-2"
                            _hover={{
                              color: "teal",
                            }}
                            _focus={{
                              background: "white",
                              color: "teal",
                            }}
                          >
                            Archived
                          </Button>
                        </Link>
                        <Link href="/student/join-class">
                          <Button
                            fontSize={"sm"}
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
                            Join Class
                          </Button>
                        </Link>
                        <Button
                          onClick={StudentLogout}
                          fontSize={"sm"}
                          fontWeight={600}
                          colorScheme="red"
                          px={2}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            height={20}
                            width={20}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15.8 9V5.2A2.3 2.3 0 0 0 13.4 3h-6a2.3 2.3 0 0 0-2.3 2.3v13.4A2.3 2.3 0 0 0 7.5 21h6a2.3 2.3 0 0 0 2.3-2.3V15m3 0 3-3m0 0-3-3m3 3H9"
                            />
                          </svg>
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                  </Stack>
                </Flex>
              </Flex>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
