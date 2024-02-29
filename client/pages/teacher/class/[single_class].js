import Layout from "@/components/Layout";
import ClipboardCopy from "@/utils/ClipboardCopy";
import {DeleteIcon, DownloadIcon} from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Button,
    Heading,
    Input,
    Stack,
    StackDivider,
    Tab,
    Table,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    Text,
    Tooltip,
    Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {BsFillArrowRightSquareFill} from "react-icons/bs";
import {connect} from "react-redux";
import {
    classMaterialUpload,
    getSingleClass,
} from "../../../store/actions/classAction";
import {getExams} from "../../../store/actions/examAction";

function ViewClass(props) {
    const router = useRouter();
    const {register, handleSubmit, formState} = useForm();
    const {isSubmitting} = formState;
    const [announceBlock, setAnnounceBlock] = useState(false);
    const classCode = router.query.single_class;
    const [classInfo, setClassInfo] = useState({});
    const [image, setImage] = useState(null);
    const [classMaterialInfo, setClassMaterialInfo] = useState({
        classCode: "",
        name: "",
        file: {},
    });
    const [exams, setExams] = useState({});
    useEffect(async () => {
        if (!router.isReady) return;
        await getSingleClass();
    }, [router.isReady]);

    useEffect(() => {
        if (!props.auth.isTeacher) router.push("/teacher/login");
    }, [props.auth]);
    useEffect(async () => {
        setClassInfo(props.classes.classInfo);
        setClassMaterialInfo({...classMaterialInfo, classCode: classCode});
        if (Object.keys(props.classes.classInfo).length != 0) {
            await getExams();
        }
    }, [props.classes.classInfo]);

    useEffect(() => {
        setExams(props.exams.exams);
    }, [props.exams.exams]);

    const getSingleClass = async () => {
        await props.getSingleCLass(classCode, router);
    };
    const changeHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            const i = e.target.files[0];
            // setClassMaterialInfo({...classMaterialInfo, [e.target.name]: i});
            setImage(i);
        } else {
            setClassMaterialInfo({
                ...classMaterialInfo,
                [e.target.name]: e.target.value,
            });
        }
    };
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("file", data.file[0]);
        formData.append("name", classMaterialInfo.name);
        formData.append("classCode", classMaterialInfo.classCode);
        await props.classMaterialUpload(formData, router);
        setAnnounceBlock(false);
    };
    const getExams = async () => {
        await props.getExams(props.classes.classInfo._id, router);
    };
    let checkDate = (date) => {
        let today = new Date().toLocaleDateString();
        let serverDate = new Date(date).toLocaleDateString();
        if (serverDate == today) {
            return true;
        }
        return false;
    };
    if (props.exams.isLoading)
        return (
            <p className="vh-100 vw-100 d-flex align-items-center justify-content-center">
        <span className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </span>
            </p>
        );

    return (
        <Layout metaTitle="View Class">
            <Box minH={"90vh"} bg={"gray.50"}>
                <div className="section container">
                    <Tabs isFitted variant="unstyled">
                        <div className="row">
                            <div className="col-lg-9 mx-auto">
                                <TabList
                                    px={3}
                                    mb="1em"
                                    gap={2}
                                    className="flex-wrap flex-sm-nowrap"
                                >
                                    <Tab
                                        py={3}
                                        fontWeight={500}
                                        border={"1px"}
                                        borderColor={"gray.100"}
                                        rounded={"md"}
                                        _selected={{
                                            color: "teal",
                                            borderColor: "gray.300",
                                            rounded: "md",
                                        }}
                                    >
                                        <svg
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0"
                                            y="0"
                                            viewBox="0 0 333 333"
                                            width="22"
                                            height="22"
                                            className="me-2"
                                            style={{marginTop: "-1px"}}
                                        >
                                            <path
                                                d="M325.5 301.4h-303a15 15 0 0 1-15-15v-203a15 15 0 0 1 15-15h288a15 15 0 0 1 15 15v218z"
                                                fill="#28d2e4"
                                            />
                                            <path
                                                d="M166.5 31.6A28.5 28.5 0 0 0 138 60.1v8.3h57V60a28.5 28.5 0 0 0-28.5-28.5z"
                                                fill="#13829b"
                                            />
                                            <path
                                                fill="#13829b"
                                                d="M236.5 249.2H325.5V301.4H236.5z"
                                            />
                                            <path
                                                fill="#ffdb77"
                                                d="M236.5 249.2 295.5 249.2 295.5 98.4 37.5 98.4 37.5 271.4 236.5 271.4z"
                                            />
                                            <path
                                                d="M310.5 60.9h-108V60a36 36 0 0 0-72 0v.8h-108C10.1 60.9 0 70.9 0 83.4v203c0 12.4 10 22.5 22.5 22.5h303c4.1 0 7.5-3.4 7.5-7.5v-218c0-12.4-10-22.5-22.5-22.5zm-165-.8a21 21 0 1 1 42 .8h-42V60zM15 286.4v-203c0-4.2 3.4-7.5 7.5-7.5h288c4.1 0 7.5 3.3 7.5 7.5v158.3h-15V98.4c0-4.2-3.4-7.5-7.5-7.5h-258a7.5 7.5 0 0 0-7.5 7.5v173c0 4.1 3.4 7.5 7.5 7.5H229v15H22.5a7.5 7.5 0 0 1-7.5-7.5zm221.5-44.7a7.5 7.5 0 0 0-7.5 7.5v14.7H45v-158h243v135.8h-51.5zm81.5 52.2h-74v-37.2h74v37.2z"
                                                fill="#22313f"
                                            />
                                        </svg>
                                        Classwork
                                    </Tab>
                                    <Tab
                                        py={3}
                                        fontWeight={500}
                                        border={"1px"}
                                        borderColor={"gray.100"}
                                        rounded={"md"}
                                        _selected={{
                                            color: "teal",
                                            borderColor: "gray.300",
                                            rounded: "md",
                                        }}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            className="me-2"
                                            viewBox="0 -7 48.9 48.9"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                data-name="Path 127"
                                                d="M426.1 334.3h-8v24h8v-24Z"
                                                fill="#e23a44"
                                                fill-rule="evenodd"
                                                transform="translate(-417.6 -329.8)"
                                            />
                                            <path
                                                data-name="Path 128"
                                                d="m452 330.3-25.9 4v24l26 4v-32Z"
                                                fill="#ffe959"
                                                fill-rule="evenodd"
                                                transform="translate(-417.6 -329.8)"
                                            />
                                            <path
                                                data-name="Path 129"
                                                d="M458 346.3a4.4 4.4 0 0 0-4.5-4.5H452v9h1.5a4.4 4.4 0 0 0 4.5-4.5Z"
                                                fill="#e23a44"
                                                fill-rule="evenodd"
                                                transform="translate(-417.6 -329.8)"
                                            />
                                            <path
                                                data-name="Path 130"
                                                d="m438 360.3-8-1.1v3.9l8 1v-3.8Zm22.7-9 3.4 2m-7 1.6 2 3.5m-2-20.8 2-3.4m1.6 7.1 3.4-2m-2 7h4m-8.1 0a4.4 4.4 0 0 0-4.5-4.5H452v9h1.5a4.4 4.4 0 0 0 4.5-4.5v0Zm-22.1-13.5-9.8 1.5v24l26 4v-32l-9.2 1.4m-3 .5-1.3.2m-12.5 2h-8v23.9h8v-24Z"
                                                fill="none"
                                                stroke="#0f0e0b"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="1"
                                                transform="translate(-417.6 -329.8)"
                                            />
                                        </svg>
                                        Announcement
                                    </Tab>
                                    <Tab
                                        className="flex-shrink-1"
                                        py={3}
                                        fontWeight={500}
                                        border={"1px"}
                                        borderColor={"gray.100"}
                                        rounded={"md"}
                                        _selected={{
                                            color: "teal",
                                            borderColor: "gray.300",
                                            rounded: "md",
                                        }}
                                    >
                                        <svg
                                            width="22"
                                            height="22"
                                            className="me-2"
                                            viewBox="0 0 48 48"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path fill="#fff" fill-opacity="0" d="M0 0H48V48H0z"/>
                                            <path
                                                d="M24 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM6 40.8V42h36v-1.2c0-4.5 0-6.7-.9-8.4a8 8 0 0 0-3.5-3.5c-1.7-.9-4-.9-8.4-.9H18.8c-4.5 0-6.7 0-8.4.9a8 8 0 0 0-3.5 3.5C6 34 6 36.4 6 40.8Z"
                                                fill="#99f1c6"
                                                stroke="#2b764b"
                                                stroke-width="3"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        People
                                    </Tab>
                                </TabList>
                            </div>
                        </div>
                        <TabPanels>
                            <TabPanel>
                                <div className="row justify-content-center gy-5">
                                    <div className="col-lg-9">
                                        <Box
                                            p={6}
                                            mb={4}
                                            borderTop="4px"
                                            borderColor="teal"
                                            bg={"white"}
                                            boxShadow={"sm"}
                                            rounded={"md"}
                                            overflow={"hidden"}
                                        >
                                            <Stack
                                                direction={"row"}
                                                justify={"space-between"}
                                                alignItems={"center"}
                                                divider={<StackDivider borderColor="gray.200"/>}
                                                spacing={4}
                                            >
                                                <Box>
                                                    <Text fontSize={"sm"} color={"gray.500"} mb={2}>
                                                        Total{" "}
                                                        <span className="fw-bold">
                              {classInfo.students
                                  ? classInfo.students.length
                                  : 0}
                            </span>{" "}
                                                        Students
                                                    </Text>
                                                    <Heading fontSize={"2xl"} fontWeight={700} mb={2}>
                                                        {classInfo.subjectName}{" "}
                                                        <Text
                                                            display={"inline"}
                                                            color={"gray.500"}
                                                            fontWeight={500}
                                                        >
                                                            ({classInfo.subjectCode})
                                                        </Text>
                                                    </Heading>
                                                    <Text className="mb-2">
                                                        Batch :{" "}
                                                        <span className="fw-bold">
                              ({classInfo.batchNumber})
                            </span>
                                                    </Text>
                                                </Box>

                                                <Box>
                                                    <Text as="p" fontSize={"md"} align={"right"}>
                                                        Class code{" "}
                                                        <Text
                                                            className="fw-bold"
                                                            fontSize={"3xl"}
                                                            color={"teal"}
                                                        >
                                                            <ClipboardCopy copyText={classInfo.classCode}/>
                                                        </Text>
                                                    </Text>
                                                </Box>
                                            </Stack>
                                        </Box>

                                        <div className="row g-2">
                                            {announceBlock && (
                                                <div className={`col-12`}>
                                                    <form
                                                        className="announce-form"
                                                        onSubmit={handleSubmit(onSubmit)}
                                                        encType={"multipart/form-data"}
                                                    >
                                                        <Box
                                                            p={6}
                                                            mb={4}
                                                            bg={"white"}
                                                            boxShadow={"sm"}
                                                            rounded={"md"}
                                                            overflow={"hidden"}
                                                            border="1px"
                                                            borderColor={"teal"}
                                                        >
                                                            <div
                                                                className={isSubmitting && "opacity-50 pe-none"}
                                                            >
                                                                <Text as="p" mb="3">
                                                                    Write something for this class
                                                                </Text>
                                                                <Input
                                                                    onChange={changeHandler}
                                                                    name={"name"}
                                                                    className="mb-3"
                                                                    borderColor={"#ddd"}
                                                                    focusBorderColor="teal.500"
                                                                    placeholder="ex: Lab Final Sheet"
                                                                />
                                                                <Text as="p" mb="2">
                                                                    Choose a file to share
                                                                </Text>
                                                                <Input
                                                                    {...register("file")}
                                                                    name={"file"}
                                                                    borderColor={"#ddd"}
                                                                    focusBorderColor="teal.500"
                                                                    pt={"7px"}
                                                                    type="file"
                                                                    size={"lg"}
                                                                />
                                                            </div>
                                                            <div className="text-end">
                                                                {isSubmitting ? (
                                                                    <Button
                                                                        type={"submit"}
                                                                        mt={4}
                                                                        px={6}
                                                                        py={5}
                                                                        fontSize={"md"}
                                                                        fontWeight={500}
                                                                        colorScheme="teal"
                                                                        isLoading
                                                                        loadingText="Submitting"
                                                                    >
                                                                        Submitting
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        type={"submit"}
                                                                        mt={4}
                                                                        px={6}
                                                                        py={5}
                                                                        fontSize={"md"}
                                                                        fontWeight={500}
                                                                        colorScheme="teal"
                                                                    >
                                                                        Submit
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </Box>
                                                    </form>
                                                </div>
                                            )}
                                            <div
                                                className={`${
                                                    announceBlock ? "col-lg-12" : "col-lg-6"
                                                }`}
                                            >
                                                <Button
                                                    w={"full"}
                                                    fontSize={"sm"}
                                                    fontWeight={600}
                                                    variant="outline"
                                                    colorScheme={announceBlock ? "red" : "teal"}
                                                    onClick={() => setAnnounceBlock(!announceBlock)}
                                                >
                                                    {announceBlock
                                                        ? "Cancle Announcement"
                                                        : "Announce something to this class"}
                                                </Button>
                                            </div>
                                            {!announceBlock && (
                                                <div className="col-sm-6">
                                                    <Link
                                                        href={`/teacher/exam/create-exam?classCode=${classInfo.classCode}`}
                                                    >
                                                        <Button
                                                            w={"full"}
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
                                                            Create Exam
                                                        </Button>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-9">
                                        <Text
                                            fontSize={"sm"}
                                            fontWeight={600}
                                            color={"gray.500"}
                                            textTransform={"uppercase"}
                                        >
                                            {props.exams.exams != undefined &&
                                            props.exams.exams.running?.length > 0
                                                ? "Running Exam"
                                                : ""}
                                        </Text>
                                        {props.exams.exams != undefined
                                            ? props.exams.exams.running?.length > 0
                                                ? props.exams.exams.running?.map((value, index) => (
                                                    <Link
                                                        key={index}
                                                        href={`/teacher/exam/view-exam?examId=${value.examId}&classId=${classInfo.classCode}`}
                                                    >
                                                        <a className="text-dark">
                                                            <Box
                                                                mt={3}
                                                                px={6}
                                                                py={5}
                                                                rounded={"md"}
                                                                fontSize={"xl"}
                                                                bg={"white"}
                                                                boxShadow={"sm"}
                                                                display={"flex"}
                                                                alignItems={"center"}
                                                                justifyContent={"space-between"}
                                                                fontWeight={500}
                                                                transition={"all 0.3s"}
                                                                borderColor={"green.200"}
                                                                borderWidth={1}
                                                                _hover={{
                                                                    color: "teal",
                                                                    borderColor: "teal",
                                                                    transform: "translateY(-1px)",
                                                                }}
                                                            >
                                                                <Text>{value.examName}</Text>
                                                                <Text fontSize={"2xl"} ml={2}>
                                                                    <BsFillArrowRightSquareFill/>
                                                                </Text>
                                                            </Box>
                                                        </a>
                                                    </Link>
                                                ))
                                                : ""
                                            : ""}
                                    </div>

                                    <div className="col-lg-9">
                                        <Text
                                            fontSize={"sm"}
                                            fontWeight={600}
                                            color={"gray.500"}
                                            textTransform={"uppercase"}
                                        >
                                            {props.exams.exams != undefined &&
                                            props.exams.exams.upcoming?.length > 0
                                                ? "Upcoming Exam"
                                                : ""}
                                        </Text>
                                        {props.exams.exams != undefined
                                            ? props.exams.exams.upcoming?.length > 0
                                                ? props.exams.exams.upcoming?.map((value, index) => (
                                                    <Link
                                                        key={index}
                                                        href={`/teacher/exam/view-exam?examId=${value.examId}&classId=${classInfo.classCode}`}
                                                    >
                                                        <a className="text-dark">
                                                            <Box
                                                                mt={3}
                                                                px={6}
                                                                py={5}
                                                                rounded={"md"}
                                                                fontSize={"xl"}
                                                                bg={"white"}
                                                                boxShadow={"sm"}
                                                                display={"flex"}
                                                                alignItems={"center"}
                                                                justifyContent={"space-between"}
                                                                fontWeight={500}
                                                                transition={"all 0.3s"}
                                                                borderColor={"green.200"}
                                                                borderWidth={1}
                                                                _hover={{
                                                                    color: "teal",
                                                                    borderColor: "teal",
                                                                    transform: "translateY(-1px)",
                                                                }}
                                                            >
                                                                <Text>{value.examName}</Text>
                                                                <Text fontSize={"2xl"} ml={2}>
                                                                    <BsFillArrowRightSquareFill/>
                                                                </Text>
                                                            </Box>
                                                        </a>
                                                    </Link>
                                                ))
                                                : ""
                                            : ""}
                                    </div>

                                    <div className="col-lg-9">
                                        <Text
                                            fontSize={"sm"}
                                            fontWeight={600}
                                            color={"gray.500"}
                                            textTransform={"uppercase"}
                                        >
                                            {props.exams.exams != undefined &&
                                            props.exams.exams.past?.length > 0
                                                ? "Previous Exam"
                                                : ""}
                                        </Text>
                                        {props.exams.exams != undefined
                                            ? props.exams.exams.past?.length > 0
                                                ? props.exams.exams.past?.map((value, index) => (
                                                    <Link
                                                        key={index}
                                                        href={`/teacher/exam/view-exam?examId=${value.examId}&classId=${classInfo.classCode}`}
                                                    >
                                                        <a className="text-dark">
                                                            <Box
                                                                mt={3}
                                                                px={6}
                                                                py={5}
                                                                rounded={"md"}
                                                                fontSize={"xl"}
                                                                bg={"white"}
                                                                boxShadow={"sm"}
                                                                display={"flex"}
                                                                alignItems={"center"}
                                                                justifyContent={"space-between"}
                                                                fontWeight={500}
                                                                transition={"all 0.3s"}
                                                                borderColor={"green.200"}
                                                                borderWidth={1}
                                                                _hover={{
                                                                    color: "teal",
                                                                    borderColor: "teal",
                                                                    transform: "translateY(-1px)",
                                                                }}
                                                            >
                                                                <Text>{value.examName}</Text>
                                                                <Text fontSize={"2xl"} ml={2}>
                                                                    <BsFillArrowRightSquareFill/>
                                                                </Text>
                                                            </Box>
                                                        </a>
                                                    </Link>
                                                ))
                                                : ""
                                            : ""}
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="row justify-content-center gy-3">
                                    {classInfo.classMaterials?.length > 0
                                        ? classInfo.classMaterials.map((value, index) => (
                                            <div className="col-lg-9">
                                                <Box
                                                    p={5}
                                                    pb={4}
                                                    border="1px"
                                                    borderColor="gray.200"
                                                    bg={"white"}
                                                    boxShadow={"sm"}
                                                    rounded={"md"}
                                                    overflow={"hidden"}
                                                    role="group"
                                                >
                                                    <div className="d-flex mb-2">
                                                        <div className="flex-shrink-0 me-3 mt-1 text-center">
                                                            <Avatar size="sm"/>
                                                            <br/>
                                                            <Box
                                                                className="d-inline-block"
                                                                visibility={"hidden"}
                                                                _groupHover={{visibility: "visible"}}
                                                            >
                                                                {/*<Tooltip*/}
                                                                {/*    hasArrow*/}
                                                                {/*    label="Delete This"*/}
                                                                {/*    bg={"red.500"}*/}
                                                                {/*    placement="top"*/}
                                                                {/*    closeOnClick={false}*/}
                                                                {/*>*/}
                                                                {/*    <Button*/}
                                                                {/*        className="mt-3"*/}
                                                                {/*        color={"red.500"}*/}
                                                                {/*        bg={"transparent"}*/}
                                                                {/*        p={1}*/}
                                                                {/*        _hover={{*/}
                                                                {/*            bg: "transparent",*/}
                                                                {/*        }}*/}
                                                                {/*        _active={{*/}
                                                                {/*            bg: "transparent",*/}
                                                                {/*        }}*/}
                                                                {/*    >*/}
                                                                {/*        <DeleteIcon boxSize={18}/>*/}
                                                                {/*    </Button>*/}
                                                                {/*</Tooltip>*/}
                                                            </Box>
                                                        </div>
                                                        <Box>
                                                            <Text as={"small"}>{value.createdAt}</Text>
                                                            <Text
                                                                as={"p"}
                                                                mt={1}
                                                                fontSize={"lg"}
                                                                fontWeight="semibold"
                                                            >
                                                                {value.name}
                                                            </Text>

                                                            {value.fileUrl && value.key ? (
                                                                <a
                                                                    className="d-inline-block border px-3 py-2 mt-3 rounded overflow-hidden"
                                                                    href={value.fileUrl}
                                                                    target="_blank"
                                                                >
                                                                    <DownloadIcon mr={2}/>
                                                                    {value.key}
                                                                </a>
                                                            ) : (
                                                                <small className="d-block mt-2 text-danger">
                                                                    The attachment file is missing or something
                                                                    went wrong!
                                                                </small>
                                                            )}
                                                        </Box>
                                                    </div>
                                                </Box>
                                            </div>
                                        ))
                                        : "No Class Announcement"}
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="row justify-content-center gy-3">
                                    <div className="col-lg-9">
                                        <Box
                                            p={5}
                                            pb={4}
                                            border="1px"
                                            borderColor="gray.200"
                                            bg={"white"}
                                            rounded={"md"}
                                            overflow={"hidden"}
                                            role="group"
                                        >
                                            <Text fontSize={"xl"} fontWeight={600} mb={2}>
                                                Teacher
                                            </Text>
                                            <TableContainer rounded={"md"}>
                                                <Table variant="striped" size="sm">
                                                    <Tbody>
                                                        <Tr>
                                                            <Td
                                                                className="pe-0"
                                                                style={{whiteSpace: "nowrap", width: "1px"}}
                                                            >
                                                                <Avatar size="xs"/>
                                                            </Td>
                                                            <Td fontWeight={600}>{classInfo.teacherId?.firstName} {classInfo.teacherId?.lastName}</Td>
                                                        </Tr>
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        </Box>

                                        <Box
                                            mt={5}
                                            p={5}
                                            pb={4}
                                            border="1px"
                                            borderColor="gray.200"
                                            bg={"white"}
                                            boxShadow={"sm"}
                                            rounded={"md"}
                                            overflow={"hidden"}
                                            role="group"
                                        >
                                            <Text fontSize={"xl"} fontWeight={600} mb={2}>
                                                Students
                                            </Text>
                                            <TableContainer rounded={"md"}>
                                                <Table variant="striped" size="sm">
                                                    <Tbody>
                                                        {classInfo.students?.length > 0
                                                            ? classInfo.students.map((value, index) => (

                                                                <Tr>
                                                                    <Td
                                                                        className="pe-0"
                                                                        style={{whiteSpace: "nowrap", width: "1px"}}
                                                                    >
                                                                        <Avatar size="xs"/>
                                                                    </Td>
                                                                    <Td fontWeight={500}>{value.studentId?.firstName} {value.studentId?.lastName}</Td>
                                                                </Tr>
                                                            ))
                                                            :
                                                            <Tr>
                                                                <Td
                                                                    className="pe-0"
                                                                    style={{whiteSpace: "nowrap", width: "1px"}}
                                                                >
                                                                    <Avatar size="xs"/>
                                                                </Td>
                                                                <Td fontWeight={500}>No students</Td>
                                                            </Tr>}
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </Box>
        </Layout>
    );
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        classes: state.classes,
        exams: state.exams,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getSingleCLass: (classId, router) =>
            dispatch(getSingleClass(classId, router)),
        classMaterialUpload: (classMaterialInfo, router) =>
            dispatch(classMaterialUpload(classMaterialInfo, router)),
        getExams: (classId, router) => dispatch(getExams(classId, router)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewClass);
