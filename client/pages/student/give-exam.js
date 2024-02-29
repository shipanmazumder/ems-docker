import {Heading, Box, Text, Stack, Button} from '@chakra-ui/react';
import Layout from '@/components/Layout';
import {Component, useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import {getStudentExam, giveExam} from '../../store/actions/examAction'

function GiveExam(props) {
    const router = useRouter();
    const classCode = router.query.classCode;
    const examId = router.query.examId;
    const [examInfo, setExamInfo] = useState({});
    const [submitExamInfo, setSubmitExamInfo] = useState({});

    useEffect(async () => {
        if (!router.isReady) return;
        setSubmitExamInfo({...submitExamInfo, classCode: classCode, examId: examId});
        await getSingleExam();
    }, [router.isReady]);
    const getSingleExam = async () => {
        await props.getSingleExam(classCode, examId, router);
    };
    const setDefaultAnswers = async () => {
        if (props.exams.exam.questions != undefined) {
            let answers = [];
            props.exams.exam.questions.map((value, index) => {
                answers.push({
                    questionIndex: index,
                    answer: ""
                });
            })

            setSubmitExamInfo({...submitExamInfo, questions: answers});

        }
    };


    useEffect(async () => {
        setExamInfo(props.exams.exam);
        if (Object.keys(props.exams.exam).length != 0) {
            setDefaultAnswers();
        }
    }, [props.exams.exam]);

    const updateAnswers = (index, value) => {
        if (submitExamInfo.questions != undefined) {
            if (submitExamInfo.questions.length > 0) {

                let oldAnswers = submitExamInfo.questions[index];
                if (oldAnswers) {
                    oldAnswers.answer = value;
                    submitExamInfo.questions[index] = oldAnswers;
                    setSubmitExamInfo({...submitExamInfo, classCode: classCode, questions: submitExamInfo.questions});
                    console.log(submitExamInfo)
                }
            }

        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        await props.giveExam(submitExamInfo, router);
    };

    if (props.exams.isLoading)
        return (
            <p className="vh-100 vw-100 d-flex align-items-center justify-content-center">
        <span className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </span>
            </p>
        );
    return (<Layout metaTitle={"Give Exam"}>
        <Box minH={'90vh'} bg={'gray.50'}>
            <div className="section container">
                <div className="row justify-content-center gy-5">
                    <div className="col-lg-9">
                        <Box
                            p={6}
                            borderTop="4px"
                            borderColor="teal"
                            bg={'white'}
                            boxShadow={'sm'}
                            rounded={'md'}
                            overflow={'hidden'}
                        >
                            <Stack spacing={2} mb={1}>
                                <Heading fontSize={'2xl'} fontWeight={700}>
                                    {examInfo.examName}{' '}
                                    <Text
                                        display={'inline'}
                                        color={'gray.500'}
                                        fontWeight={500}
                                    >
                                    </Text>
                                </Heading>
                                <Text color={'gray.500'}>Total Question: {examInfo.questions?.length}</Text>
                                <Text color={'gray.500'}>Total Question: {examInfo.questions?.length*examInfo.perQuestionMark}</Text>
                                <Text color={'gray.500'}>Start Date: {examInfo.startExamDate}</Text>
                                <Text color={'gray.500'}>End Date: {examInfo.endExamDate}</Text>
                            </Stack>
                        </Box>
                    </div>
                    <div className="col-lg-9">
                        <Text
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'gray.500'}
                            textTransform={'uppercase'}
                        >
                            Questions
                        </Text>
                        <form onSubmit={submitHandler} method="post">
                            {examInfo.questions != undefined ? examInfo.questions.map((value, index) => (

                                <Box key={index} mt={6}>
                                    <Text fontSize={'2xl'} fontWeight={500} mb={3}>
                                        ({(index + 1)}) {value.title}
                                    </Text>

                                    {value.options.map((op, opIndex) => (
                                        <div key={opIndex} className="form-check mt-2">
                                            <input
                                                className="form-check-input shadow-none"
                                                type="radio"
                                                name={index + "_option"}
                                                id={index + "_option_" + opIndex}
                                                value={op.option}
                                                onChange={(e) =>
                                                    updateAnswers(index, opIndex)
                                                }
                                            />
                                            <label className="form-check-label" for={index + "_option_" + opIndex}>
                                                {op.option}
                                            </label>
                                        </div>

                                    ))}
                                </Box>)) : ""}
                            <Button
                                mt={6}
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                bg={'teal.400'}
                                _hover={{
                                    bg: 'teal.500',
                                }}
                                _focus={{
                                    bg: 'teal.500',
                                }}
                                type="submit"
                            >
                                Submit Answer
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </Box>
    </Layout>);
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        exams: state.exams
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getSingleExam: (classCode, examId, router) => dispatch(getStudentExam(classCode, examId, router)),
        giveExam: (examInfo, router) => dispatch(giveExam(examInfo, router)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveExam);