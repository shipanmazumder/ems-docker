import Layout from "@/components/Layout";
import {
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { examCreate } from "../../../store/actions/examAction";

function CreateExam(props) {
  const router = useRouter();
  const classCode = router.query.classCode;
  const option = { option: "" };
  const questions = { title: "", options: [], answer: "" };
  const [examInfo, setExamInfo] = useState({
    classCode: "",
    examName: "",
    startExamDate: "",
    endExamDate: "",
    endExamTime: "",
    startExamTime: "",
    perQuestionMark: 0,
    questions: [
      {
        title: "",
        options: [
          {
            option: "",
          },
          {
            option: "",
          },
          {
            option: "",
          },
          {
            option: "",
          },
        ],
        answer: "",
      },
    ],
  });
  const totalOption = [1, 2, 3, 4];
  let tempQuestion = [1];
  let addNewQuestion = () => {
    tempQuestion.push(tempQuestion.length + 1);
  };
  useEffect(async () => {
    if (!router.isReady) return;
    setExamInfo({ ...examInfo, classCode: classCode });
  }, [router.isReady]);

  useEffect(() => {
    if (!props.auth.isTeacher) router.push("/teacher/login");
  }, [props.auth]);

  useEffect(() => {
    setDefaultOptions();
  }, []);

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      //setDefaultExamInfo();
    }
  }, []);

  const setDefaultOptions = () => {
    totalOption.map((value, index) => {
      questions.options.push(option);
    });
  };
  const setDefaultExamInfo = () => {
    examInfo.questions.push(questions);
    setExamInfo({ ...examInfo, questions: examInfo.questions });
  };

  const updateOption = (index, optionIndex, value) => {
    console.log("q index " + index);
    console.log("q len " + examInfo.questions.length);
    if (examInfo.questions.length > 0) {
      let oldQuestion = examInfo.questions[index];
      if (oldQuestion) {
        if (oldQuestion.options.length > 0) {
          let singleOption = oldQuestion.options[optionIndex];
          console.log(singleOption);
          if (singleOption) {
            singleOption.option = value;
            oldQuestion.options[optionIndex] = singleOption;
          } else {
            let newOption = {
              option: value,
            };
            oldQuestion.options.push(newOption);
          }
        } else {
          let newOption = {
            option: value,
          };
          oldQuestion.options.push(newOption);
        }
        examInfo.questions[index] = oldQuestion;
      }

      setExamInfo({ ...examInfo, questions: examInfo.questions });
    }
  };
  const updateQuestionTitle = (index, value) => {
    console.log(value);
    if (examInfo.questions.length > 0) {
      let singleQuestion = examInfo.questions[index];
      if (singleQuestion) {
        singleQuestion.title = value;
        examInfo.questions[index] = singleQuestion;
      } else {
        let newQuestion = {
          title: value,
          options: [
            {
              option: "",
            },
            {
              option: "",
            },
            {
              option: "",
            },
            {
              option: "",
            },
          ],
          answer: "",
        };
        examInfo.questions.push(newQuestion);
      }
      setExamInfo({ ...examInfo, questions: examInfo.questions });
    } else {
      let newQuestion = [
        {
          title: value,
          options: [
            {
              option: "",
            },
            {
              option: "",
            },
            {
              option: "",
            },
            {
              option: "",
            },
          ],
          answer: "",
        },
      ];
      setExamInfo({ ...examInfo, questions: newQuestion });
    }
  };
  const updateQuestionAnswer = (index, value) => {
    if (examInfo.questions.length > 0) {
      let singleQuestion = examInfo.questions[index];
      if (singleQuestion) {
        singleQuestion.answer = value;
        examInfo.questions[index] = singleQuestion;
      } else {
        let newQuestion = {
          title: "",
          options: [
            {
              option: "",
            },
            {
              option: "",
            },
            {
              option: "",
            },
            {
              option: "",
            },
          ],
          answer: value,
        };
        examInfo.questions.push(newQuestion);
      }
      setExamInfo({ ...examInfo, questions: examInfo.questions });
    } else {
      let newQuestion = [
        {
          title: "",
          options: [
            {
              option: "",
            },
            {
              option: "",
            },
            {
              option: "",
            },
            {
              option: "",
            },
          ],
          answer: value,
        },
      ];
      setExamInfo({ ...examInfo, questions: newQuestion });
    }
  };

  const changeHandler = (e) => {
    setExamInfo({ ...examInfo, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    console.log(examInfo);
  }, [examInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await props.examCreate(examInfo, router);
  };

  // questionList state
  const [questionList, setQuestionList] = useState([
    {
      question: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
      correctAnswer: "",
    },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...questionList];
    list[index][name] = value;
    setQuestionList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    examInfo.questions.splice(index, 1);
    setExamInfo({ ...examInfo, questions: examInfo.questions });
  };

  function nextChar(c, index) {
    return String.fromCharCode(c.charCodeAt(0) + index);
  }

  // handle click event of the Add question button
  const handleAddClick = () => {
    let newQuestion = {
      title: "",
      options: [
        {
          option: "",
        },
        {
          option: "",
        },
        {
          option: "",
        },
        {
          option: "",
        },
      ],
      answer: "",
    };
    examInfo.questions.push(newQuestion);
    setExamInfo({ ...examInfo, questions: examInfo.questions });
  };

  const minDate = new Date().toISOString().slice(0, 10);

  return (
    <Layout metaTitle={"Create Exam"}>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <Flex minH={"90vh"} align={"center"} justify={"center"} py={12}>
              <Stack
                boxShadow={"2xl"}
                bg={"white"}
                rounded={"xl"}
                p={10}
                spacing={8}
              >
                <Stack spacing={2}>
                  <Text fontSize={"2xl"} color={"gray.500"}>
                    Create Exam
                  </Text>
                </Stack>
                <form onSubmit={submitHandler}>
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <span className="d-inline-block mb-1 text-muted small">
                        Exam title
                      </span>
                      <Input
                        type="text"
                        placeholder="Exam title"
                        name={"examName"}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col-lg-6">
                      <span className="d-inline-block mb-1 text-muted small">
                        Mark per Question
                      </span>
                      <Input
                        type="number"
                        min={1}
                        placeholder="5"
                        name={"perQuestionMark"}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <span className="d-inline-block mb-1 text-muted small">
                        Exam Start Date
                      </span>
                      <Input
                        type="date"
                        min={minDate}
                        placeholder="Exam Start Date"
                        name={"startExamDate"}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <span className="d-inline-block mb-1 text-muted small">
                        Exam Start Time
                      </span>
                      <Input
                        type="time"
                        placeholder="Exam Start Time"
                        name={"startExamTime"}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <span className="d-inline-block mb-1 text-muted small">
                        Exam End Date
                      </span>
                      <Input
                        type="date"
                        min={minDate}
                        placeholder="Exam End Date"
                        name={"endExamDate"}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <span className="d-inline-block mb-1 text-muted small">
                        Exam End Time
                      </span>
                      <Input
                        type="time"
                        placeholder="Exam End Time"
                        name={"endExamTime"}
                        onChange={changeHandler}
                      />
                    </div>
                  </div>

                  <Divider className="mt-4" shadow={"none"} bg={"gray.500"} />

                  {examInfo.questions.map((value, index) => (
                    <Stack className="mt-4" key={index}>
                      <Stack
                        spacing={1}
                        align={"center"}
                        justify={"space-between"}
                        direction={"row"}
                      >
                        <Text fontSize={"xl"} color={"black.300"}>
                          {"Question " + (index + 1)}
                        </Text>
                        {examInfo.questions.length !== 1 && (
                          <Button
                            bg={"red.400"}
                            rounded={"md"}
                            size={"sm"}
                            fontSize={"sm"}
                            color={"white"}
                            _hover={{ bg: "red.500" }}
                            _focus={{ bg: "red.500" }}
                            onClick={() => handleRemoveClick(index)}
                          >
                            {"Delete Question " + (index + 1)}
                          </Button>
                        )}
                      </Stack>
                      <Input
                        type="text"
                        placeholder={"Question " + (index + 1)}
                        value={value.title}
                        name="question"
                        onChange={(e) =>
                          updateQuestionTitle(index, e.currentTarget.value)
                        }
                        required
                      />
                      <Stack
                        spacing={1}
                        w={"full"}
                        direction={{ base: "column", md: "row" }}
                      >
                        {value.options.map((opValue, opIndex) => (
                          <InputGroup key={opIndex}>
                            <InputLeftAddon children={nextChar("A", opIndex)} />
                            <Input
                              type="text"
                              placeholder={"Option " + (opIndex + 1)}
                              value={opValue.option}
                              name={"answer" + opIndex}
                              onChange={(e) =>
                                updateOption(
                                  index,
                                  opIndex,
                                  e.currentTarget.value
                                )
                              }
                              required
                            />
                          </InputGroup>
                        ))}
                      </Stack>

                      <Select
                        name="correctAnswer"
                        placeholder="Select Correct Answer"
                        color="#333"
                        required
                        defaultValue={value.answer}
                        onChange={(e) =>
                          updateQuestionAnswer(index, e.currentTarget.value)
                        }
                        key={value.answer}
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </Select>

                      {examInfo.questions.length - 1 === index && (
                        <Button
                          className="mt-4"
                          bg={"green.400"}
                          rounded={"lg"}
                          color={"white"}
                          flex={"1 0 auto"}
                          _hover={{ bg: "green.500" }}
                          _focus={{ bg: "green.500" }}
                          onClick={handleAddClick}
                        >
                          {"Add another Question"}
                        </Button>
                      )}
                    </Stack>
                  ))}
                  <Divider className="my-4" shadow={"none"} bg={"gray.500"} />

                  <div className="text-center">
                    <Button
                      className="mt-1"
                      type={"submit"}
                      bg={"teal.400"}
                      rounded={"lg"}
                      color={"white"}
                      _hover={{ bg: "teal.500" }}
                      _focus={{ bg: "teal.500" }}
                    >
                      Create Exam
                    </Button>
                  </div>
                </form>
              </Stack>
            </Flex>
          </div>
        </div>
      </div>
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
    examCreate: (examInfo, router) => dispatch(examCreate(examInfo, router)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateExam);
