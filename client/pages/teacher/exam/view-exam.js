import Layout from "@/components/Layout";
import {
    Badge,
    Box,
    FormControl,
    FormLabel,
    Switch,
    Text,
} from "@chakra-ui/react";
import {Component} from "react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {getSingleExamMarks} from "../../../store/actions/examAction";

function ViewExam(props) {
    const router = useRouter();
    const examId = router.query.examId;
    const classCode = router.query.classId;
    const [examInfo, setExamInfo] = useState({});
    useEffect(async () => {
        if (!router.isReady) return;
        await singleExamMarks();
        console.log("sss")
    }, [router.isReady]);

    useEffect(() => {
        if (!props.auth.isTeacher) router.push("/teacher/login");
    }, [props.auth]);
    useEffect(async () => {
        setExamInfo(props.exams.exam);
    }, [props.exams.exam]);
    
    const singleExamMarks = async () => {
        await props.getSingleExamMarks(examId, classCode, router);
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
        <Layout metaTitle={"View Exam"}>
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mx-auto">
                            <div className="row mb-5 align-items-end gy-4">
                                <div className="col-lg-9">
                                    <Text>Answer Sheet</Text>
                                    <Text fontSize="4xl" mb="0">
                                        {examInfo.examName}
                                    </Text>
                                </div>
                                <div className="col-lg-3 text-start text-lg-end">
                                    <FormControl display="flex" alignItems="center" mb="2">
                                        <FormLabel htmlFor="classToggle" mb="0">
                                            Enable/Disable this Exam
                                        </FormLabel>
                                        <Switch colorScheme="teal" id="classToggle"/>
                                    </FormControl>
                                </div>
                            </div>

                            <Box bg={"white"} p={3} pt={4} rounded={"md"}>
                                <Box
                                    px={6}
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                    fontSize={"sm"}
                                    fontWeight={600}
                                    color={"gray.500"}
                                    textTransform={"uppercase"}
                                >
                                    <Text>Student Name</Text>
                                    <Text>Mark</Text>
                                </Box>
                                {examInfo.students?.length > 0
                                    ? examInfo.students.map((value, index) => (

                                        <Box
                                            mt={2}
                                            px={6}
                                            py={3}
                                            rounded={"md"}
                                            fontSize={"lg"}
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={"space-between"}
                                            fontWeight={500}
                                            transition={"all 0.3s"}
                                            borderColor={"gray.200"}
                                            borderWidth={1}
                                            color={"black"}
                                        >
                                            <Text>{value.studentId.firstName} {value.studentId.lastName}</Text>
                                            <Badge
                                                colorScheme="green"
                                                py={1}
                                                px={2}
                                                rounded={"md"}
                                                fontSize={"md"}
                                                ml={2}
                                                textTransform={"capitalize"}
                                            >
                                                {value.examMarks}
                                            </Badge>
                                        </Box>
                                    ))
                                    : <Text>No Student given exam</Text>}
                            </Box>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        exams: state.exams,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getSingleExamMarks: (examId, classCode, router) => dispatch(getSingleExamMarks(examId, classCode, router)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewExam);
